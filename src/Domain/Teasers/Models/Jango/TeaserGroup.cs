using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.Teasers.Model
{
    public class TeaserGroup : RenderingModel
    {
        public IList<Item> Teasers { get; private set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            if (!string.IsNullOrEmpty(Item["Teasers"]))
            {
                MultilistField teasers = Item.Fields["Teasers"];

                if (teasers != null)
                {
                    Teasers = teasers.GetItems().ToList();
                }
            }
        }
    }
}