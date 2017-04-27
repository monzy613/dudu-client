<img src="http://ojiryy947.bkt.clouddn.com/dudu_icon.png">

# 读读
#### 后端请见: https://github.com/monzy613/dudu-server
#### 基于ReactNative的RSS订阅社区, 能够订阅RSS, Atom, 并整合了分享评论等功能, 支持iOS Android端
### Deployment
```shell
npm install
cd ios
pod install
cd ..
react-native run-ios --simulator='iPhone 7'
```

### Detail
```
基于react-native + redux, 所以持久化这层就用的redux-persist-immutable来做了
```

### TODO
1. use react-navigation to replace NavigationExperimental, which is deprecated by facebook.
2. store more things into cache, e.g. like, commet, timeline, etc.
3. message(rongCloud or other)
4. redesign the ui! ugly now

### Contributions
- star or fork it!

### Screenshots (基本上这些是所有界面了)
<img src="http://ojiryy947.bkt.clouddn.com/login.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/register.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/rss1.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/rss2.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/detail0.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/detail1.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/detail2.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/detail3.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/item_comment.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/follow.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/mine.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/timeline.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/post.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/user_page.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/search1.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/search2.PNG" alt="Drawing" width="300"/>
<img src="http://ojiryy947.bkt.clouddn.com/search3.PNG" alt="Drawing" width="300"/>
