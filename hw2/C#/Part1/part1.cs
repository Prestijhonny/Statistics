﻿using System;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Threading.Tasks.Dataflow;

class Program
{
    static void Main(){
        string path = "Professional Life - Sheet1.tsv";
        string[,] matrix = tsvToMatrix(path);

        // Qualitative
        string[] instrumentsArray = getColumn(matrix,"Play some instruments? Which ones?");

        Dictionary<string, float> instrumentsDictionary = new Dictionary<string, float>();
        foreach (string i in instrumentsArray){
            string item = i.ToLower();
            if (instrumentsDictionary.ContainsKey(item)){
                instrumentsDictionary[item]++;
            } else {
                instrumentsDictionary[item] = 1;
            }
        }

        // printPercentage(instrumentsDictionary, instrumentsArray.Length);


        // Quantitative discrete
        string[] ambitiousArray = getColumn(matrix,"Ambitious (0-5)");

        Dictionary<string, float> ambitiousDictionary = new Dictionary<string, float>();
        foreach (string i in ambitiousArray){
            string item = i.ToLower();
            if (ambitiousDictionary.ContainsKey(item)){
                ambitiousDictionary[item]++;
            } else {
                ambitiousDictionary[item] = 1;
            }
        }
        
        // printPercentage(ambitiousDictionary, ambitiousArray.Length);
        
        // Quantitative continuous
        string[] weightArray = getColumn(matrix,"weight");
        
        Dictionary<string, float> weightDictionary = new Dictionary<string, float>();
        weightDictionary.Add("50-", 0);
        weightDictionary.Add("[50;60)", 0);
        weightDictionary.Add("[60;70)", 0);
        weightDictionary.Add("[70;80)", 0);
        weightDictionary.Add("80+", 0);

        int weightUnits = 0;

        foreach (string i in weightArray){
            string item = i.ToLower();
            if(item.Length != 0){
                weightUnits++;
                int w = int.Parse(item);
                if (w < 50) {
                    weightDictionary["50-"] += 1;
                } else if (w >= 50 && w < 60) {
                    weightDictionary["[50;60)"] += 1;
                } else if (w >= 60 && w < 70) {
                    weightDictionary["[60;70)"] += 1;
                } else if (w >= 70 && w < 80) {
                    weightDictionary["[70;80)"] += 1;
                } else if (w >= 80) {
                    weightDictionary["80+"] += 1;
                }
            }
        }


    }

    public static string[,] tsvToMatrix(string path){
        string[] lines = File.ReadAllLines(path);

        int numRows = lines.Length;
        int numCols = lines[0].Split('\t').Length;

        string[,] matrix = new string[numRows, numCols];
        for(int i = 0; i < numRows; i++){
            string[] splits = lines[i].Split('\t');
            
            for(int j = 0; j < numCols; j++){
                matrix[i,j] = splits[j];
            }
        }
        return matrix;
    }

    public static string[] getColumn(string[,] matrix, string columname){ 
        string[] column = new string[matrix.GetLength(0)-1];
        
        for (int j = 0; j < matrix.GetLength(1); j++){
           if (matrix[0, j] == columname){
            for (int i = 1; i < matrix.GetLength(0); i++){
                column[i-1] = matrix[i, j];
            }
            break; 
            }
        }
        return column;
    }

    public static int getIndex(string[,] matrix, string variable){
        int index = 0;
        for (int j = 0; j < matrix.GetLength(0); j++) {

            if (matrix[0, j] == variable) {
                index = j;
                break;
            }
        }
        return index;
    }
    public static void printColumn(string[] column){
        foreach(var values in column){
            Console.WriteLine(values);
        }
    }

    public static void printMatrix(string[,] matrix){
        for (int row = 0; row < matrix.GetLength(0); row++){
            for (int col = 0; col < matrix.GetLength(1); col++){
                Console.Write(matrix[row, col] + " ");
            }
            Console.WriteLine();
        }
    }
    public static void printAbsolute(Dictionary<string, float> dictionary){
        foreach (var kvp in dictionary){
            Console.WriteLine($"Key: {kvp.Key} ---> Absolute frequency: {kvp.Value}");
        }
    }

    public static void printRelative(Dictionary<string, float> dictionary, int len){
        foreach (var kvp in dictionary){
             Console.WriteLine($"Key: {kvp.Key} ---> Relative frequency: {kvp.Value/len}");
        }
    }

    public static void printPercentage(Dictionary<string, float> dictionary, int len){
        foreach (var kvp in dictionary){
             Console.WriteLine($"Key: {kvp.Key} ---> Percentage frequency: {(kvp.Value/len)*100}%");
        } 
    }
}