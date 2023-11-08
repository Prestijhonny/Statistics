using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;


namespace hw5
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
            textBox3.Text = "1";
            textBox4.Text = "25";


            int numberOfCharts = 3;
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

        private float[] getXChart1Values(int T, int N)
        {
            float size = (float)T / (float)N;
            float[] xChart1Values = new float[N + 1];
            for (int i = 0; i <= N; i++)
                xChart1Values[i] = size * i;
            return xChart1Values;
        }

        private int[] simulateAttacks(int N, int lambda, int T)
        {
            double p;
            float probAttack = ((float)T / (float)N) * lambda;
            int[] nAttackResult = new int[N + 1];

            for (int j = 0; j <= N; j++)
            {
                p = (float)random.NextDouble();
                if (j == 0)
                    nAttackResult[j] = 0;
                else
                {
                    nAttackResult[j] = nAttackResult[j - 1];
                    if (p <= probAttack)
                        nAttackResult[j]++;
                }
            }
            return nAttackResult;
        }

        private void fillChart()
        {
            int numberOfSystems = int.Parse(textBox1.Text);
            int lambda = int.Parse(textBox4.Text);
            int numberOfAttacks = int.Parse(textBox2.Text);
            int periodTime = int.Parse(textBox3.Text);

            chart1.Series.Clear();
            chart1.Legends.Clear();
            chart2.Series.Clear();
            chart3.Series.Clear();

            float[] xChart1 = getXChart1Values(periodTime, numberOfAttacks);
            int[] yChart1;

            HashSet<float> xChart2 = new HashSet<float>();
            Dictionary<int, int> yChart2 = new Dictionary<int, int>();

            HashSet<float> xChart3 = new HashSet<float>();
            Dictionary<int, int> yChart3 = new Dictionary<int, int>();
            int randIndx = random.Next(1, numberOfAttacks);
            chart1.Titles.Clear();
            chart2.Titles.Clear();
            chart3.Titles.Clear();
            chart1.Titles.Add($"Server M = {numberOfSystems} number of attacks N = {numberOfAttacks}");
            chart2.Titles.Add($"Histogram data at end of period T");
            chart3.Titles.Add($"Histogram data at random subinterval of T (interval {randIndx} of value {(float)randIndx/numberOfAttacks})");

            for (int i = 0; i < numberOfSystems; i++)
            {
                yChart1 = simulateAttacks(numberOfAttacks, lambda, periodTime);
                var series = new Series();
                series.ChartType = SeriesChartType.Line;
                chart1.ChartAreas[0].AxisX.Minimum = 0;

                series.Points.DataBindXY(xChart1, yChart1);
                chart1.Series.Add(series);
                //Delete legends
                chart1.Legends.Clear();
                //Successful attack at time T
                xChart2.Add(yChart1.Last());
                //Counting number of attacks for each server
                if (yChart2.ContainsKey(yChart1.Last()))
                    yChart2[yChart1.Last()]++;
                else
                    yChart2.Add(yChart1.Last(), 0);
                //Successful attack at random time
                xChart3.Add(yChart1[randIndx]);
                //Counting number of attacks for each server
                if (yChart3.ContainsKey(yChart1[randIndx]))
                    yChart3[yChart1[randIndx]]++;
                else
                    yChart3.Add(yChart1[randIndx], 0);

            }
            chart1.ChartAreas[0].AxisX.Title = "Subinterval of T";
            chart1.ChartAreas[0].AxisY.Title = "Successful attacks";
            chart1.Invalidate();
            drawHistogram(xChart2.ToArray(), yChart2.Values.ToArray(), xChart3.ToArray(), yChart3.Values.ToArray());
        }

        private void drawHistogram(float []xChart2, int[] yChart2, float[] xChart3, int[] yChart3)
        {
            var series2 = new Series();
            series2.ChartType = SeriesChartType.Column;
            chart2.ChartAreas[0].AxisX.Minimum = 0;

            series2.Points.DataBindXY(xChart2, yChart2);
            chart2.Series.Add(series2);
            //Delete legends
            chart2.Legends.Clear();

            double minX = series2.Points.Min(p => p.XValue);
            double maxX = series2.Points.Max(p => p.XValue);
            double maxY = series2.Points.Max(p => p.YValues[0]);
            if (minX == 0)
                chart2.ChartAreas[0].AxisX.Minimum = minX;
            else
                chart2.ChartAreas[0].AxisX.Minimum = minX-1;
            chart2.ChartAreas[0].AxisX.Maximum = maxX+1;
            chart2.ChartAreas[0].AxisY.Maximum = maxY+1;

            chart2.ChartAreas[0].AxisX.Title = "Successful attacks";
            chart2.ChartAreas[0].AxisY.Title = "Number of systems";

            chart2.Invalidate();

            var series3 = new Series();
            series3.ChartType = SeriesChartType.Column;
            chart3.ChartAreas[0].AxisX.Minimum = 0;

            series3.Points.DataBindXY(xChart3, yChart3);
            chart3.Series.Add(series3);
            //Delete legends
            chart3.Legends.Clear();

            minX = series3.Points.Min(p => p.XValue);
            maxX = series3.Points.Max(p => p.XValue);
            maxY = series3.Points.Max(p => p.YValues[0]);
            if (minX == 0)
                chart3.ChartAreas[0].AxisX.Minimum = minX;
            else
                chart3.ChartAreas[0].AxisX.Minimum = minX - 1;
            chart3.ChartAreas[0].AxisX.Maximum = maxX + 1;
            chart3.ChartAreas[0].AxisY.Maximum = maxY + 1;
            chart3.ChartAreas[0].AxisX.Title = "Successful attacks";
            chart3.ChartAreas[0].AxisY.Title = "Number of systems";
            chart3.Invalidate();
        }



        private void btnGenCharts_Click(object sender, EventArgs e)
        {
            fillChart();
        }


    }
}
