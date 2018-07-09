

## GIT

### 什么是GIT
https://git-scm.com/downloads

- 是一个源代码管理工具
- 在一个项目中，凡是由开发人员编写的都算是源代码
- 源代码有必要管理起来？
- 让源代码可以被追溯，主要记录每次变更了什么，谁主导这次变化
- 人为的维护比较麻烦，
- GIT是Linux之父当年为了维护管理Linux的源代码写的一个工具
- Git 之前 很多使用 svn vss tfs hs ......


- https://guides.github.com/

### 安装GIT

配置环境变量：
	GIT_HOME : C:\PortableGit
	path: %GIT_HOME%;%GIT_HOME%\bin    注：前面要加;分号！！

	
http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000

- git命令行工具
- 基于git命令行的一个客户端软件（提供一个界面去管理源代码）

### GIT命令操作






-- 配置用户名和邮箱的命令



-----上传操作
   git config user.name "zzzzzzcc"  
   git config user.email 'qq869565225@163.com' 

   
  git init
  git add .
  git commit -m "first commit"
  git remote add origin https://github.com/zzzzzzcc/-
  git push -u origin master
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
- 初始化一个本地GIT仓储

```shell
cd 当前项目目录
git init // 初始化一个本地的仓库
```
注：执行git init后在工程目录下会创建.git目录，此目录在windows下是隐藏的。
	需要通过 文件夹选项 > 查看 > 显示隐藏的文件

> 就是在本地文件夹中添加了一个.git的文件夹用于记录所有的项目变更信息

- 查看本地仓储的变更状态

git status
用于查看本地仓储的状态
第一次查看，显示的是一坨没有被跟踪的文件

git status -s // -s 是输出简要的变更日志

- 添加本地暂存（托管）文件

git add
git add .  -添加除忽略清单.gitignore中的所有文件
git add --all -添加除忽略清单.gitignore中的所有文件

可以将一个没有被跟踪的文件添加到跟踪列表

类似于node_modules这种性质的文件是不应该被跟踪

- 添加本地GIT忽略清单文件

在代码库文件夹的根目录添加一个.gitignore文件
此文件用于说明忽略的文件有哪些

- 提交被托管的文件变化到本地仓储

git commit
将本地的变化提交的本地的仓库文件夹归档
一般在有了一个小单元的整体变化后再提交
git commit -m '提交日志'
- 对比差异

git diff
可以用于对比当前状态和版本库中状态的变化

- 提交日志

git log 
可以查看提交日志

- 回归到指定版本

git reset --hard

- 为仓储添加远端（服务器端）地址

- 将本地仓储的提交记录推送到远端的master分支

- 拉取远端master分支的更新记录到本地

- 回归到指定版本

### GITHUB基本使用

- https://github.com/
- GITHUB是一个GIT服务的提供商，
- 
- 提出社交化编程

http://zoomzhao.github.io/code-guide/
https://github.com/jobbole/awesome-javascript-cn
https://github.com/jobbole/awesome-css-cn




查看、添加、提交、删除、找回，重置修改文件

git help <command> # 显示command的help

git show # 显示某次提交的内容 git show $id

git co -- <file> # 抛弃工作区修改

git co . # 抛弃工作区修改

git add <file> # 将工作文件修改提交到本地暂存区

git add . # 将所有修改过的工作文件提交暂存区

git rm <file> # 从版本库中删除文件

git rm <file> --cached # 从版本库中删除文件，但不删除文件

git reset <file> # 从暂存区恢复到工作文件

git reset -- . # 从暂存区恢复到工作文件

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git ci <file> git ci . git ci -a # 将git add, git rm和git ci等操作都合并在一起做　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　git ci -am "some comments"

git ci --amend # 修改最后一次提交记录

git revert <$id> # 恢复某次提交的状态，恢复动作本身也创建次提交对象

git revert HEAD # 恢复最后一次提交的状态

查看文件diff

git diff <file> # 比较当前文件和暂存区文件差异 git diff

git diff <id1><id1><id2> # 比较两次提交之间的差异

git diff <branch1>..<branch2> # 在两个分支之间比较

git diff --staged # 比较暂存区和版本库差异

git diff --cached # 比较暂存区和版本库差异

git diff --stat # 仅仅比较统计信息

查看提交记录

git log git log <file> # 查看该文件每次提交记录

git log -p <file> # 查看每次详细修改内容的diff

git log -p -2 # 查看最近两次详细修改内容的diff

git log --stat #查看提交统计信息

tig

Mac上可以使用tig代替diff和log，brew install tig

Git 本地分支管理

查看、切换、创建和删除分支

git br -r # 查看远程分支

git br <new_branch> # 创建新的分支

git br -v # 查看各个分支最后提交信息

git br --merged # 查看已经被合并到当前分支的分支

git br --no-merged # 查看尚未被合并到当前分支的分支

git co <branch> # 切换到某个分支

git co -b <new_branch> # 创建新的分支，并且切换过去

git co -b <new_branch> <branch> # 基于branch创建新的new_branch

git co $id # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除

git co $id -b <new_branch> # 把某次历史提交记录checkout出来，创建成一个分支

git br -d <branch> # 删除某个分支

git br -D <branch> # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)

 分支合并和rebase

git merge <branch> # 将branch分支合并到当前分支

git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交

git rebase master <branch> # 将master rebase到branch，相当于： git co <branch> && git rebase master && git co master && git merge <branch>

 Git补丁管理(方便在多台机器上开发同步时用)

git diff > ../sync.patch # 生成补丁

git apply ../sync.patch # 打补丁

git apply --check ../sync.patch #测试补丁能否成功

 Git暂存管理

git stash # 暂存

git stash list # 列所有stash

git stash apply # 恢复暂存的内容

git stash drop # 删除暂存区

Git远程分支管理

git pull # 抓取远程仓库所有分支更新并合并到本地

git pull --no-ff # 抓取远程仓库所有分支更新并合并到本地，不要快进合并

git fetch origin # 抓取远程仓库更新

git merge origin/master # 将远程主分支合并到本地当前分支

git co --track origin/branch # 跟踪某个远程分支创建相应的本地分支

git co -b <local_branch> origin/<remote_branch> # 基于远程分支创建本地分支，功能同上

git push # push所有分支

git push origin master # 将本地主分支推到远程主分支

git push -u origin master # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)

git push origin <local_branch> # 创建远程分支， origin是远程仓库名

git push origin <local_branch>:<remote_branch> # 创建远程分支

git push origin :<remote_branch> #先删除本地分支(git br -d <branch>)，然后再push删除远程分支

Git远程仓库管理

GitHub

git remote -v # 查看远程服务器地址和仓库名称

git remote show origin # 查看远程服务器仓库状态

git remote add origin git@ github:robbin/robbin_site.git # 添加远程仓库地址

git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) git remote rm <repository> # 删除远程仓库

创建远程仓库

git clone --bare robbin_site robbin_site.git # 用带版本的项目创建纯版本仓库

scp -r my_project.git git@ git.csdn.net:~ # 将纯仓库上传到服务器上

mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库

git remote add origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址

git push -u origin master # 客户端首次提交

git push -u origin develop # 首次将本地develop分支提交到远程develop分支，并且track

git remote set-head origin master # 设置远程仓库的HEAD指向master分支

也可以命令设置跟踪远程库和本地库

git branch --set-upstream master origin/master

git branch --set-upstream develop origin/develop


