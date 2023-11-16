using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace hw6
{
    public partial class Form1 : Form
    {
        private Chart[] charts;
        private Point[] chartLocations;
        private Point[] mouseDownLocations;
        private bool[] isDraggingList;
        private bool[] isResizingList;
        private Size[] resizeStartSize;

        public static Random random = new Random();
        public Form1()
        {
            InitializeComponent();

            textBox1.Text = "100";
            textBox2.Text = "50";
            textBox3.Text = "20";
            textBox4.Text = "-20";
            textBox5.Text = "0.6";


            int numberOfCharts = 2;
            charts = new Chart[numberOfCharts];
            chartLocations = new Point[numberOfCharts];
            mouseDownLocations = new Point[numberOfCharts];
            isDraggingList = new bool[numberOfCharts];
            isResizingList = new bool[numberOfCharts];
            resizeStartSize = new Size[numberOfCharts];

            for (int i = 0; i < numberOfCharts; i++)
            {
                charts[i] = Controls.Find($"chart{i + 1}", true)[0] as Chart;
                chartLocations[i] = new Point(0, 0);
                mouseDownLocations[i] = Point.Empty;
                isDraggingList[i] = false;

                charts[i].MouseDown += Chart_MouseDown;
                charts[i].MouseMove += Chart_MouseMove;
                charts[i].MouseUp += Chart_MouseUp;
            }
        }

        private void Chart_MouseDown(object sender, MouseEventArgs e)
        {
            var chart = (Chart)sender;
            int chartIndex = Array.IndexOf(charts, chart);

            if (e.Button == MouseButtons.Left)
            {
                if (e.X >= chart.Width - 10 && e.Y >= chart.Height - 10)
                {
                    isResizingList[chartIndex] = true;
                    resizeStartSize[chartIndex] = chart.Size;
                }
                else
                {
                    isDraggingList[chartIndex] = true;
                    mouseDownLocations[chartIndex] = e.Location;
                }
            }
        }

        private void Chart_MouseMove(object sender, MouseEventArgs e)
        {
            var chart = (Chart)sender;
            int chartIndex = Array.IndexOf(charts, chart);

            if (isDraggingList[chartIndex])
            {
                int deltaX = e.X - mouseDownLocations[chartIndex].X;
                int deltaY = e.Y - mouseDownLocations[chartIndex].Y;

                chartLocations[chartIndex].X += deltaX;
                chartLocations[chartIndex].Y += deltaY;

                if (chartLocations[chartIndex].X < 0) chartLocations[chartIndex].X = 0;
                if (chartLocations[chartIndex].Y < 0) chartLocations[chartIndex].Y = 0;

                chart.Location = chartLocations[chartIndex];
            }
            else if (isResizingList[chartIndex])
            {
                int deltaX = e.X - resizeStartSize[chartIndex].Width;
                int deltaY = e.Y - resizeStartSize[chartIndex].Height;

                int newWidth = resizeStartSize[chartIndex].Width + deltaX;
                int newHeight = resizeStartSize[chartIndex].Height + deltaY;

                if (newWidth < 100)
                    newWidth = 100;
                if (newHeight < 100)
                    newHeight = 100;

                chart.Size = new Size(newWidth, newHeight);
            }
            else if (e.X >= chart.Width - 10 && e.Y >= chart.Height - 10)
            {
                chart.BackColor = Color.LightGray;
                chart.Cursor = Cursors.SizeNWSE;
            }
            else
            {
                chart.BackColor = Color.White;
                chart.Cursor = Cursors.Default;
            }
        }

        private (int[], int[]) simulateAttacks(int N, float prob, int P, int M, int S)
        {
            int[] attacks = new int[N+1];
            int[] xValue = new int[N+1], numberOfAttacks = new int[N+1];
            int secScore = 0;
            attacks[0] = 0;
            bool secure = false;
            int[] systemDiscarded = new int[M];
            for (int i = 1; i <= N; i++)
            {
                if ((float)random.NextDouble() <= prob)
                    secScore -= 1;
                else
                    secScore += 1;
                //x-series for chart
                numberOfAttacks[i] = i;
                //y-series for histogram
                attacks[i] = secScore;
                if (secScore == P && !secure)
                    systemDiscarded[i] = 1;
                else if (secScore == S)
                    secure = true;
            }
            return (numberOfAttacks, attacks);
        }

        private void fillCharts()
        {
            int numberOfSystems = int.Parse(textBox1.Text);
            int numberOfAttacks = int.Parse(textBox2.Text);
            int secScore = int.Parse(textBox3.Text);
            int unsecScore = int.Parse(textBox4.Text);
            float probability = float.Parse(textBox5.Text);

            chart1.Series.Clear();
            chart1.Legends.Clear();
            chart2.Series.Clear();
            chart2.Legends.Clear();
            chart1.Titles.Clear();
            chart2.Titles.Clear();

            chart1.Titles.Add($"Server M = {numberOfSystems} number of attacks N = {numberOfAttacks}");
            chart2.Titles.Add($"Histogram scores for server");
            Dictionary<int, int> histogramData = new Dictionary<int, int>();
            for (int i = 0; i < numberOfSystems; i++)
            {
                var result = simulateAttacks(numberOfAttacks, probability, unsecScore, numberOfSystems, secScore);
                int[] xChart = result.Item1;
                int[] yChart = result.Item2;
                                     
                var series = new Series();
                series.ChartType = SeriesChartType.Line;
                chart1.ChartAreas[0].AxisX.Minimum = 0;
                series.Points.DataBindXY(xChart, yChart);
                chart1.Series.Add(series);

                if (histogramData.ContainsKey(yChart.Last()))
                    histogramData[yChart.Last()]++;
                else
                    histogramData.Add(yChart.Last(), 1);
                

            }

            var series2 = new Series();
            series2.ChartType = SeriesChartType.Bar;
            series2.Points.DataBindXY(histogramData.Keys.ToArray(), histogramData.Values.ToArray());
            chart2.Series.Add(series2);

            chart1.ChartAreas[0].AxisX.Title = "Number of attacks";
            chart1.ChartAreas[0].AxisY.Title = "Scores";
            chart1.Invalidate();

            chart2.ChartAreas[0].AxisY.Title = "Number of server";
            chart2.ChartAreas[0].AxisX.Title = "Scores";
            chart2.Invalidate();
        }


        private void Chart_MouseUp(object sender, MouseEventArgs e)
        {
            var chart = (Chart)sender;
            int chartIndex = Array.IndexOf(charts, chart);

            if (e.Button == MouseButtons.Left)
            {
                isDraggingList[chartIndex] = false;
                isResizingList[chartIndex] = false;
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            fillCharts();
        }
    }
}
