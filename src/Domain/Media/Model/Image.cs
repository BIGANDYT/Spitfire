﻿using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.Media.Model
{
    public class Image : RenderingModel
    {     

        /// <summary>
        /// The path to the video in the media library
        /// </summary>
        public string ImageUrl { get; private set; }
        
        /// <summary>
        /// Initialize the Video Model
        /// </summary>
        /// <param name="rendering">The Rendering to use</param>
        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);            
            var background = (ImageField)rendering.Item.Fields["Image"];
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