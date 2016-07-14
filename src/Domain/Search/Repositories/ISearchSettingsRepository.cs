namespace Habitat.Search.Repositories
{
  using Habitat.Search.Models;

  public interface ISearchSettingsRepository
  {
    SearchSettings Get();
    SearchSettings Get(string query);

  }
}