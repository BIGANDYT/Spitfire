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
    public class TaggingModel : RenderingModel
    {        
        /// <summary>
        /// Set tags
        /// </summary>
        public Item[] Tags { get; set; }

        public override void Initialize(Rendering rendering)
        {
            base.Initialize(rendering);            
            Sitecore.Data.Fields.MultilistField fld = (Sitecore.Data.Fields.MultilistField)rendering?.Item?.Fields["Page Tagging"];
            if (fld != null)
            {
                Tags = fld.GetItems();
            }        
        }
    }
}