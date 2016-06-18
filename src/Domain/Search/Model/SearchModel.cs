using Habitat.Framework.SitecoreExtensions.Model;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.Search.Model
{
    public class SearchModel : WffmProofRenderingModel
    {
        public String SearchTerm { get; set; }
        
    }
}