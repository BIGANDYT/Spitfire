using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Pipelines.GetRenderingDatasource;
using Sitecore.SecurityModel;

namespace Habitat.Framework.SitecoreExtensions.Pipelines
{
    public class CreateRelativeDataSourceFolder
    {
        private static ID DataSourceLocationField = new ID("{B5B27AF1-25EF-405C-87CE-369B3A004016}");
        private static ID FolderTemplateID = new ID("{A87A00B1-E6DB-45AB-8B54-636FEC3B5523}");
        private static TemplateID FolderTemplate = new TemplateID(FolderTemplateID);
        private static string RelativePath = "./";

        public void Process(GetRenderingDatasourceArgs args)
        {
            string dataSourceLocation = args.RenderingItem.Fields[DataSourceLocationField].Value;

            if (string.IsNullOrWhiteSpace(dataSourceLocation))
            {
                return;
            }

            if (!dataSourceLocation.StartsWith(RelativePath))
            {
                return;
            }

            if (string.IsNullOrWhiteSpace(args.ContextItemPath))
            {
                return;
            }

            string subFolderPath = args.ContextItemPath + dataSourceLocation.Substring(1);

            if (args.ContentDatabase.GetItem(subFolderPath) != null)
            {
                return;
            }

            Item parent = args.ContentDatabase.GetItem(args.ContextItemPath);

            if (parent == null)
            {
                return;
            }

            string newItemName = dataSourceLocation.Substring(2);
            string[] foldersToCreate = newItemName.Split('/');
            foreach (var substring in foldersToCreate)
            {
                using (new SecurityDisabler())
                {
                    Client.Site.Notifications.Disabled = true;
                    parent = parent.Add(substring, FolderTemplate);
                    Client.Site.Notifications.Disabled = false;
                }
            }
        }
    }
}