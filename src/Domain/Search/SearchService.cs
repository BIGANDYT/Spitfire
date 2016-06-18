using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq;
using Sitecore.ContentSearch.Utilities;
using Sitecore.Data;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch.SearchTypes;

namespace Habitat.Search
{
    public class SearchService
    {
        private static ISearchIndex _index;
        private List<ID> _templateRestrictions = new List<ID>();
        private List<string> _facets = new List<string>();

        private static ISearchIndex Index
        {
            get
            {
                return _index ??
                (_index = ContentSearchManager.GetIndex(Sitecore.Configuration.Settings.GetSetting("sitecore_web_index")));
            }
        }

        public List<ID> TemplateRestrictions
        {
            get { return _templateRestrictions; }
            set { _templateRestrictions = value; }
        }

        public List<string> Facets
        {
            get { return _facets; }
            set { _facets = value; }
        }

        public SearchResults<SearchResultItem> Search(string searchTerm)
        {
            // Create search context - required for searching
            using (var context = Index.CreateSearchContext())
            {
                // Setup a predicate builder as an easy way to build up predicate
                var predicate = PredicateBuilder.True<SearchResultItem>();
                // Restrict search to limited number of templates (only person items) using an Or on the predicate
                predicate = TemplateRestrictions.Aggregate(predicate, (current, t) => current.Or(p => p.TemplateId == t));
                // Use filter and get an IQueryable
                IQueryable<SearchResultItem> query = context.GetQueryable<SearchResultItem>().Filter(predicate);

                // now we can perform filter if we have a search term
                if (!string.IsNullOrEmpty(searchTerm))
                {
                    query = query.Where(i => i.Fields["Title"].Equals(searchTerm).Boost(10));
                }

                // Apply facets to query
                if (Facets.Any())
                {
                    // Go through and set up facets on the IQueryable 
                    query = Facets.Aggregate(query, (current, facetName) => current.FacetOn(c => c[facetName]));
                }

                // Call query and return results
                return query.GetResults();
            }
        }
    }
}