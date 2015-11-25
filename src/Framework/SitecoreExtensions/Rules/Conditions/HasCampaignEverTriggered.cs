using Sitecore.Analytics;
using Sitecore.Analytics.Core;
using Sitecore.Analytics.Data;
using Sitecore.Analytics.Model;
using Sitecore.Analytics.Tracking;
using Sitecore.Rules;
using Sitecore.Rules.Conditions;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

namespace Habitat.SitecoreExtensions.Rules.Conditions
{
    public class HasCampaignEverTriggered<T> : WhenCondition<T>
    where T : RuleContext
    {
        public string CampaignId
        {
            get;
            set;
        }

        public HasCampaignEverTriggered()
        {
        }

        protected override bool Execute(T ruleContext)
        {
            Tracker.Current.Contact.LoadHistorycalData(4);
            int points = Tracker.Current.Contact.System.Value;
            bool flag = Tracker.Current.Interaction.GetPages().Any<IPageContext>((IPageContext x) => x.PageEvents.FirstOrDefault<Sitecore.Analytics.Model.PageEventData>((Sitecore.Analytics.Model.PageEventData y) => string.Equals(y.Data, this.CampaignId, StringComparison.InvariantCultureIgnoreCase)) != null);
            return flag;
        }
    }
}