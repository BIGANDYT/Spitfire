using System.Web.Mvc;
using Habitat.Framework.SitecoreExtensions.Extensions;
using Sitecore.Mvc.Presentation;
using Sitecore.Mvc.Controllers;
using Habitat.Search.Model;
using Sitecore.SecurityModel;
using Sitecore.Data;
using Sitecore.Data.Items;
using System;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;
using Habitat.Search;
using Sitecore.ContentSearch.Linq;

namespace Habitat.News.Controller
{
    public class SearchController : SitecoreController
    {

        [HttpPost]
        public ActionResult DoSearch(SearchModel commentModel)
        {
            SearchService ss = new SearchService();
            Sitecore.Data.ID templateId = new Sitecore.Data.ID("{4E4C2EB4-F7A5-403B-A80E-44146C66A42A}");           
            ss.TemplateRestrictions.Add(templateId);
            // Add a facet
            //peopleSearch.Facets.Add("role_sm");
            // get results
            SearchResults<SearchResultItem> searchResults = ss.Search(commentModel.SearchTerm);
            //searchResults.Hits;
            //hit.Document.Firstname
            return base.Index();
        }
    }
}