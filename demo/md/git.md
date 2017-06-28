

#检查是否连接成功
```
到你要上传的仓库的目录里面点击右键，选择”Git Bash Here”，进入GitBush命令行，为了把本地的仓库传到github，还需要配置ssh key。
配置ssh key 在本地创建ssh key
$ ssh-keygen -t rsa -C "273725528@qq.com" 
后面的your_email@youremail.com改为你的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。成功的话会在用户下生成.ssh文件夹，进去，打开id_rsa.pub文件，复制里面的key。
回到github，进入Account Settings，左边选择SSH Keys，Add SSH Key,title随便填，粘贴key。为了验证是否成功，在git bash下输入： 
$ ssh -T git@github.com
如果是第一次的会提示是否continue，输入yes就会看到：You’ve successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。
接下来我们要做的就是把本地仓库传到github上去，在此之前还需要设置username和email，因为github每次commit都会记录他们。
$ git config --global user.name "xiaobogong1234"
$ git config --global user.email "273725528@qq.com"
```

#新建仓库

```
$ git init

$ git add . //(.代表要上传此文件夹内所有的文件。如果需要上传指定文件，指定文件名称就可以)

$ git commit -m 'Test' //(m后面跟一个参数，表示说明，将代码提交到GitHub后，将会在代码文件信息上显示这个说明,这个很重要)

$ git remote add origin git@github.com:xiaobogong1234/myapp.git
有时候输入这个语句的时候，github可能会”掉线”。会报fatal: remote origin already exists.这个错误。这时只需要输入 
$ git remote rm origin 再输入上面的代码就可以了

$ git push -u origin master //将本地项目更新到github项目上去
```

#更新代码
```
第一步：git status            

它会提示你，你修改了哪个文件
第二步 git add .        

这个命令表示新增修改的文件到缓存列表

第三步 git commit -m "备注说明"

这个命令表示添加备注

第四步 git push -u origin master:master 

提交到Git仓库。这里master为我自己的分支的名称，实际应用中，你要改成自己的分支的名称
```

#克隆到本地
```
git clone  git@github.com:xiaobogong1234/myapp.git
```

