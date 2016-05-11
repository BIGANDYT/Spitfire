using System.Collections.Specialized;
using Sitecore.Mvc.Presentation;
using Sitecore.Web;
using Sitecore.Data.Fields;
using Sitecore.Resources.Media;
using System;

namespace Habitat.Teasers.Models.Jango
{
    public class TeaserModel : RenderingModel
    {
        /// <summary>
        /// Set image url
        /// </summary>
        public string ImageUrl { get; private set; }

        /// <summary>
        /// Set link url
        /// </summary>
        public string LinkUrl { get; private set; }

        /// <summary>
        /// Set class colour
        /// </summary>
        public string ClassColour { get; private set; }


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
            Sitecore.Data.Fields.LinkField lf = rendering.Item.Fields["Link"];
            if (lf != null)
            {
                LinkUrl = lf.GetFriendlyUrl();
            }

            ClassColour = rendering?.Item?.Fields["ClassColour"]?.Value;
        }

    }
}