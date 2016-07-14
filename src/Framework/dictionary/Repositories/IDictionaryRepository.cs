using Habitat.Framework.Dictionary.Models;
using Sitecore.Sites;

namespace Habitat.Framework.Dictionary.Repositories
{
  public interface IDictionaryRepository
  {
    Models.Dictionary Get(SiteContext site);
  }
}