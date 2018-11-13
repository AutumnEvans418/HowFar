using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Core.Models
{
    public static class Extensions
    {
        public static bool Same<T>(this IEnumerable<T> first, IEnumerable<T> second)
        {
            var fList = first.ToList();
            var sList = second.ToList();

            for (int i = 0; i < fList.Count; i++)
            {
                if (fList[i].Equals(sList[i]) != true)
                {
                    return false;
                }
            }

            return true;
        }

        public static List<List<T>> Combinator<T>(this IEnumerable<T> data, int? pairSize = null)
        {
            var datalist = data.ToList();
            var count = datalist.Count();
            if (pairSize == null)
            {
                pairSize = count;
            }
            int size = (int)pairSize;
            var array = new List<List<T>>();

            

            //build Grid
            for (int i = 0; i < count; i++)
            {
                array.Add(datalist.ToList());

                var item = datalist[0];
                datalist.Remove(item);
                datalist.Add(item);
            }
            var actionArray = array.SelectMany(p => p).ToList();
            actionArray.AddRange(array.SelectMany(p=>p).Reverse());
            List<List<T>> finalData = GetCombinations(size, actionArray);

            //var r = actionArray.ToList();
            //r.Reverse();
            //var secondFinalData = GetCombinations(size, r);

            //foreach (var list in secondFinalData)
            //{
            //    if (finalData.Any(p => p.Same(list)) != true)
            //    {
            //        finalData.Add(list);
            //    }
            //}
            return finalData;
        }

        private static List<List<T>> GetCombinations<T>(int size, List<T> actionArray)
        {
            var finalData = new List<List<T>>();
            bool complete = false;
            var start = 0;
            int arrayCount = actionArray.Count;
            while (!complete)
            {
                List<T> sub = null;
                if (start + size > actionArray.Count)
                {
                    actionArray.AddRange(actionArray.GetRange(0, size));
                }
                sub = actionArray.GetRange(start, size);
                if (finalData.Any(p => p.Same(sub)) != true && sub.GroupBy(p => p).Any(r => r.Count() > 1) != true)
                {
                    finalData.Add(sub);
                }
                if (start > arrayCount)
                {
                    complete = true;
                }

                start++;
            }

            return finalData;
        }

        public static IEnumerable<T> Randomize<T>(this IEnumerable<T> data, Random random)
        {
            var queue = new List<T>(data);
            while (queue.Any())
            {
                for (var index = 0; index < queue.Count; index++)
                {
                    var x1 = queue[index];
                    if (random.Next(0, 10) > 5)
                    {
                        var item = queue[index];
                        queue.Remove(x1);
                        yield return item;
                    }
                }
            }
        }
    }
}