using HowFarApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using HowFar.Core.Models;
using System.Collections.Concurrent;

namespace EvenFurther.Views
{
    public class CacheServiceMock : IProperties
    {
        ConcurrentDictionary<string, object> Data = new ConcurrentDictionary<string, object>();
        public void Add(string key, object obj)
        {
            Data.AddOrUpdate(key, obj, (k, o) => obj);
        }

        public bool ContainsKey(string key)
        {
            return Data.ContainsKey(key);
        }

        public T Get<T>(string key) where T : class
        {
            if (Data.TryGetValue(key, out var o))
                return o as T;
            return null;
        }

        public void Set(string key, object obj)
        {
            Data.AddOrUpdate(key, obj, (k, o) => obj);
        }
    }

    public class AppCacheMock : IAppCache
    {
        public IProperties Properties { get; } = new CacheServiceMock();

        public Task SavePropertiesAsync()
        {
            return Task.CompletedTask;
        }
    }


    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ObjectManagerPage : ContentPage
    {
        public ObjectManagerPage()
        {
            InitializeComponent();
            var repo = new ObjectRepositoryCache(new AppCacheMock());
            BindingContext = new ObjectManagerPageViewModel(null, new ObjectManager(new MeasureConverters(repo)));
        }
    }
}