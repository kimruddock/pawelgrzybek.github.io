---
title: My Amazon S3 photo backup solution
excerpt: As an amateur photographer I was looking for a cloud backup solution for years. Keeping a phisical backup on an external hard drive is definitelly not enough. Then I came across Amazon S3.
photo: 2018-02-27.jpg
---

Far far away, someone, somewhere said:

> "There are two kinds of people, those who back up their data and those who have never lost all their data."

Lucky me, I have never been a victim of a situation where I lost all my data just because I do backups regularly. I never do a full backup of my machine though. I can download an operating system in few minutes, restore my system preferences via [single click](https://github.com/pawelgrzybek/dotfiles), install all my frequently used apps via [single command](https://caskroom.github.io/), pull all my projects from [Github](https://github.com/) and listen to the music on my [Technics SL-1200](https://en.wikipedia.org/wiki/Technics_SL-1200) or stream it from Apple Music. The only thing that I keep backed up is my photos collection.

## My backup strategy in a nutshell

Since the May 2007 I keep all my photos in a well organized collection, ordered chronologically by year and a session / event. I keep exactly the same habit for all my pictures taken on my iPhone in parallel. It is not an enormous amount of data (around 200GB) but the sentimental value that it stores is immense.

No matter what, I always store this collection on two physical devices. It can be my computers hard drive, external flash disc, NAS server or a RAID array. Currently I use two totally average external [hard drives by Segate](https://www.amazon.co.uk/Seagate-Portable-External-Creative-Photography/dp/B00FP50LH2). Since very recently I am a happy owner of a superb [Sony α7R III](https://www.sony.co.uk/electronics/interchangeable-lens-cameras/ilce-7rm3) that shots 80 megabytes ARW files. Taking that into a consideration I realize that I may run out of storage on these hard drives very quickly, but for now it does the job.

Things happen! Disks fail, people rob, rivers flood, comets fall. In case of that I need one more copy in the cloud. I have tested multiple solutions and services over the past years and finally I feel that I found something that is going to stick around. Although, making a backup to local hard drives is fairly easy and straight forward, cloud backups are way more complicated and I am willing to help you with that.

## What I consider as a good cloud backup and things that I don't care about

There are plenty of services that offer a cloud storage for amateur and professional photographers. [Dropbox](http://dropbox.com), [Google Drive](https://drive.google.com/start), [Box](https://www.box.com/), [OneDrive](https://onedrive.live.com/), [Zoolz](https://home.zoolz.co.uk/) or [Backblaze](https://www.backblaze.com/) just to name a few.

There are few key things that I need to get out of my cloud backup solution. A security first — I really don't want anyone to look at the pictures of my beautiful girlfriend. There is a solid chance that my collection will grow up over time so auto-scaling and unlimited storage resources is another must-have. New services show up and vanish oftentimes and I am really not interested in investing my time to solutions that may not be around tomorrow. Do your remember [copy](https://copy.com/)? Quite cool service — didn't stay for long though. A price is an obvious factor of course.

Providers listed above usually offer tons of things that I simply don't care about. I don't need a fancy app with tons of bells and whistles. I don't need a constant live sync and seamless integration with my OS. It is a last resort backup — the files structure is probably never gonna change. I wil just add more stuff on top of the pile over time.

I am here today not to compare available options or convince you to use one over the other. I spent years looking for a solution that suits my needs and I would like to share it with you.

## Say hello to AWS Simple Storage Service (S3)

[AWS (Amazon Web Services)](https://aws.amazon.com/) is a platform that offers number of things that your business or you, as an individual, may need. From a compute power, through a database storage, content delivery network to the machine learning and IoT (internet of things) related products. A storage solutions is one of the many services that AWS has to offer. It is well established and proven by miles long [list of clients](https://aws.amazon.com/solutions/case-studies/all/) like: Adobe, AirBnb, Netflix, NASA, SoundCloud, Canon, GoPro… The list goes on and on.

You may have heard an opinion that AWS is complicated to use. In reality it is crazy complicated but to run a band you don't have to play all the instruments — just master a single one. Storage is what we need.

AWS has a number of storage solutions in its products list. From simple solutions like [Amazon Simple Storage Service (S3)](https://aws.amazon.com/s3/) to the [AWS Snowmobile](https://aws.amazon.com/snowmobile/) — a 45-foot long shipping container pulled by a truck to transfer extremely large amounts of data (up to 100PB). Things that we need is a bucket of data stored within S3 bucket and its seamless transition to [Glacier](https://aws.amazon.com/glacier/) class using lifecycle policies. Let me explain.

### What is S3 and how it works

Amazon S3 is a simple storage solution that offers a range of classes designed for specific use cases. For frequently used, general storage use [S3 Standard](https://aws.amazon.com/s3/storage-classes/#General_Purpose). [Infrequent Access](https://aws.amazon.com/s3/storage-classes/#Infrequent_Access) works best for files that you don't have to access very often but still keep them accessible whenever you need them. For an archive purpose, [Glacier](https://aws.amazon.com/s3/storage-classes/#Archive) is the best option. Each of this categories comes with some pros and cons and each of them suits different need. The main differences between them are [price](https://aws.amazon.com/s3/pricing/) and awaiting time  to access objects (photos in our case). Really curious ones I would like to redirect to Marc Trimuschats presentation from AWS Summit 2017. [Deep Dive on Object Storage](https://youtu.be/bfDpK45Faa0) is everything that you need.

![Amazon S3 storage classes](/photos/2018-02-27-1.jpg)

Essentially, files stored in the hot storage (S3 Standard) are accessible immediately but they cost you a fortune ($0.023 / GB). Cold storage (Glacier) on the other hand is extremely cheap ($0.004 per GB) but a file restoration can take from 1 minute up to 12 hours. You will be charged for each GB retrieved from cold storage cluster too. The pricing may vary a bit dependable of the region of your S3 "bucket".

Privacy of files is something that we can easily control with the S3. If you want to make a file public / private, no more than a single click is needed. Lifecycle policies help us to create a set of rules that invisibly migrate files between storage classes. I utilized the power of this feature to migrate all the files imported to Standard bucket to Glacier on the day later.

### How to

I mentioned before that AWS is complicated to use, but I hope that this step by step guide can makes the thing easier. The S3 Storage may actually be one of the easiest to use services from the humongous number of products in AWS portfolio.

Start with [createing a free AWS account](https://portal.aws.amazon.com/billing/signup). This process requires you to add a credit card to your account and authorize it by the phone call that you are going to receive from Amazons bot. It is worth to mention that you are eligible to use a [Free Tier](https://aws.amazon.com/free/) that gives you access to the snippet of AWS features totally for free. You can end up this process here but I would strongly suggest to look at the [IAM (Identity and Access Management) best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). Personally I use my "root" account just for billing purposes and to manage users. For using AWS services I created a IAM user with sufficient permissions that I use for my everyday tasks — security first. Read more about reocmmended way of using AWS platform on [AWS Identity and Access Management Documentation](https://aws.amazon.com/documentation/iam/).

> "When you first create an AWS account, you begin with a single sign-in identity that has complete access to all AWS services and resources in the account. This identity is called the AWS account root user and is accessed by signing in with the email address and password that you used to create the account. We strongly recommend that you do not use the root user for your everyday tasks, even the administrative ones. Instead, adhere to the best practice of using the root user only to create your first IAM user. Then securely lock away the root user credentials and use them to perform only a few account and service management tasks."

Our account is ready to use and secure by now, it is a time to create a first storage "bucket" under the S3 section. Use an unique name for your bucket and choose a location of interest. Make a wise decisions at this point because you won't be able to change those details later on. Hit a "Create" button and we are almost set up.

![Create Amazon S3 bucket](/photos/2018-02-27-2.jpg)

In theory we are ready to use it now but there is one thing that may automate our workflow a lot. We definitely don't want to change a storage class (Standard, IA and Glacier) for every file manually. Mentioned before lifecycle policies can automate it for us. My aim is to migrate all the files that I put into my Standard S3 bucket as soon as possible to cheap cold storage (Glacier). To set it up that way, click on the name of a bucket created in a previous setep and navigate to Lifecycle rules under the Managment tab. Click the "Add lifecycle rule" button to define a new rule. Add a meaningful name to your rule and navigate further to Transitions section. For a current version of your files create a rule that moves the file to Glacier after one day. We don't need to tweak settings for previous versions because we didn't enable files versioning on the first place (you don't need that for backups). Hit next to Expiration tab just to keep it as it is (we really don't want our files to be removed) and proceed to the next tab — Review. Make sure that you are happy with all the settings on the last step and save a rule. We are done!

![Create Amazon S3 lifecycle policy](/photos/2018-02-27-3.jpg)

### GUI or not

Although the S3 web interface is very user friendly and fast, you may be interested to use some GUI (graphical user interface) tool to send files to your bucket. Luckily there is a lot of tools out there that let you access your Simple Storage Service easily. As a macOS user my personal preference is [ForkLift 3](https://binarynights.com/forklift/). [Transmit 5](https://panic.com/transmit/) is another app for Apple system that is sorounded by great reputation. Maybe [Cyberduck](https://cyberduck.io/)? [FileZilla Pro](https://filezillapro.com/ftp/mac/) and [S3 Browser](http://s3browser.com/) look like a great option for Windows users. Play around with available options and let me know about your preferred way to interact with S3 objects.

![Using Forklift 3 with Amazon S3](/photos/2018-02-27-4.jpg)

## Happy backing up

I am very happy with this solution and it works for me really well. I managed to reduce the cost of my digital backup copy from £8 per month to less than a £1. I have a reliable and secure copy of my files and a great system in place that hopefully is going to serve me long term. Let me know about your backup strategy in the comments below. If you have any questions or need some more clarification on a content of this post, I am always keen to help. Happy backing up!
