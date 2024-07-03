#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
@import OkHi;

@interface AppDelegate : RCTAppDelegate
@property (strong, nonatomic) OkVerify *okverify; // <= and this!

@end
