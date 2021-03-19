﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HowFarApp.Models
{
    public static class MeasureMath
    {
        public static double Distance(double lat1, double lon1, double lat2, double lon2, char unit)
        {
            double theta = lon1 - lon2;
            double dist = Math.Sin(Deg2Rad(lat1)) * Math.Sin(Deg2Rad(lat2)) + Math.Cos(Deg2Rad(lat1)) * Math.Cos(Deg2Rad(lat2)) * Math.Cos(Deg2Rad(theta));
            dist = Math.Acos(dist);
            dist = Rad2Deg(dist);
            dist = dist * 60 * 1.1515;
            if (unit == 'K')
            {
                dist = dist * 1.609344;
            }
            else if (unit == 'N')
            {
                dist = dist * 0.8684;
            }
            return (dist);
        }
        public static double Deg2Rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        public static double Rad2Deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }
    }
}
