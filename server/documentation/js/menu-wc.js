'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' : 'data-bs-target="#xs-controllers-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' :
                                            'id="xs-controllers-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' :
                                        'id="xs-injectables-links-module-AppModule-a28559c7d44e1cd023137e40545f53c4e470202777230d11068f820d295f2e12bcbfa8e8d491b1a5406827f84b4527a23d87d35cc7ca360315c2e37f78a132ad"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-f808b1093be75af744ca39934cb8776a16dea070a44df73d79a431958fd32180310c6002ec9633e275a838afaacb268874cf9e9d0f4488a7c06df1587db0b536"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-f808b1093be75af744ca39934cb8776a16dea070a44df73d79a431958fd32180310c6002ec9633e275a838afaacb268874cf9e9d0f4488a7c06df1587db0b536"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-f808b1093be75af744ca39934cb8776a16dea070a44df73d79a431958fd32180310c6002ec9633e275a838afaacb268874cf9e9d0f4488a7c06df1587db0b536"' :
                                        'id="xs-injectables-links-module-AuthModule-f808b1093be75af744ca39934cb8776a16dea070a44df73d79a431958fd32180310c6002ec9633e275a838afaacb268874cf9e9d0f4488a7c06df1587db0b536"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BcryptModule.html" data-type="entity-link" >BcryptModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BcryptModule-8e60cf37cf63d43950c07d5a9be74b3eb240680003e9a8b3943f983219544b6bedc76e5f4902d51516cb8dc8cda21cb6acba61f1afcfa90d89ce01a822535514"' : 'data-bs-target="#xs-injectables-links-module-BcryptModule-8e60cf37cf63d43950c07d5a9be74b3eb240680003e9a8b3943f983219544b6bedc76e5f4902d51516cb8dc8cda21cb6acba61f1afcfa90d89ce01a822535514"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BcryptModule-8e60cf37cf63d43950c07d5a9be74b3eb240680003e9a8b3943f983219544b6bedc76e5f4902d51516cb8dc8cda21cb6acba61f1afcfa90d89ce01a822535514"' :
                                        'id="xs-injectables-links-module-BcryptModule-8e60cf37cf63d43950c07d5a9be74b3eb240680003e9a8b3943f983219544b6bedc76e5f4902d51516cb8dc8cda21cb6acba61f1afcfa90d89ce01a822535514"' }>
                                        <li class="link">
                                            <a href="injectables/BcryptService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BcryptService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardCommentModule.html" data-type="entity-link" >BoardCommentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' : 'data-bs-target="#xs-controllers-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' :
                                            'id="xs-controllers-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' }>
                                            <li class="link">
                                                <a href="controllers/BoardCommentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardCommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' : 'data-bs-target="#xs-injectables-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' :
                                        'id="xs-injectables-links-module-BoardCommentModule-5ab7020afb0d2ea2d58dbccd41425cec5bac899999ae2336e5fb8a704a8c52620c5c5238afb407ce2447110063b020e5d0ffbd2e39e3261d396a4d71a3193886"' }>
                                        <li class="link">
                                            <a href="injectables/BoardCommentRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardCommentRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardCommentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardCommentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardModule.html" data-type="entity-link" >BoardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' : 'data-bs-target="#xs-controllers-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' :
                                            'id="xs-controllers-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' }>
                                            <li class="link">
                                                <a href="controllers/BoardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' : 'data-bs-target="#xs-injectables-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' :
                                        'id="xs-injectables-links-module-BoardModule-3a053f0aec138a3189a470c8c3356ed4ef7824c26579fd6802323e4a52744a7b50afb78b9ab39e85d165f90738420887a65be1ff9ae094817b2724ab2b06440a"' }>
                                        <li class="link">
                                            <a href="injectables/BoardCommentRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardCommentRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardIdCounterRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardIdCounterRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardReactionRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardReactionRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardPasswordModule.html" data-type="entity-link" >BoardPasswordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' : 'data-bs-target="#xs-controllers-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' :
                                            'id="xs-controllers-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' }>
                                            <li class="link">
                                                <a href="controllers/BoardPasswordController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardPasswordController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' : 'data-bs-target="#xs-injectables-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' :
                                        'id="xs-injectables-links-module-BoardPasswordModule-7884435e98b044aa5c38fe1c3e3a861347ee47130150f63a48bf5665be9a5d7e406fb5cadad8ba502c397a18d2321e7d30de79b74ebc75ffab1a14ff52fb52e6"' }>
                                        <li class="link">
                                            <a href="injectables/BoardPasswordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardPasswordService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoardReactionModule.html" data-type="entity-link" >BoardReactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' : 'data-bs-target="#xs-controllers-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' :
                                            'id="xs-controllers-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' }>
                                            <li class="link">
                                                <a href="controllers/BoardReactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardReactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' : 'data-bs-target="#xs-injectables-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' :
                                        'id="xs-injectables-links-module-BoardReactionModule-7c5fc7cbc1ea8f7e6db2f7df2e4804d2c7663c057d5dd0befed0267eefb41ef8bf8c4c6f7029e9fdf6ed1332dc638f00e68991a610b10b92e6c23445c9af81d0"' }>
                                        <li class="link">
                                            <a href="injectables/BoardReactionRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardReactionRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BoardReactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoardReactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' : 'data-bs-target="#xs-controllers-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' :
                                            'id="xs-controllers-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' : 'data-bs-target="#xs-injectables-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' :
                                        'id="xs-injectables-links-module-UserModule-38e59c7f211c7d3031d37b5aeb25a6c4b70f63d1446f1c520506e7ba09f6e4c10c48fac645b9a570636385f04b408fcb3dc7b2ad5127d0b30a53e0c09509413a"' }>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BoardCommentEntity.html" data-type="entity-link" >BoardCommentEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BoardEntity.html" data-type="entity-link" >BoardEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BoardIdCounterEntity.html" data-type="entity-link" >BoardIdCounterEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BoardReactionEntity.html" data-type="entity-link" >BoardReactionEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BoardAddressDTO.html" data-type="entity-link" >BoardAddressDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardAddressInput.html" data-type="entity-link" >BoardAddressInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardAddressOutput.html" data-type="entity-link" >BoardAddressOutput</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardCommentResolver.html" data-type="entity-link" >BoardCommentResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardCommentResponseDTO.html" data-type="entity-link" >BoardCommentResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardCommentSchema.html" data-type="entity-link" >BoardCommentSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardPaginationResponse.html" data-type="entity-link" >BoardPaginationResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardPasswordDTO.html" data-type="entity-link" >BoardPasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardPasswordResolver.html" data-type="entity-link" >BoardPasswordResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardReactionResolver.html" data-type="entity-link" >BoardReactionResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardReactionSchema.html" data-type="entity-link" >BoardReactionSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardResolver.html" data-type="entity-link" >BoardResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoardSchema.html" data-type="entity-link" >BoardSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardCommentDTO.html" data-type="entity-link" >CreateBoardCommentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardCommentInput.html" data-type="entity-link" >CreateBoardCommentInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardDTO.html" data-type="entity-link" >CreateBoardDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBoardInput.html" data-type="entity-link" >CreateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/loginDTO.html" data-type="entity-link" >loginDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/loginUser.html" data-type="entity-link" >loginUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDTO.html" data-type="entity-link" >PaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponseDTO.html" data-type="entity-link" >PaginationResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/signUpDTO.html" data-type="entity-link" >signUpDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/signUpUser.html" data-type="entity-link" >signUpUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardCommentDTO.html" data-type="entity-link" >UpdateBoardCommentDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardCommentExceptPasswordDTO.html" data-type="entity-link" >UpdateBoardCommentExceptPasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardCommentInput.html" data-type="entity-link" >UpdateBoardCommentInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardDTO.html" data-type="entity-link" >UpdateBoardDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBoardInput.html" data-type="entity-link" >UpdateBoardInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserIdSchema.html" data-type="entity-link" >UserIdSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResolver.html" data-type="entity-link" >UserResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSchema.html" data-type="entity-link" >UserSchema</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformBoardInterceptor.html" data-type="entity-link" >TransformBoardInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DateTimeScalarConfig.html" data-type="entity-link" >DateTimeScalarConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDeleteResponse.html" data-type="entity-link" >IDeleteResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResolverClearResponse.html" data-type="entity-link" >IResolverClearResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponseInterceptor.html" data-type="entity-link" >IResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriptionResolverObject.html" data-type="entity-link" >SubscriptionResolverObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscriptionSubscriberObject.html" data-type="entity-link" >SubscriptionSubscriberObject</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});