# Sube node API

## Creation process of commits and branches

<p>The Husky Library has been implemented in the project to validate the process of creating commits and branches and thus follow a standard.</p>

<p>The commits must be created following a convention that is configurable in the file <code>commitlint.config.js</code></p>

### Example of a correct commit

```javascript
    git commit -m "feat(scope): info del commit"
```

### Example of an incorrect commit

```javascript
    git commit -m "feat(scope): Info del commit"
```

<p>This would return an error similar to this:</p>

```
⧗   input: feat(scope): Info del commit
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

<p>The scope in optional, but it would be advisable to add it, since India where the changes sent in said Commit point.Example:</p>

```javascript
    git commit -m "feat(login): Added key recovery button"
    git commit -m "fix(register): resolved error by sending email to new users"
```

## List of types of commits:

<p>'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf','refactor', 'revert', 'style', 'test'</p>

<p>They can review the convention for the commits in the following link: <a href="https://www.conventionalcommits.org/es/v1.0.0/">Convención</a></p>

# Branchs

<p>The branch must also follow a convention and should start with any of the following prefixes: hotfix | bugfix | fix | feature</p>

<p>If you try to create an commitment in a branch that does not follow the standard, this will not allow the creation of the ADS and much less a push to that branch</p>

<p>To change the name of your current branch, use the following command</p>
<p><code>git branch -m old-name new-name</code></p>

```javascript
    git branch -m mi-rama-actual feature/BUQ-123-info-de-rama
```

<p>You can add the ticket number that way in the name of the branch so that it is associated with the ticket in jira</p>
<p>You can check the info a bit about the appointment of branches in the following link: <a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow">Branch Flow</a></p>

## Postman

<p>Postman collections are found in the root folder of the same name and are updated when changes arise in the endpoints if it is merited.</p>
<p>Update url for the specified domain for the tests in the postman environment attached to this repo</p>
