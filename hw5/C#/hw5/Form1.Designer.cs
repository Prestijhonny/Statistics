namespace hw5
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }
#region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend2 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea3 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend3 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.textBox4 = new System.Windows.Forms.TextBox();
            this.MServers = new System.Windows.Forms.Label();
            this.NAttacks = new System.Windows.Forms.Label();
            this.PeriodT = new System.Windows.Forms.Label();
            this.Lambda = new System.Windows.Forms.Label();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.chart2 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.chart3 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.btnGenCharts = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart3)).BeginInit();
            this.SuspendLayout();
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(182, 38);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(100, 20);
            this.textBox1.TabIndex = 0;
            // 
            // textBox2
            // 
            this.textBox2.Location = new System.Drawing.Point(465, 38);
            this.textBox2.Name = "textBox2";
            this.textBox2.Size = new System.Drawing.Size(100, 20);
            this.textBox2.TabIndex = 1;
            // 
            // textBox3
            // 
            this.textBox3.Location = new System.Drawing.Point(796, 41);
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(100, 20);
            this.textBox3.TabIndex = 2;
            // 
            // textBox4
            // 
            this.textBox4.Location = new System.Drawing.Point(1137, 41);
            this.textBox4.Name = "textBox4";
            this.textBox4.Size = new System.Drawing.Size(100, 20);
            this.textBox4.TabIndex = 3;
            // 
            // MServers
            // 
            this.MServers.AutoSize = true;
            this.MServers.Location = new System.Drawing.Point(68, 41);
            this.MServers.Name = "MServers";
            this.MServers.Size = new System.Drawing.Size(108, 13);
            this.MServers.TabIndex = 4;
            this.MServers.Text = "Number of M servers:";
            // 
            // NAttacks
            // 
            this.NAttacks.AutoSize = true;
            this.NAttacks.Location = new System.Drawing.Point(348, 41);
            this.NAttacks.Name = "NAttacks";
            this.NAttacks.Size = new System.Drawing.Size(111, 13);
            this.NAttacks.TabIndex = 5;
            this.NAttacks.Text = " Number of N attacks:";
            // 
            // PeriodT
            // 
            this.PeriodT.AutoSize = true;
            this.PeriodT.Location = new System.Drawing.Point(764, 47);
            this.PeriodT.Name = "PeriodT";
            this.PeriodT.Size = new System.Drawing.Size(17, 13);
            this.PeriodT.TabIndex = 6;
            this.PeriodT.Text = "T:";
            // 
            // Lambda
            // 
            this.Lambda.AutoSize = true;
            this.Lambda.Location = new System.Drawing.Point(1040, 44);
            this.Lambda.Name = "Lambda";
            this.Lambda.Size = new System.Drawing.Size(94, 13);
            this.Lambda.TabIndex = 7;
            this.Lambda.Text = "Lambda (λ ≤ N/T):";
            // 
            // chart1
            // 
            this.chart1.BorderlineWidth = 2;
            chartArea1.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chart1.Legends.Add(legend1);
            this.chart1.Location = new System.Drawing.Point(41, 135);
            this.chart1.Name = "chart1";
            this.chart1.Size = new System.Drawing.Size(570, 326);
            this.chart1.TabIndex = 8;
            this.chart1.Text = "chart1";
            // 
            // chart2
            // 
            chartArea2.Name = "ChartArea1";
            this.chart2.ChartAreas.Add(chartArea2);
            legend2.Name = "Legend1";
            this.chart2.Legends.Add(legend2);
            this.chart2.Location = new System.Drawing.Point(767, 135);
            this.chart2.Name = "chart2";
            this.chart2.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.None;
            this.chart2.PaletteCustomColors = new System.Drawing.Color[] {
        System.Drawing.Color.Blue};
            this.chart2.Size = new System.Drawing.Size(570, 326);
            this.chart2.TabIndex = 9;
            this.chart2.Text = "chart2";
            // 
            // chart3
            // 
            chartArea3.Name = "ChartArea1";
            this.chart3.ChartAreas.Add(chartArea3);
            legend3.Name = "Legend1";
            this.chart3.Legends.Add(legend3);
            this.chart3.Location = new System.Drawing.Point(462, 524);
            this.chart3.Name = "chart3";
            this.chart3.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.None;
            this.chart3.PaletteCustomColors = new System.Drawing.Color[] {
        System.Drawing.Color.Green};
            this.chart3.Size = new System.Drawing.Size(570, 326);
            this.chart3.TabIndex = 10;
            this.chart3.Text = "chart3";
            // 
            // btnGenCharts
            // 
            this.btnGenCharts.Location = new System.Drawing.Point(621, 88);
            this.btnGenCharts.Name = "btnGenCharts";
            this.btnGenCharts.Size = new System.Drawing.Size(120, 34);
            this.btnGenCharts.TabIndex = 11;
            this.btnGenCharts.Text = "Generate charts";
            this.btnGenCharts.UseVisualStyleBackColor = true;
            this.btnGenCharts.Click += new System.EventHandler(this.btnGenCharts_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1432, 924);
            this.Controls.Add(this.btnGenCharts);
            this.Controls.Add(this.chart3);
            this.Controls.Add(this.chart2);
            this.Controls.Add(this.chart1);
            this.Controls.Add(this.Lambda);
            this.Controls.Add(this.PeriodT);
            this.Controls.Add(this.NAttacks);
            this.Controls.Add(this.MServers);
            this.Controls.Add(this.textBox4);
            this.Controls.Add(this.textBox3);
            this.Controls.Add(this.textBox2);
            this.Controls.Add(this.textBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Homework 5";
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart3)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.TextBox textBox4;
        private System.Windows.Forms.Label MServers;
        private System.Windows.Forms.Label NAttacks;
        private System.Windows.Forms.Label PeriodT;
        private System.Windows.Forms.Label Lambda;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart2;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart3;
        private System.Windows.Forms.Button btnGenCharts;
    }
}

