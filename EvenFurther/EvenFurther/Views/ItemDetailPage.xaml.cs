﻿using EvenFurther.ViewModels;
using System.ComponentModel;
using Xamarin.Forms;

namespace EvenFurther.Views
{
    public partial class ItemDetailPage : ContentPage
    {
        public ItemDetailPage()
        {
            InitializeComponent();
            BindingContext = new ItemDetailViewModel();
        }
    }
}