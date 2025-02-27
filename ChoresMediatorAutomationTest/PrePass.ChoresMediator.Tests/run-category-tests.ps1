param (
  [string]$category
)

dotnet test --filter "TestCategory=$category"