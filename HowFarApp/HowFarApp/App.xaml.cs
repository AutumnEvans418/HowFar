using HowFar.Core.Models;
using System;
using System.Linq;
using Dapper;
using HowFar.Core;
using HowFarApp.Models;
using HowFarApp.ViewModels;
using HowFarApp.Views;
using Microsoft.AppCenter;
using Microsoft.AppCenter.Analytics;
using Microsoft.AppCenter.Crashes;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

using Prism;
using Prism.Ioc;
using Prism.Unity;
using Unity;
using Unity.Injection;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;


[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace HowFarApp
{
    public delegate string GetDbPath();
    public partial class App : IApp
    {

        public App(IPlatformInitializer platformInitializer):base(platformInitializer)
        {
            AppDomain.CurrentDomain.UnhandledException += App_UnhandledExceptionHandler;
        }

        private void App_UnhandledExceptionHandler(object sender, UnhandledExceptionEventArgs e)
        {
            if (e.ExceptionObject is Exception ex)
            {
                Crashes.TrackError(ex);
                App.Current.MainPage.DisplayAlert("ERROR", ex.Message + "\n" + ex.StackTrace, "Ok");
            }
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            var container = containerRegistry.GetContainer();
            container.RegisterInstance(typeof(IApp), this);
            container.RegisterType<DatabaseContext>(new InjectionConstructor(container.Resolve<GetDbPath>()()));

            try
            {
                //var connection = new SqliteConnection("DataSource=:memory:");
                //connection.Open();
                //var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlite(connection).Options;
                //container.RegisterType<DatabaseContext>(new InjectionConstructor(options));
                SetupDb(container);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("There was a problem building the database",e);
            }


            container.RegisterType<IObjectRepository, ObjectRepository>();
            container.RegisterSingleton<IMeasureConverters, MeasureConverters>();
            container.RegisterInstance(container.Resolve<MeasureConverters>());
            container.RegisterInstance(typeof(IQuizGenerator),
                new QuizGenerator(container.Resolve<IMeasureConverters>(), DateTime.Now.GetHashCode()));

            //container.RegisterInstance<IPermissions>(CrossPermissions.Current);
            container.RegisterSingleton<IAnswerScorer, AnswerScorerPercent>();
            container.RegisterSingleton<IQuizScorer, QuizScorer>();
            container.RegisterType<IGeocoder, GeocoderModel>();
            container.RegisterType<IObjectManager, ObjectManager>();
            containerRegistry.RegisterForNavigation<NewObjectPage,NewObjectPageViewModel>();
            containerRegistry.RegisterForNavigation<SignInPage, SignInPageViewModel>();
            containerRegistry.RegisterForNavigation<MainMenuPage,MainMenuPageViewModel>();
            containerRegistry.RegisterForNavigation<MapPage,MapPageViewModel>();
            containerRegistry.RegisterForNavigation<NewObjectPackPage, NewObjectPackPageViewModel>();
            containerRegistry.RegisterForNavigation<ObjectManagerPage, ObjectManagerPageViewModel>();
            containerRegistry.RegisterForNavigation<ObjectPackDetailPage, ObjectPackDetailPageViewModel>();
            containerRegistry.RegisterForNavigation<ObjectPacksPage, ObjectPacksPageViewModel>();
            containerRegistry.RegisterForNavigation<QuizesPage, QuizesPageViewModel>();
            containerRegistry.RegisterForNavigation<QuizPage, QuizPageViewModel>();
            containerRegistry.RegisterForNavigation<QuizResultPage, QuizResultPageViewModel>();
            containerRegistry.RegisterForNavigation<NavigationPage>();
        }

        private static void SetupDb(IUnityContainer container)
        {
           
            using (var db = container.Resolve<DatabaseContext>())
            {
                //var connection = db.Database.GetDbConnection();

                try
                {
                     db.Database.EnsureCreated();

                    //Ext.CreateDatabase(connection);

                    db.ObjectMeasurements.FirstOrDefault();
                    db.ObjectPacks.FirstOrDefault();
                }
                catch (Exception e)
                {
                    
                    //Ext.DeleteDatabase(connection);
                    db.Database.EnsureDeleted();
                    Console.WriteLine(e);
                    throw;
                }
                //var connection = db.Database.GetDbConnection();
                //var names = connection.Query<string>(
                //    "SELECT name FROM sqlite_master WHERE type='table';");
                //if (names.Count() < 2)
                //{
                //    db.Database.EnsureDeleted();
                //    db.Database.EnsureCreated();
                //}
            }
        }

        protected override void OnInitialized()
        {
            AppCenter.Start("android=46b78faa-c161-49fa-8309-e0ab855f4905;" + "uwp=c1529d5e-180b-4bec-9a10-f528ecf7dd7a;", typeof(Analytics), typeof(Crashes));
#if DEBUG
            LiveReload.Init();
#endif
            InitializeComponent();

            NavigationService.NavigateAsync("NavigationPage/MainMenuPage");
        }

        //protected override void OnStart()
        //{
        //    // Handle when your app starts
        //}

        //protected override void OnSleep()
        //{
        //    // Handle when your app sleeps
        //}



        //protected override void OnResume()
        //{
        //    // Handle when your app resumes
        //}

        // public Func<IDatabase> Database { get; set; }
    }
}
