using HowFar.Core.Models;
using System;
using System.Linq;
using Dapper;
using HowFarApp.Models;
using HowFarApp.ViewModels;
using HowFarApp.Views;
using HowFarApp.Views.Packs;
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
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            var container = containerRegistry.GetContainer();
            container.RegisterInstance(typeof(IApp), this);
            container.RegisterType<DatabaseContext>(new InjectionConstructor(container.Resolve<GetDbPath>()()));

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

            containerRegistry.RegisterForNavigation<NewObjectPage,NewObjectPageViewModel>();
            containerRegistry.RegisterForNavigation<SignInPage>();
            containerRegistry.RegisterForNavigation<MainMenuPage,MainMenuPageViewModel>();
            containerRegistry.RegisterForNavigation<MapPage,MapPageViewModel>();
            containerRegistry.RegisterForNavigation<NewObjectPackPage>();
            containerRegistry.RegisterForNavigation<ObjectManagerPage>();
            containerRegistry.RegisterForNavigation<ObjectPackDetail>();
            containerRegistry.RegisterForNavigation<ObjectPacksPage>();
            containerRegistry.RegisterForNavigation<QuizesPage, QuizesPageViewModel>();
            containerRegistry.RegisterForNavigation<QuizPage, QuizPageViewModel>();
            containerRegistry.RegisterForNavigation<QuizResultPage, QuizResultPageViewModel>();
        }

        protected override void OnInitialized()
        {

#if DEBUG
            LiveReload.Init();
#endif
            InitializeComponent();

            NavigationService.NavigateAsync("SignInPage");
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
