using System;
using HowFarApp.Views;
using Prism.Commands;
using Prism.Navigation;

namespace HowFarApp.ViewModels
{
    public class MainMenuPageViewModel : ViewModelBase
    {
        public MainMenuPageViewModel(INavigationService navigationService) : base(navigationService)
        {
            ObjectManagerCommand = new DelegateCommand(ObjectManager);
            ObjectPacksCommand = new DelegateCommand(ObjectPacks);
            MapCommand = new DelegateCommand(Map);
            QuizzesCommand = new DelegateCommand(Quizes);
        }

        public DelegateCommand ObjectManagerCommand { get; set; }
        public DelegateCommand ObjectPacksCommand { get; set; }
        public DelegateCommand MapCommand { get; set; }
        public DelegateCommand QuizzesCommand { get; set; }

        private void ObjectManager()
        {
            NavigationService.NavigateAsync(nameof(ObjectManagerPage));
        }

        private void ObjectPacks()
        {
            NavigationService.NavigateAsync(nameof(ObjectPacksPage));
        }

        private void Map()
        {
            NavigationService.NavigateAsync(nameof(MapPage));
        }

        private void Quizes()
        {
            NavigationService.NavigateAsync(nameof(QuizesPage));
        }
    }
}