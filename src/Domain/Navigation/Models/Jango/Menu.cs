using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Habitat.Framework.SitecoreExtensions.Extensions;
using Habitat.Navigation.Repositories;

namespace Habitat.Navigation.Models.Jango
{
    public class Menu : RenderingModel
    {
        /// <summary>
        /// Gets Menu root items
        /// </summary>
        public IList<NavigationItem> MenuItems { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            NavigationRepository navigationRepository = new NavigationRepository(RenderingContext.Current.Rendering.Item);
            MenuItems = navigationRepository.GetPrimaryMenu().Items;
        }
    }
}