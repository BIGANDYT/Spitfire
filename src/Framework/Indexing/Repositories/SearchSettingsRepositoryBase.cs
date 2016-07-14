using Habitat.Framework.Indexing.Models;

namespace Habitat.Framework.Indexing.Repositories
{

  public class SearchSettingsRepositoryBase : ISearchSettingsRepository
  {
    public virtual ISearchSettings Get()
    {
      return new SearchSettingsBase();
    }
  }
}