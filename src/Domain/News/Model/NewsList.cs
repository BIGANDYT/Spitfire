using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.News.Model
{
    public class NewsList : RenderingModel
    {
        public IList<Item> Items { get; set; }

        /// <summary>
        /// Set image url
        /// </summary>
        public string ImageUrl { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            Items = rendering.Item.Children.ToList();
            var imgage = (ImageField)rendering.Item.Fields["Image"];
            if (imgage != null)
            {
                var mediaItem = imgage.MediaItem;
                if (mediaItem != null)
                {
                    ImageUrl = MediaManager.GetMediaUrl(mediaItem);
                }
            }
        }
    }


}