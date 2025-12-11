git reset HEAD~1
rm ./backport.sh
git cherry-pick f3318cab6d9e269d46a7a8dd94d1b298aabeb22a
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
