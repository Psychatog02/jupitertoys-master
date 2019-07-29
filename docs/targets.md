## Makefile targets
```
Available targets:

  ansible/requirements                Install Ansible requirements
  clean                               Clean maker
  gitignore                           Copies a .gitignore template to your project
  help                                Help screen
  help/all                            Display help for all targets
  help/short                          This help short screen
  packer/clean                        Cleans Packer vendor from Maker
  packer/install                      Installs Packer
  packer/version                      Prints the Packer version
  readme                              Alias for readme/build
  readme/build                        Create README.md by building it from README.yaml
  terraform/apply                     Builds or changes infrastructure
  terraform/clean                     Cleans Terraform vendor from Maker
  terraform/console                   Interactive console for Terraform interpolations
  terraform/destroy                   Destroy Terraform-managed infrastructure, removes .terraform and local state files
  terraform/fmt                       Rewrites config files to canonical format
  terraform/get                       Download and install modules for the configuration
  terraform/graph                     Create a visual graph of Terraform resources
  terraform/init                      Initialize a Terraform working directory
  terraform/init-backend              Initialize a Terraform working directory with S3 as backend
  terraform/install                   Install terraform
  terraform/output                    Read an output from a state file
  terraform/plan                      Generate and show an execution plan
  terraform/providers                 Prints a tree of the providers used in the configuration
  terraform/push                      Upload this Terraform module to Atlas to run
  terraform/refresh                   Update local state file against real resources
  terraform/show                      Inspect Terraform state or plan
  terraform/taint                     Manually mark a resource for recreation
  terraform/untaint                   Manually unmark a resource as tainted
  terraform/validate                  Validates the Terraform files
  terraform/version                   Prints the Terraform version
  terraform/workspace                 Select workspace
  update                              Updates maker
```