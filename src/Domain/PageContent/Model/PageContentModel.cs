using System.Collections.Specialized;
using Sitecore.Mvc.Presentation;
using Sitecore.Web;
using Sitecore.Data.Fields;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using Sitecore.Data.Items;
using Sitecore.Collections;

namespace Habitat.PageContent.Models
{
    public class PageContentModel : RenderingModel
    {
        /// <summary>
        /// Set image url
        /// </summary>
        public string ImageUrl { get; private set; }

        /// <summary>
        /// Set class colour
        /// </summary>
        public string ClassColour { get; private set; }


        /// <summary>
        /// Set image url
        /// </summary>
        public ChildList CarouselItems { get; private set; }


        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            var background = (ImageField)rendering.Item.Fields["ComponentImage"];
            if (background != null)
            {
                var mediaItem = background.MediaItem;
                if (mediaItem != null)
                {
                    ImageUrl = MediaManager.GetMediaUrl(mediaItem);
                }
            }
            ClassColour = rendering?.Item?.Fields["ClassColour"]?.Value;
            Sitecore.Data.Fields.InternalLinkField fldURL = (Sitecore.Data.Fields.InternalLinkField)rendering?.Item?.Fields["CarouselItems"];
            if (fldURL != null)
            {
                CarouselItems = fldURL?.TargetItem?.Children;
            }
        }
    }
}