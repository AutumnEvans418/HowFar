using HowFar.Core.Models;
using System;
using System.Linq;
using Dapper;
using HowFarApp.Models;
using HowFarApp.Views;
using Microsoft.EntityFrameworkCore;
using Unity;
using Unity.Injection;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace HowFarApp
{
    public partial class App : Application, IApp
    {
        public App(string dbpath, ILocationService locationService)
        {
#if DEBUG
            LiveReload.Init();
#endif
            InitializeComponent();
            //var containerBuilder = new ContainerBuilder();

            //containerBuilder.RegisterInstance(this).As<IApp>();
            //containerBuilder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource());

            //var container = containerBuilder.Build();

            var container = new UnityContainer();
            container.RegisterInstance(locationService);
            container.RegisterInstance(typeof(IApp), this);
            container.RegisterType<DatabaseContext>(new InjectionConstructor(dbpath));
           // container.RegisterType<IDatabase, DatabaseContext>();
           // Database = () => container.Resolve<IDatabase>();
            
            using (var db = container.Resolve<DatabaseContext>())
            {
                db.Database.EnsureCreated();
                var connection = db.Database.GetDbConnection();
                var names = connection.Query<string>(
                    "SELECT name FROM sqlite_master WHERE type='table';");
                if (names.Count() < 2)
                {
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();
                }
            }

            container.RegisterType<IObjectRepository, ObjectRepository>();
            container.RegisterSingleton<IMeasureConverters, MeasureConverters>();
            container.RegisterInstance(container.Resolve<MeasureConverters>());
            container.RegisterInstance(typeof(IQuizGenerator),
                new QuizGenerator(container.Resolve<IMeasureConverters>(), DateTime.Now.GetHashCode()));

           
            container.RegisterSingleton<IAnswerScorer, AnswerScorerPercent>();
            container.RegisterSingleton<IQuizScorer, QuizScorer>();

         


            MainPage = container.Resolve<SignInPage>(); ;
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }

       // public Func<IDatabase> Database { get; set; }
    }
}
