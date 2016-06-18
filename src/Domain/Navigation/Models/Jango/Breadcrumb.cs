using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Habitat.Framework.SitecoreExtensions.Extensions;
using Habitat.Navigation.Repositories;
using Sitecore.Data.Fields;
using Sitecore.Resources.Media;

namespace Habitat.Navigation.Models.Jango
{
    public class Breadcrumb : RenderingModel
    {
        /// <summary>
        /// Gets Menu root items
        /// </summary>
        public IList<NavigationItem> Items { get; set; }

        /// <summary>
        /// Set image url
        /// </summary>
        public string ImageUrl { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            NavigationRepository navigationRepository = new NavigationRepository(RenderingContext.Current.Rendering.Item);
            Items = navigationRepository.GetBreadcrumb().Items;
            var background = (ImageField)rendering.Item.Fields["ComponentImage"];
            if (background != null)
            {
                var mediaItem = background.MediaItem;
                if (mediaItem != null)
                {
                    ImageUrl = MediaManager.GetMediaUrl(mediaItem);
                }
            }
        }
    }
}