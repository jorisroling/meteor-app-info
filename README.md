This package was inprired by [rzymek:meteor-app-version](https://github.com/rzymek/meteor-app-version)

Generates a global variable holding the value of certain git values.
The name of the variable is equal to the filename.
Also on the client a global UI helper is defined with the same name.

## Usage ##

Create a file `AppInfo.info` (can be empty).  
To display application version in your template use:

    Build: {{AppInfo 'build'}}
    Branch: {{AppInfo 'branch'}}
    Author: {{AppInfo 'author'}}
    Tag: {{AppInfo 'tag'}}
    Date: {{AppInfo 'date'}}
    Short: {{AppInfo 'short'}}
    Long: {{AppInfo 'long'}}

