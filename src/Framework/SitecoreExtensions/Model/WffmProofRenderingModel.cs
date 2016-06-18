using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Habitat.Framework.SitecoreExtensions.Model
{
    public class WffmProofRenderingModel : RenderingModel
    {
        public override Item Item
        {
            get
            {
                var rendering = Rendering;

                return rendering != null ? rendering.Item : null;
            }
        }

        public override Rendering Rendering
        {
            get
            {
                Rendering rendering = null;
                try
                {
                    rendering = base.Rendering;
                }
                catch (InvalidOperationException e)
                {
                    // protecting against custom WFFM model binder
                }

                return rendering;
            }
            set { base.Rendering = value; }
        }
    }
}