using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Data structures: Array, List, Dictionary, Sorted List, HashSet, SortedSet, Queue, Stack, LinkedList

        // Array
        int[] arr = new int[10];
        for (int i = 0; i < arr.Length; i++)
        {
            if (arr[i] == 5)
            {
                Console.WriteLine("Element found! Breaking the loop.");
                break; 
            }
        }

        Array.Resize(ref arr, arr.Length + 1);
        arr[arr.Length - 1] = element; // Add element
        Array.Clear(arr, index, 1); // Remove element by index
        int element = arr[index]; // Get element by index
        bool contains = Array.Exists(arr, e => e == element); // Check existence

        // List
        List<int> list = new List<int>();
        foreach (var item in list)
        {
            if (item == 7)
            {
                Console.WriteLine("Item found! Continue the loop.");
                continue; 
            }
        }

        list.Add(element); // Add element
        list.RemoveAt(index); // Remove element by index
        int element = list[index]; // Get element by index
        bool contains = list.Contains(element); // Check existence

        // Dictionary
        Dictionary<string, int> dict = new Dictionary<string, int>();
        foreach (var key in dict.Keys)
        {
            // Loop (break/continue) the same as list and array
        }

        dict[key] = value; // Add key/value
        dict.Remove(key); // Remove key/value
        bool containsKey = dict.ContainsKey(key); // Check existence of key
        bool containsValue = dict.ContainsValue(value); // Check existence of value

        // Sorted List (not available in C#, use SortedDictionary)
        // Use SortedDictionary<TKey, TValue>

        // HashSet
        HashSet<int> hashSet = new HashSet<int>();
        foreach (var item in hashSet)
        {
            // Loop (break/continue) the same as list and array
        }

        hashSet.Add(element); // Add element
        hashSet.Remove(element); // Remove element
        bool contains = hashSet.Contains(element); // Check existence

        // SortedSet
        SortedSet<int> sortedSet = new SortedSet<int>();
        foreach (var item in sortedSet)
        {
            // Loop (break/continue) the same as list and array
        }

        sortedSet.Add(element); // Add element
        sortedSet.Remove(element); // Remove element
        bool contains = sortedSet.Contains(element); // Check existence

        // Queue
        Queue<int> queue = new Queue<int>();
        foreach (var item in queue)
        {
            // Loop (break/continue) the same as list and array
        }

        queue.Enqueue(element); // Enqueue
        int front = queue.Dequeue(); // Dequeue
        int peek = queue.Peek(); // Peek front element
        bool nonEmpty = queue.Count > 0; // Check non-empty

        // Stack
        Stack<int> stack = new Stack<int>();
        foreach (var item in stack)
        {
            // Loop (break/continue) the same as list and array
        }

        stack.Push(element); // Push
        int pop = stack.Pop(); // Pop
        int peek = stack.Peek(); // Peek top element
        bool nonEmpty = stack.Count > 0; // Check non-empty

        // LinkedList
        LinkedList<int> linkedList = new LinkedList<int>();
        foreach (var item in linkedList)
        {
            // Loop (break/continue) the same as list and array
        }

        linkedList.AddLast(element); // Add element
        linkedList.Remove(element); // Remove element
        bool contains = linkedList.Contains(element); // Check existence
    }
}
