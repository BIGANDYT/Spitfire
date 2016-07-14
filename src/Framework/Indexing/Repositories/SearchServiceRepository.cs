namespace Sitecore.Framework.Indexing.Repositories
{
    using Habitat.Framework.Indexing;
    using Habitat.Framework.Indexing.Repositories;

    public class SearchServiceRepository : ISearchServiceRepository
  {
    private readonly ISearchSettingsRepository settingsRepository;

    public SearchServiceRepository() : this(new SearchSettingsRepositoryBase())
    {
    }

    public SearchServiceRepository(ISearchSettingsRepository searchSettingsRepository)
    {
      this.settingsRepository = searchSettingsRepository;
    }

    public virtual SearchService Get()
    {
      return new SearchService(this.settingsRepository.Get());
    }
  }
}