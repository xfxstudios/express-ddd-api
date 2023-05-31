local_branch_name="$(git rev-parse --abbrev-ref HEAD)"
valid_branch_prefix="hotfix|bugfix|fix|feature"
valid_branch_regex="^(($valid_branch_prefix)\/[a-zA-Z0-9\-]+)$"


message="\n\n\u005bBRANCH NAME VALIDATION\u005d \n\n\u005b\u0078\u005d=> There is something wrong with your branch name. \n\u005b\u0021\u005d=> Branch names in this project must adhere to this contract: $valid_branch_prefix/<branch-name>. \n\u005b\u0021\u005d=> Your push will be rejected. You should rename your branch to a valid name and try again or create a new branch and lauch a PR request."


if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo -e "$message"
    exit 1
fi

exit 0