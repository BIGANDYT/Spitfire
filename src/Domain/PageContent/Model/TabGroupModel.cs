using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.PageContent.Models
{
    public class TabGroupModel : RenderingModel
    {
        public IList<Item> Tabs { get; private set; }

        public String ActiveTab { get; private set; }

        // <summary>
        /// Set background image url
        /// </summary>
        public string BackgroundImageUrl { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            if (!string.IsNullOrEmpty(Item["Tabs"]))
            {
                MultilistField slides = Item.Fields["Tabs"];

                if (slides != null)
                {
                    Tabs = slides.GetItems().ToList();
                }
            }
            var background = (ImageField)rendering.Item.Fields["BackgroundImage"];
            if (background != null)
            {
                var mediaItem = background.MediaItem;
                if (mediaItem != null)
                {
                    BackgroundImageUrl = MediaManager.GetMediaUrl(mediaItem);
                }
            }
            //if (rendering.Parameters != null)
            //{
            //var parms = rendering.Parameters;
            //ActiveTab = parms["Active Tab"];
            //}
            if (!string.IsNullOrEmpty(Item["Active Tab"]))
            {
                ActiveTab = Item["Active Tab"];
            }
        }
    }
}