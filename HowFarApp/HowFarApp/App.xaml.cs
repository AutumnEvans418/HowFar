using HowFar.Core.Models;
using System;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace HowFarApp
{
    public partial class App : Application, IApp
    {
        public App()
        {
            InitializeComponent();
            //var containerBuilder = new ContainerBuilder();

            //containerBuilder.RegisterInstance(this).As<IApp>();
            //containerBuilder.RegisterSource(new AnyConcreteTypeNotAlreadyRegisteredSource());
           
            //var container = containerBuilder.Build();
            var container = new UnityContainer();
            container.RegisterInstance(typeof(IApp), this);
            container.RegisterSingleton<IMeasureConverters, MeasureConverters>();
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
    }
}
