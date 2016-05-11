using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.PageContent.Model
{
    public class ListModel : RenderingModel
    {
        public IList<Item> Items { get; set; }       

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            Items = rendering.Item.Children.ToList();           
        }
    }


}