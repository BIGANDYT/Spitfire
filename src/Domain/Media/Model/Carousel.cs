using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.Media.Model
{
    public class Carousel : RenderingModel
    {
        public IList<Item> Slides { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            if (!string.IsNullOrEmpty(Item["Slides"]))
            {
                MultilistField slides = Item.Fields["Slides"];

                if (slides != null)
                {
                    Slides = slides.GetItems().ToList();
                }
            }
        }
    }
}