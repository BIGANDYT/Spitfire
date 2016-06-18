using Habitat.Framework.SitecoreExtensions.Model;
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
    public class CommentModel : WffmProofRenderingModel
    {
        public IList<Item> Comments { get; set; }
        public String CommentName { get; set; }
        public String CommentEmail { get; set; }
        public String CommentComment { get; set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);
            Comments = rendering.Item.Children.ToList();
        }
    }
}