// GENERATED FILE - do not edit. Regenerate with "pnpm gen:types".
// Structures and callback types.
// Source: https://github.com/Gethe/wow-ui-source.git (forever @ 17ed2c3e84), game version 1.60.1.70755

/** @noSelfInFile */

interface AccountStoreCategoryInfo {
    id: number;
    name: string;
    type: AccountStoreCategoryType;
    icon: number;
}

interface AccountStoreCurrencyInfo {
    id: number;
    amount: number;
    maxQuantity?: number;
    name: string;
    icon: number;
}

interface AccountStoreItemInfo {
    id: number;
    status: AccountStoreItemStatus;
    mode: AccountStoreItemMode;
    currencyID: number;
    flags: AccountStoreItemFlag;
    customUIModelSceneID?: number;
    name: string;
    description?: string;
    price: number;
    nonrefundable: boolean;
    creatureDisplayID?: number;
    transmogSetID?: number;
    displayIcon?: number;
    refundSecondsRemaining?: number;
}

interface ActionUsableState {
    slot: number;
    usable: boolean;
    noMana: boolean;
}

interface AddOnInfo {
    name: string;
    title: string;
    notes: string;
    loadable: boolean;
    reason: string;
    security: string;
}

interface AddOnLoadableInfo {
    loadable: boolean;
    reason: string;
}

interface AddonMessageParams {
    prefix: string;
    message: string;
    /** ChatType, defaults to SLASH_CMD_PARTY. */
    chatType?: string;
    /** Only applies for targeted channels */
    target?: string;
}

interface AddOnPerformanceMessage {
    type: Enum.AddOnPerformanceMessageType;
    metric: Enum.AddOnProfilerMetric;
    addOnName?: string;
    metricValue: number;
    thresholdValue: number;
}

interface AddOnProfilerCallEvent {
    /** User-defined string describing the measured event. */
    name: string;
    /** Snapshot of the allocated byte count when this event was recorded. */
    allocatedBytes: number;
    /** Snapshot of the deallocated byte count when this event was recorded. */
    deallocatedBytes: number;
    /** Snapshot of the elapsed milliseconds when this event was recorded. */
    elapsedMilliseconds: number;
    /** Snapshot of the elapsed tick count when this event was recorded. */
    elapsedTicks: number;
}

interface AddOnProfilerCallResults {
    /** Total number of milliseconds spent executing the function. */
    elapsedMilliseconds: number;
    /** Total number of profiling clock ticks spent executing the function. */
    elapsedTicks: number;
    /** Total number of bytes allocated during call execution. */
    allocatedBytes: number;
    /** Total number of bytes deallocated during call execution. */
    deallocatedBytes: number;
    /** Events recorded by any AddMeasuredCallEvent calls that took place during function execution. */
    events: AddOnProfilerCallEvent[];
}

interface AddOnProfilerResult {
    addOnName: string;
    metricValue: number;
}

interface AddPrivateAuraAnchorArgs {
    unitToken: string;
    auraIndex: number;
    parent: Frame;
    showCooldownFrame: boolean;
    showCooldownEdge: boolean;
    showCountdownNumbers: boolean;
    showDispelIcon: boolean;
    isContainer: boolean;
    iconInfo?: PrivateAuraIconInfo;
    durationAnchor?: AnchorBinding;
}

interface AdvancedFilterOptions {
    needsTank: boolean;
    needsHealer: boolean;
    needsDamage: boolean;
    needsMyClass: boolean;
    hasTank: boolean;
    hasHealer: boolean;
    /** Activity group IDs to filter by. */
    activities: number[];
    minimumRating: number;
    difficultyNormal: boolean;
    difficultyHeroic: boolean;
    difficultyMythic: boolean;
    difficultyMythicPlus: boolean;
    generalPlaystyle1: boolean;
    generalPlaystyle2: boolean;
    generalPlaystyle3: boolean;
    generalPlaystyle4: boolean;
}

interface AdventureMapQuestPortraitInfo {
    portraitDisplayID: number;
    mountPortraitDisplayID: number;
    name: string;
    text: string;
    modelSceneID?: number;
}

interface AlliedRaceInfo {
    raceID: number;
    maleModelID: number;
    femaleModelID: number;
    achievementIds: number[];
    maleName: string;
    femaleName: string;
    description: string;
    raceFileString: string;
    crestAtlas: string;
    modelBackgroundAtlas: string;
    bannerColor: ColorMixin;
}

interface AlliedRaceRacialAbility {
    description: string;
    name: string;
    icon: number;
}

interface AnchorBinding {
    point: FramePoint;
    relativeTo: ScriptRegion;
    relativePoint: FramePoint;
    offsetX: number;
    offsetY: number;
}

interface AnimaDiversionCostInfo {
    currencyID: number;
    quantity: number;
}

interface AnimaDiversionFrameInfo {
    textureKit: string;
    title: string;
    mapID: number;
}

interface AnimaDiversionNodeInfo {
    talentID: number;
    name: string;
    description: string;
    costs: AnimaDiversionCostInfo[];
    currencyID: number;
    icon: number;
    normalizedPosition: Vector2DMixin;
    state: Enum.AnimaDiversionNodeState;
}

interface AppearanceSourceInfo {
    visualID: number;
    sourceID: number;
    isCollected: boolean;
    itemID: number;
    itemModID: number;
    invType: number;
    categoryID: Enum.TransmogCollectionType;
    playerCanCollect: boolean;
    isValidSourceForPlayer: boolean;
    canDisplayOnPlayer: boolean;
    inventorySlot?: number;
    sourceType?: number;
    name?: string;
    quality?: number;
    useError?: string;
    useErrorType?: Enum.TransmogUseErrorType;
    meetsTransmogPlayerCondition?: boolean;
    isHideVisual?: boolean;
    isValidForEquippedItem?: boolean;
}

interface ArdenwealdGardenData {
    active: number;
    ready: number;
    remainingSeconds: number;
}

interface AreaPOIInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    description?: string;
    linkedUiMapID?: number;
    textureIndex?: number;
    tooltipWidgetSet?: number;
    iconWidgetSet?: number;
    atlasName?: string;
    uiTextureKit?: string;
    shouldGlow: boolean;
    factionID?: number;
    isPrimaryMapForPOI: boolean;
    isAlwaysOnFlightmap: boolean;
    addPaddingAboveTooltipWidgets?: boolean;
    highlightWorldQuestsOnHover: boolean;
    highlightVignettesOnHover: boolean;
    isCurrentEvent: boolean;
    isSuppressible: boolean;
    isLocked: boolean;
}

interface ArtifactAppearanceInfo {
    artifactAppearanceID: number;
    appearanceName: string;
    displayIndex: number;
    unlocked: boolean;
    failureDescription?: string;
    uiCameraID: number;
    altHandCameraID?: number;
    swatchColor: ColorMixin;
    modelOpacity: number;
    modelSaturation: number;
    obtainable: boolean;
}

interface ArtifactAppearanceSetInfo {
    artifactAppearanceSetID: number;
    appearanceSetName: string;
    appearanceSetDescription: string;
    numAppearances: number;
}

interface ArtifactArtInfo {
    textureKit: string;
    titleName: string;
    titleColor: ColorMixin;
    barConnectedColor: ColorMixin;
    barDisconnectedColor: ColorMixin;
    uiModelSceneID: number;
    spellVisualKitID: number;
}

interface ArtifactInfo {
    itemID: number;
    altItemID?: number;
    name: string;
    icon: number;
    xp: number;
    pointsSpent: number;
    quality: number;
    artifactAppearanceID: number;
    appearanceModID: number;
    itemAppearanceID?: number;
    altItemAppearanceID?: number;
    altOnTop: boolean;
    tier: ArtifactTiers;
}

interface ArtifactMetaPowerInfo {
    spellID: number;
    powerCost: number;
    currentRank: number;
}

interface ArtifactPowerInfo {
    spellID: number;
    cost: number;
    currentRank: number;
    maxRank: number;
    bonusRanks: number;
    numMaxRankBonusFromTier: number;
    prereqsMet: boolean;
    isStart: boolean;
    isGoldMedal: boolean;
    isFinal: boolean;
    tier: number;
    position: Vector2DMixin;
    offset?: Vector2DMixin;
    linearIndex?: number;
}

interface ArtifactRelicInfo {
    name: string;
    icon: number;
    /** Matches the socket identifiers used in the socketing system. */
    slotTypeName: string;
    link: string;
}

interface AtlasInfo {
    elementName: string;
    width: number;
    height: number;
    rawSize: Vector2DMixin;
    leftTexCoord: number;
    rightTexCoord: number;
    topTexCoord: number;
    bottomTexCoord: number;
    tilesHorizontally: boolean;
    tilesVertically: boolean;
    file?: number;
    filename?: string;
    sliceData?: UITextureSliceData;
}

interface AuctionHouseBrowseQuery {
    searchString: string;
    sorts: AuctionHouseSortType[];
    minLevel?: number;
    maxLevel?: number;
    filters?: Enum.AuctionHouseFilter[];
    itemClassFilters?: AuctionHouseItemClassFilter[];
}

interface AuctionHouseFilterGroup {
    category: Enum.AuctionHouseFilterCategory;
    filters: Enum.AuctionHouseFilter[];
}

interface AuctionHouseItemClassFilter {
    classID: number;
    subClassID?: number;
    inventoryType?: Enum.InventoryType;
}

interface AuctionHouseSortType {
    sortOrder: Enum.AuctionHouseSortOrder;
    reverseSort: boolean;
}

interface AuctionInfo {
    itemKey: ItemKey;
    itemLink?: string;
    minBid?: number;
    bidAmount?: number;
    buyoutAmount?: number;
    bidder?: string;
}

interface AuraContainerTooltipAnchorOffsets {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

interface AuraContainerTooltipBackdropInfo {
    /** Optional background texture asset. */
    bgFile?: string | number;
    /** Optional edge texture asset. */
    edgeFile?: string | number;
    /** Optional edge size. */
    edgeSize?: number;
    /** Optional backdrop insets. */
    insets?: AuraContainerTooltipBackdropInsets;
    /** If true, tiles the background texture. */
    tile?: boolean;
    /** If true, tiles the edge texture. */
    tileEdge?: boolean;
    /** Optional tile size used when tiling the background texture. */
    tileSize?: number;
}

interface AuraContainerTooltipBackdropInsets {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

interface AuraContainerTooltipBackdropOptions {
    /** Backdrop information used to construct the tooltip backdrop. */
    backdropInfo: AuraContainerTooltipBackdropInfo;
    /** Optional color applied to the backdrop border. */
    borderColor?: ColorMixin;
    /** Optional color applied to the backdrop background. */
    centerColor?: ColorMixin;
    /** Optional offsets applied to the backdrop's TOPLEFT and BOTTOMRIGHT anchor points. */
    anchorOffsets?: AuraContainerTooltipAnchorOffsets;
}

interface AuraContainerTooltipNineSliceOptions {
    /** Name of the NineSlice layout template to apply, such as 'TooltipDefaultLayout'. */
    layoutName: string;
    /** Optional color applied to the NineSlice border. */
    borderColor?: ColorMixin;
    /** Optional color applied to the NineSlice center region. */
    centerColor?: ColorMixin;
    /** Optional offsets applied to the NineSlice's TOPLEFT and BOTTOMRIGHT anchor points. */
    anchorOffsets?: AuraContainerTooltipAnchorOffsets;
}

interface AuraContainerTooltipTextureSliceOptions {
    /** Texture asset (file path or atlas name) displayed by the slice. */
    asset: string | number;
    /** Optional texture slice margins. See Texture:SetTextureSliceMargins. */
    sliceMargins?: UITextureSliceMargins;
    /** Optional texture slice mode. See Texture:SetTextureSliceMode. */
    sliceMode?: Enum.UITextureSliceMode;
    /** Optional vertex color applied to the texture. */
    color?: ColorMixin;
    /** Optional offsets applied to the slice's TOPLEFT and BOTTOMRIGHT anchor points. */
    anchorOffsets?: AuraContainerTooltipAnchorOffsets;
    /** Draw layer used when displaying the texture. */
    drawLayer?: DrawLayer;
    /** Draw layer sublevel used when displaying the texture. */
    drawLayerSublevel: number;
}

interface AuroraFriendsSearchInfo {
    searchText: string;
    isOnline: boolean;
    isOffline: boolean;
    isDND: boolean;
    isAFK: boolean;
    isInQueue: boolean;
    isAvailableForQueue: boolean;
    tags: Enum.BattleNetFriendTag[];
}

interface AutoCombatDamageClassString {
    damageClassValue: number;
    locString: string;
}

interface AutoCombatResult {
    winner: boolean;
    combatLog: AutoMissionRound[];
}

interface AutoCombatSpellInfo {
    autoCombatSpellID: number;
    name: string;
    description: string;
    cooldown: number;
    duration: number;
    schoolMask: number;
    previewMask: number;
    icon: number;
    spellTutorialFlag: number;
    hasThornsEffect: boolean;
}

interface AutoCombatTroopInfo {
    name: string;
    followerID: GarrisonFollower;
    garrFollowerID: GarrisonFollower;
    followerTypeID: number;
    displayIDs: FollowerDisplayID[];
    level: number;
    quality: number;
    levelXP: number;
    maxXP: number;
    height: number;
    scale: number;
    displayScale?: number;
    displayHeight?: number;
    classSpec?: number;
    className?: string;
    flavorText?: string;
    classAtlas: string;
    portraitIconID: number;
    textureKit: string;
    isTroop: boolean;
    raceID: number;
    health: number;
    maxHealth: number;
    role: number;
    isAutoTroop: boolean;
    isSoulbind: boolean;
    isCollected: boolean;
    autoCombatStats: FollowerAutoCombatStatsInfo;
}

interface AutoCompleteResult {
    name: string;
    priority: Enum.AutoCompletePriority;
    bnetID: number;
}

interface AutoMissionCombatEventInfo {
    boardIndex: number;
    oldHealth: number;
    newHealth: number;
    maxHealth: number;
    points?: number;
}

interface AutoMissionEnvironmentEffect {
    name: string;
    autoCombatSpellInfo: AutoCombatSpellInfo;
}

interface AutoMissionEvent {
    type: number;
    spellID: number;
    schoolMask: number;
    effectIndex: number;
    casterBoardIndex: number;
    auraType: number;
    targetInfo: AutoMissionCombatEventInfo[];
}

interface AutoMissionRound {
    events: AutoMissionEvent[];
}

interface AutoMissionTargetingInfo {
    targetIndex: number;
    previewType: number;
    spellID: number;
    effectIndex: number;
}

interface AvailableRaceInfo {
    raceID: number;
    displayName: string;
}

interface AzeriteEmpoweredItemPowerInfo {
    azeritePowerID: number;
    spellID: number;
}

interface AzeriteEmpoweredItemPowerText {
    name: string;
    description: string;
}

interface AzeriteEmpoweredItemTierInfo {
    azeritePowerIDs: number[];
    unlockLevel: number;
}

interface AzeriteEssenceInfo {
    ID: number;
    name: string;
    rank: number;
    unlocked: boolean;
    valid: boolean;
    icon: number;
}

interface AzeriteMilestoneInfo {
    ID: number;
    requiredLevel: number;
    canUnlock: boolean;
    unlocked: boolean;
    rank?: number;
    slot?: Enum.AzeriteEssenceSlot;
}

interface AzeriteSpecInfo {
    classID: number;
    specID: number;
}

interface BackpackCurrencyInfo {
    name: string;
    quantity: number;
    iconFileID: number;
    currencyTypesID: number;
}

interface BankTabData {
    ID: number;
    bankType: Enum.BankType;
    name: string;
    icon: number;
    depositFlags: Enum.BagSlotFlags;
    tabCleanupConfirmation: string;
    tabNameEditBoxHeader: string;
}

interface BattlefieldCurrencyReward {
    id: number;
    quantity: number;
}

interface BattlefieldItemReward {
    id: number;
    name: string;
    texture: number;
    quantity: number;
}

interface BattlefieldRewards {
    honor: number;
    experience: number;
    itemRewards?: BattlefieldItemReward[];
    currencyRewards?: BattlefieldCurrencyReward[];
    roleShortageBonus?: RoleShortageReward;
}

interface BattlefieldVehicleInfo {
    x: number;
    y: number;
    name: string;
    isOccupied: boolean;
    atlas: string;
    textureWidth: number;
    textureHeight: number;
    facing: number;
    isPlayer: boolean;
    isAlive: boolean;
    shouldDrawBelowPlayerBlips: boolean;
}

interface BattlegroundInfo {
    name: string;
    icon?: number;
    gameType: string;
    shortDescription: string;
    longDescription: string;
    mapDescription: string;
    maxPlayers: number;
    battlegroundID?: number;
    lfgDungeonID?: number;
    mapID?: number;
    isHoliday: boolean;
    isRandom: boolean;
    canEnter: boolean;
    isTrainingGround: boolean;
}

interface BattlemasterListInfo {
    name: string;
    matchmakingType: Enum.PvPMatchmakingType;
    minPlayers: number;
    maxPlayers: number;
    icon: number;
    longDescription: string;
    shortDescription: string;
}

interface BestDungeonScoreMapInfo {
    mapScore: number;
    mapName: string;
    bestRunLevel: number;
    finishedSuccess: boolean;
    bestRunDurationMs: number;
    bestLevelIncrement: number;
}

interface BidInfo {
    auctionID: number;
    itemKey: ItemKey;
    itemLink?: string;
    timeLeft: Enum.AuctionHouseTimeLeftBand;
    minBid?: number;
    bidAmount?: number;
    buyoutAmount?: number;
    bidder?: string;
}

interface BNetAccountInfo {
    bnetAccountID: number;
    accountName: string;
    battleTag: string;
    isFriend: boolean;
    isBattleTagFriend: boolean;
    friendLevel?: Enum.BattleNetFriendLevel;
    lastOnlineTime: number;
    isAFK: boolean;
    isDND: boolean;
    isFavorite: boolean;
    friendTags: Enum.BattleNetFriendTag[];
    appearOffline: boolean;
    customMessage: string;
    customMessageTime: number;
    note: string;
    rafLinkType: Enum.RafLinkType;
    gameAccountInfo: BNetGameAccountInfo;
}

interface BNetFriendInviteInfo {
    inviteID: number;
    accountName: string;
    creationTimestamp: number;
    friendLevel?: Enum.BattleNetFriendLevel;
}

interface BNetGameAccountInfo {
    gameAccountID: number;
    clientProgram: string;
    isOnline: boolean;
    isGameBusy: boolean;
    isGameAFK: boolean;
    isAppearOffline: boolean;
    wowProjectID?: number;
    characterName?: string;
    realmName?: string;
    realmDisplayName?: string;
    realmID?: number;
    factionName?: string;
    raceName?: string;
    classID?: number;
    className?: string;
    classFilename?: string;
    areaName?: string;
    characterLevel?: number;
    richPresence?: string;
    playerGuid?: string;
    canSummon: boolean;
    hasFocus: boolean;
    regionID: number;
    isInCurrentRegion: boolean;
    timerunningSeasonID?: number;
    subIcon?: string;
}

interface BountyInfo {
    questID: number;
    factionID: number;
    icon: number;
    numObjectives: number;
    turninRequirementText?: string;
}

interface BrowseResultInfo {
    itemKey: ItemKey;
    appearanceLink?: string;
    totalQuantity: number;
    minPrice: number;
    containsOwnerItem: boolean;
}

interface BulkPurchaseIndividualProductResult {
    recordId: number;
    parentProductId?: number;
    entitlementId: string;
    externalTransactionId: string;
    status: Enum.SimpleOrderStatus;
}

interface BulletTextListWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    enabledState: Enum.WidgetEnabledState;
    lines: string[];
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ButtonHeaderWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    headerText: string;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    buttons: UIWidgetSpellButtonInfo[];
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface CalendarDayEvent {
    eventID: string;
    title: string;
    isCustomTitle: boolean;
    startTime: CalendarTime;
    endTime: CalendarTime;
    calendarType: string;
    sequenceType: string;
    eventType: Enum.CalendarEventType;
    iconTexture?: number;
    modStatus: string;
    inviteStatus: Enum.CalendarStatus;
    invitedBy: string;
    difficulty: number;
    inviteType: Enum.CalendarInviteType;
    sequenceIndex: number;
    numSequenceDays: number;
    difficultyName: string;
    dontDisplayBanner: boolean;
    dontDisplayEnd: boolean;
    clubID: string;
    isLocked: boolean;
}

interface CalendarEventIndexInfo {
    offsetMonths: number;
    monthDay: number;
    eventIndex: number;
}

interface CalendarEventInfo {
    title: string;
    description: string;
    creator?: string;
    eventType: Enum.CalendarEventType;
    repeatOption: Enum.CalendarEventRepeatOptions;
    maxSize: number;
    textureIndex?: number;
    time: CalendarTime;
    lockoutTime: CalendarTime;
    isLocked: boolean;
    isAutoApprove: boolean;
    hasPendingInvite: boolean;
    inviteStatus?: Enum.CalendarStatus;
    inviteType?: Enum.CalendarInviteType;
    calendarType: string;
    communityName?: string;
}

interface CalendarEventInviteInfo {
    name?: string;
    level: number;
    className?: string;
    classFilename?: string;
    inviteStatus?: Enum.CalendarStatus;
    modStatus?: string;
    inviteIsMine: boolean;
    type: Enum.CalendarInviteType;
    notes: string;
    classID?: number;
    guid: string;
}

interface CalendarEventStatusOption {
    status: Enum.CalendarStatus;
    statusString: string;
}

interface CalendarEventTextureInfo {
    title: string;
    iconTexture: number;
    expansionLevel: number;
    difficultyId?: number;
    mapId?: number;
    isLfr?: boolean;
}

interface CalendarEventTypeDisplayInfo {
    displayString: string;
    eventType: Enum.CalendarEventType;
}

interface CalendarGuildEventInfo {
    eventID: string;
    year: number;
    month: number;
    monthDay: number;
    weekday: number;
    hour: number;
    minute: number;
    eventType: Enum.CalendarEventType;
    title: string;
    calendarType: string;
    texture: number;
    inviteStatus: Enum.CalendarStatus;
    clubID: string;
}

interface CalendarGuildFilterInfo {
    minLevel: number;
    maxLevel: number;
    rank: number;
}

interface CalendarHolidayInfo {
    name: string;
    description: string;
    texture: number;
    startTime?: CalendarTime;
    endTime?: CalendarTime;
}

interface CalendarMonthInfo {
    month: number;
    year: number;
    numDays: number;
    firstWeekday: number;
}

interface CalendarRaidInfo {
    name: string;
    calendarType: string;
    raidID: number;
    time: CalendarTime;
    difficulty: number;
    difficultyName?: string;
}

interface CalendarTime {
    monthDay: number;
    month: number;
    weekday: number;
    year: number;
    hour: number;
    minute: number;
}

interface CampaignChapterInfo {
    name: string;
    description: string;
    rewardQuestID: number;
}

interface CampaignFailureReason {
    text: string;
    questID?: number;
    mapID?: number;
}

interface CampaignInfo {
    name: string;
    description: string;
    uiTextureKit: string;
    isWarCampaign: boolean;
    usesNormalQuestIcons: boolean;
    isContainerCampaign: boolean;
    sortAsNormalQuest: boolean;
    hideFutureChapters: boolean;
}

interface CaptureBarWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    barValue: number;
    barMinValue: number;
    barMaxValue: number;
    neutralZoneSize: number;
    neutralZoneCenter: number;
    tooltip: string;
    glowAnimType: Enum.WidgetGlowAnimType;
    fillDirectionType: Enum.CaptureBarWidgetFillDirectionType;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface CaptureZoneVisualizationInfo {
    shownState: Enum.WidgetShownState;
    mode: Enum.ZoneControlMode;
    leadingEdgeType: Enum.ZoneControlLeadingEdgeType;
    dangerFlashType: Enum.ZoneControlDangerFlashType;
    zoneInfo: ZoneEntry;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface CatalogShopBundleChildInfo {
    childProductID: number;
    displayOrder: number;
    quantityInBundle: number;
}

interface CatalogShopCategoryInfo {
    ID: number;
    displayName: string;
    iconTexture: string;
    linkTag: string;
    isDisabled: boolean;
    showPersistentRefundButton: boolean;
}

interface CatalogShopProductDisplayInfo {
    defaultPreviewModelSceneID: number;
    defaultCardModelSceneID: number;
    defaultWideCardModelSceneID: number;
    itemID: number;
    overridePreviewModelSceneID?: number;
    overrideCardModelSceneID?: number;
    overrideWideCardModelSceneID?: number;
    creatureDisplayInfoIDs: number[];
    spellVisualIDs: number[];
    mainHandItemModifiedAppearanceID?: number;
    offHandItemModifiedAppearanceID?: number;
    itemModifiedAppearanceIDs: number[];
    iconFileDataID?: number;
    iconTextureKit?: string;
    productType?: string;
    itemDescription?: string;
    hasUnknownLicense: boolean;
    productPMTURL?: string;
    additionalProductPMTURLs: string[];
    otherProductImageAtlasName?: string;
    otherProductGameTitleBaseTag?: string;
    otherProductGameType?: string;
    customLoopingSoundStart?: number;
    customLoopingSoundMiddle?: number;
    customLoopingSoundEnd?: number;
    specialActorID_1?: string;
    specialActorID_2?: string;
    specialActorID_3?: string;
    specialActorID_4?: string;
    specialActorID_5?: string;
    gameFlavorID?: number;
    decorFileDataID?: number;
    quantity?: number;
    houseTextureAtlas?: string;
}

interface CatalogShopProductInfo {
    catalogShopProductID: number;
    name: string;
    type?: string;
    description: string;
    iconTexture: string;
    isFullyOwned: boolean;
    isPurchasePending: boolean;
    refundable: boolean;
    price: string;
    originalPrice: string;
    discountPercentage: number;
    itemID: number;
    mountID: number;
    mountTypeName: string;
    speciesID: number;
    transmogSetID: number;
    itemModifiedAppearanceID: number;
    subItems: CatalogShopSubItemInfo[];
    subItemsLoaded: boolean;
    backgroundTexture: string;
    foregroundTexture?: string;
    smallCardBGTexture?: string;
    smallCardFGTexture?: string;
    wideCardBGTexture?: string;
    wideCardFGTexture?: string;
    previewIconTexture?: string;
    optionalWideCardBackgroundTexture?: string;
    isBundle: boolean;
    bundleChildrenSize: number;
    licenseTermType: number;
    licenseTermDuration: number;
    virtualCurrencies: CatalogShopVirtualCurrency[];
    isHidden: boolean;
    isMystery: boolean;
    hasPendingOrders: boolean;
    numBundleDetailCards: number;
    isDynamicallyDiscounted: boolean;
    shouldShowOriginalPrice: boolean;
    wideCardBGOverrideProductURL?: string;
    previewBGOverrideProductURL?: string;
    previewSmallBGOverrideProductURL?: string;
    decorQuantity?: DecorQuantity;
    isVCProduct: boolean;
    containsHousingItem: boolean;
    deferredGameTimeDays: number;
}

interface CatalogShopSectionInfo {
    ID: number;
    displayName: string;
    parentCatalogShopCategoryInfoID?: number;
    cardType?: string;
    scrollGridSize?: number;
    shouldShowRecommendationOptOutDisclaimer: boolean;
}

interface CatalogShopSpellVisualInfo {
    animID?: number;
    spellVisualKitID?: number;
}

interface CatalogShopSubItemInfo {
    name: string;
    itemID: number;
    itemAppearanceID: number;
    invType: string;
    quality: Enum.ItemQuality;
}

interface CatalogShopVCProductInfo {
    vcProductID: number;
}

interface CatalogShopVirtualCurrency {
    amount: number;
    currencyCode: string;
}

interface CBORSerializationOptions {
    /** If true, attempt to ignore errors from unsupported values and instead replace them where applicable with 'undefined' CBOR items. */
    ignoreSerializationErrors: boolean;
}

interface ChallengeCompletionInfo {
    mapChallengeModeID: number;
    level: number;
    time: number;
    onTime: boolean;
    keystoneUpgradeLevels: number;
    practiceRun: boolean;
    oldOverallDungeonScore?: number;
    newOverallDungeonScore?: number;
    isMapRecord: boolean;
    isAffixRecord: boolean;
    isEligibleForScore: boolean;
    members: ChallengeModeCompletionMemberInfo[];
}

interface ChallengeModeBestTime {
    mapChallengeModeID: number;
    durationMs: number;
    members: ChallengeModeBestTimeMember[];
}

interface ChallengeModeBestTimeMember {
    name: string;
    classFileName: string;
    className: string;
    specializationID: number;
}

interface ChallengeModeCompletionMemberInfo {
    memberGUID: string;
    name: string;
}

interface ChallengeModeGuildAttemptMember {
    name: string;
    classFileName: string;
}

interface ChallengeModeGuildTopAttempt {
    name: string;
    classFileName: string;
    keystoneLevel: number;
    mapChallengeModeID: number;
    isYou: boolean;
    members: ChallengeModeGuildAttemptMember[];
}

interface ChallengeModeReward {
    rewardID: number;
    displayInfoID: number;
    quantity: number;
    isCurrency: boolean;
}

interface CharacterAlternateFormData {
    raceID: number;
    name: string;
    fileName: string;
    createScreenIconAtlas: string;
}

interface CharacterCurrencyData {
    characterGUID: string;
    characterName: string;
    fullCharacterName: string;
    currencyID: number;
    quantity: number;
}

/** Unicode property values for the first code point in a string. */
interface CharacterProperties {
    /** The Unicode code point tested for character properties. */
    codePoint: number;
    /** True if the code point is a letter character with general category L. */
    isAlphabetic: boolean;
    /** True if the code point is a digit character with general category Nd. */
    isDigit: boolean;
    /** True if the code point has the Unicode White_Space property. */
    isWhitespace: boolean;
    /** The short Unicode property value name for the code point's general category. */
    generalCategory: string;
    /** The short ISO 15924 script code for the code point's script. */
    scriptCode: string;
    /** The short Unicode property value name for the code point's block. */
    blockCode: string;
}

interface CharCustomizationCategory {
    id: number;
    orderIndex: number;
    name: string;
    icon: string;
    selectedIcon: string;
    undressModel: boolean;
    subcategory: boolean;
    cameraZoomLevel: number;
    cameraDistanceOffset: number;
    spellShapeshiftFormID?: number;
    chrModelID?: number;
    options: CharCustomizationOption[];
    hasNewChoices: boolean;
    needsNativeFormCategory: boolean;
}

interface CharCustomizationChoice {
    id: number;
    name: string;
    ineligibleChoice: boolean;
    isNew: boolean;
    swatchColor1?: ColorMixin;
    swatchColor2?: ColorMixin;
    soundKit?: number;
    isLocked: boolean;
    lockedText?: string;
}

interface CharCustomizationOption {
    id: number;
    name: string;
    orderIndex: number;
    optionType: Enum.ChrCustomizationOptionType;
    choices: CharCustomizationChoice[];
    currentChoiceIndex?: number;
    hasNewChoices: boolean;
    isSound: boolean;
}

interface ChatChannelInfo {
    name: string;
    shortcut: string;
    localID: number;
    instanceID: number;
    zoneChannelID: number;
    channelType: Enum.PermanentChatChannelType;
}

interface ChatMessageEventParams {
    text: string;
    playerName: string;
    languageName: string;
    channelName: string;
    playerName2: string;
    specialFlags: string;
    zoneChannelID: number;
    channelIndex: number;
    channelBaseName: string;
    languageID: number;
    lineID: number;
    guid: string;
    bnSenderID: number;
    isMobile: boolean;
    isSubtitle: boolean;
    hideSenderInLetterbox: boolean;
    suppressRaidIcons: boolean;
    discordInfo: DiscordChatInfo;
}

interface ChromieTimeExpansionInfo {
    id: number;
    name: string;
    description: string;
    mapAtlas: string;
    previewAtlas: string;
    completed: boolean;
    alreadyOn: boolean;
    recommended: boolean;
    sortPriority: number;
}

interface ClassInfo {
    className: string;
    classFile: string;
    classID: number;
}

interface ClickBindingInfo {
    type: Enum.ClickBindingType;
    /** Base spellID for spell, macro index for macro, ClickBindingInteraction for interaction, spellID for PetAction */
    actionID: number;
    button: string;
    modifiers: number;
}

interface ClubFinderApplicantInfo {
    clubFinderGUID: string;
    playerGUID: string;
    closed: number;
    name: string;
    message: string;
    level: number;
    classID: number;
    ilvl: number;
    specIds: number[];
    requestStatus: Enum.PlayerClubRequestStatus;
    lookupSuccess: boolean;
    lastUpdatedTime: number;
    faction: number;
}

interface ClubInfo {
    clubId: string;
    name: string;
    shortName?: string;
    description: string;
    broadcast: string;
    clubType: Enum.ClubType;
    avatarId: number;
    memberCount?: number;
    favoriteTimeStamp?: number;
    joinTime?: number;
    socialQueueingEnabled?: boolean;
    crossFaction?: boolean;
}

interface ClubInvitationCandidateInfo {
    memberId: string;
    name: string;
    priority: number;
    status: Enum.ClubInvitationCandidateStatus;
}

interface ClubInvitationInfo {
    invitationId: string;
    isMyInvitation: boolean;
    invitee: ClubMemberInfo;
}

interface ClubLimits {
    maximumNumberOfStreams: number;
}

interface ClubMemberInfo {
    isSelf: boolean;
    memberId: string;
    /** name may be encoded as a Kstring */
    name?: string;
    role?: Enum.ClubRoleIdentifier;
    presence: Enum.ClubMemberPresence;
    clubType?: Enum.ClubType;
    guid?: string;
    bnetAccountId?: number;
    memberNote?: string;
    officerNote?: string;
    classID?: number;
    race?: number;
    level?: number;
    zone?: string;
    achievementPoints?: number;
    profession1ID?: number;
    profession1Rank?: number;
    profession1Name?: string;
    profession2ID?: number;
    profession2Rank?: number;
    profession2Name?: string;
    lastOnlineYear?: number;
    lastOnlineMonth?: number;
    lastOnlineDay?: number;
    lastOnlineHour?: number;
    guildRank?: string;
    guildRankOrder?: number;
    isRemoteChat?: boolean;
    overallDungeonScore?: number;
    faction?: Enum.PvPFaction;
    timerunningSeasonID?: number;
    discordInfo?: DiscordChatInfo;
}

interface ClubMessageIdentifier {
    /** number of microseconds since the UNIX epoch. */
    epoch: number;
    /** sort order for messages at the same time */
    position: number;
}

interface ClubMessageInfo {
    messageId: ClubMessageIdentifier;
    content: string;
    author: ClubMemberInfo;
    /** May be nil even if the message has been destroyed */
    destroyer?: ClubMemberInfo;
    destroyed: boolean;
    edited: boolean;
}

interface ClubMessageRange {
    oldestMessageId: ClubMessageIdentifier;
    newestMessageId: ClubMessageIdentifier;
}

interface ClubPrivilegeInfo {
    canDestroy: boolean;
    canSetAttribute: boolean;
    canSetName: boolean;
    canSetDescription: boolean;
    canSetAvatar: boolean;
    canSetBroadcast: boolean;
    canSetPrivacyLevel: boolean;
    canSetOwnMemberAttribute: boolean;
    canSetOtherMemberAttribute: boolean;
    canSetOwnMemberNote: boolean;
    canSetOtherMemberNote: boolean;
    canSetOwnVoiceState: boolean;
    canSetOwnPresenceLevel: boolean;
    canUseVoice: boolean;
    canVoiceMuteMemberForAll: boolean;
    canGetInvitation: boolean;
    canSendInvitation: boolean;
    canSendGuestInvitation: boolean;
    canRevokeOwnInvitation: boolean;
    canRevokeOtherInvitation: boolean;
    canGetBan: boolean;
    canGetSuggestion: boolean;
    canSuggestMember: boolean;
    canGetTicket: boolean;
    canCreateTicket: boolean;
    canDestroyTicket: boolean;
    canAddBan: boolean;
    canRemoveBan: boolean;
    canCreateStream: boolean;
    canDestroyStream: boolean;
    canSetStreamPosition: boolean;
    canSetStreamAttribute: boolean;
    canSetStreamName: boolean;
    canSetStreamSubject: boolean;
    canSetStreamAccess: boolean;
    canSetStreamVoiceLevel: boolean;
    canCreateMessage: boolean;
    canDestroyOwnMessage: boolean;
    canDestroyOtherMessage: boolean;
    canEditOwnMessage: boolean;
    canPinMessage: boolean;
    /** Roles that can be kicked and banned */
    kickableRoleIds: number[];
}

interface ClubRoleInfo {
    roleId: number;
    name: string;
    /** At least one user must be in this role */
    required: boolean;
    /** At most one user can be in this role */
    unique: boolean;
}

interface ClubSelfInvitationInfo {
    invitationId: string;
    club: ClubInfo;
    inviter: ClubMemberInfo;
    leaders: ClubMemberInfo[];
}

interface ClubSettingsInfo {
    playStyleDungeon: boolean;
    playStyleRaids: boolean;
    playStylePvp: boolean;
    playStyleRP: boolean;
    playStyleSocial: boolean;
    roleTank: boolean;
    roleHealer: boolean;
    roleDps: boolean;
    sizeSmall: boolean;
    sizeMedium: boolean;
    sizeLarge: boolean;
    maxLevelOnly: boolean;
    enableListing: boolean;
    sortRelevance: boolean;
    sortMembers: boolean;
    sortNewest: boolean;
    autoAccept: boolean;
    crossFaction: boolean;
}

interface ClubStreamInfo {
    streamId: string;
    name: string;
    subject: string;
    leadersAndModeratorsOnly: boolean;
    streamType: Enum.ClubStreamType;
    creationTime: number;
}

interface ClubStreamNotificationSetting {
    streamId: string;
    filter: Enum.ClubStreamNotificationFilter;
}

interface ClubTicketInfo {
    ticketId: string;
    allowedRedeemCount: number;
    currentRedeemCount: number;
    /** Creation time in microseconds since the UNIX epoch. */
    creationTime: number;
    /** Expiration time in microseconds since the UNIX epoch. */
    expirationTime: number;
    defaultStreamId?: string;
    creator: ClubMemberInfo;
}

interface ColorOverrideInfo {
    overrideType: Enum.ColorOverride;
    overrideColor: ColorMixin;
    overrideColorString: string;
}

interface CombatLogEventInfo {
}

interface CombatTextEventInfo {
}

interface CommentatorHistory {
    series: CommentatorSeries[];
    teamDirectory: CommentatorTeamDirectoryEntry[];
    overrideNameDirectory: CommentatorOverrideNameEntry[];
}

interface CommentatorMatchDataState {
    receivedPlayerInfo: boolean;
    setInstancePlayers: boolean;
    requestedCooldownInfo: boolean;
    requestedPlayerCooldowns: TeamPlayerRequestedCooldownInfo[];
}

interface CommentatorOverrideNameEntry {
    originalName: string;
    newName: string;
}

interface CommentatorPlayerData {
    unitToken: string;
    name: string;
    faction: number;
    specialization: number;
    damageDone: number;
    damageTaken: number;
    healingDone: number;
    healingTaken: number;
    kills: number;
    deaths: number;
    soloShuffleRoundWins: number;
    soloShuffleRoundLosses: number;
}

interface CommentatorSeries {
    teams: CommentatorSeriesTeam[];
}

interface CommentatorSeriesTeam {
    name: string;
    score: number;
}

interface CommentatorTeamDirectoryEntry {
    playerName: string;
    teamName: string;
}

interface CommentatorTrackedItemCooldown {
    spellID: number;
    category: Enum.TrackedSpellCategory;
}

interface CommentatorUnitData {
    healthMax: number;
    health: number;
    absorbTotal: number;
    isDeadOrGhost: boolean;
    isFeignDeath: boolean;
    powerTypeToken: string;
    power: number;
    powerMax: number;
}

interface CommoditySearchResultInfo {
    itemID: number;
    quantity: number;
    unitPrice: number;
    auctionID: number;
    owners: string[];
    totalNumberOfOwners: number;
    timeLeftSeconds?: number;
    numOwnerItems: number;
    containsOwnerItem: boolean;
    containsAccountItem: boolean;
}

interface ConduitCollectionData {
    conduitID: number;
    conduitRank: number;
    conduitItemLevel: number;
    conduitType: Enum.SoulbindConduitType;
    conduitSpecSetID: number;
    conduitSpecIDs: number[];
    conduitSpecName?: string;
    covenantID?: number;
    conduitItemID: number;
}

interface ConquestWeeklyProgress {
    progress: number;
    maxProgress: number;
    displayType: Enum.ConquestProgressBarDisplayType;
    unlocksCompleted: number;
    maxUnlocks: number;
    sampleItemHyperlink: string;
}

interface ConsoleCommandInfo {
    command: string;
    help: string;
    category: Enum.ConsoleCategory;
    commandType: Enum.ConsoleCommandType;
    scriptContents: string;
    scriptParameters: string;
}

interface ConsoleScriptCollectionData {
    ID: number;
    name: string;
}

interface ConsoleScriptCollectionElementData {
    collectionID?: number;
    consoleScriptID?: number;
}

interface ConsoleScriptData {
    ID: number;
    name: string;
    help: string;
    script: string;
    params: string;
    isLuaScript: boolean;
}

interface ConsoleScriptParameter {
    name: string;
    description: string;
}

interface ContainerItemInfo {
    iconFileID: number;
    stackCount: number;
    isLocked: boolean;
    quality?: Enum.ItemQuality;
    isReadable: boolean;
    hasLoot: boolean;
    hyperlink: string;
    isFiltered: boolean;
    hasNoValue: boolean;
    itemID: number;
    isBound: boolean;
    itemName: string;
}

interface ContentTrackingMapInfo {
    x: number;
    y: number;
    trackableType: Enum.ContentTrackingType;
    trackableID: number;
    targetType: Enum.ContentTrackingTargetType;
    targetID: number;
    waypointText: string;
}

interface ContributionAppearance {
    stateName: string;
    stateColor: ColorMixin;
    tooltipLine: string;
    tooltipUseTimeRemaining: boolean;
    statusBarAtlas: string;
    borderAtlas: string;
    bannerAtlas: string;
}

interface ContributionMapInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    atlasName: string;
    collectorCreatureID: number;
}

interface ConversionCurrencyCost {
    currencyID: number;
    amount: number;
}

interface CooldownViewerCooldown {
    cooldownID: number;
    spellID?: number;
    spellCategoryID?: number;
    overrideSpellID?: number;
    overrideTooltipSpellID?: number;
    equipSlot?: number;
    buffSlot?: number;
    linkedSpellIDs: number[];
    selfAura: boolean;
    hasAura: boolean;
    charges: boolean;
    isKnown: boolean;
    isInvisible: boolean;
    flags: Enum.CooldownSetSpellFlags;
    category: Enum.CooldownViewerCategory;
}

interface CorruptionEffectInfo {
    name: string;
    description: string;
    minCorruption: number;
}

interface CovenantAbilityInfo {
    spellID: number;
    type: Enum.CovenantAbilityType;
}

interface CovenantData {
    ID: number;
    textureKit: string;
    celebrationSoundKit: number;
    animaChannelSelectSoundKit: number;
    animaChannelActiveSoundKit: number;
    animaGemsFullSoundKit: number;
    animaNewGemSoundKit: number;
    animaReinforceSelectSoundKit: number;
    upgradeTabSelectSoundKitID: number;
    reservoirFullSoundKitID: number;
    beginResearchSoundKitID: number;
    renownFanfareSoundKitID: number;
    factionID: number;
    name: string;
    soulbindIDs: number[];
}

interface CovenantFeatureInfo {
    name: string;
    description: string;
    texture: number;
}

interface CovenantPreviewInfo {
    textureKit: string;
    transmogSetID: number;
    mountID: number;
    covenantName: string;
    covenantZone: string;
    description: string;
    covenantCrest: string;
    covenantAbilities: CovenantAbilityInfo[];
    fromPlayerChoice: boolean;
    covenantSoulbinds: CovenantSoulbindInfo[];
    featureInfo: CovenantFeatureInfo;
}

interface CovenantSanctumFeatureInfo {
    garrTalentTreeID: number;
    featureType: number;
    uiOrder: number;
}

interface CovenantSanctumRenownLevelInfo {
    level: number;
    locked: boolean;
    isMilestone: boolean;
    isCapstone: boolean;
}

interface CovenantSanctumRenownRewardInfo {
    uiOrder: number;
    itemID?: number;
    spellID?: number;
    mountID?: number;
    transmogID?: number;
    transmogSetID?: number;
    titleMaskID?: number;
    garrFollowerID?: number;
    transmogIllusionSourceID?: number;
    icon?: number;
    name?: string;
    description?: string;
    toastDescription?: string;
}

interface CovenantSoulbindInfo {
    spellID: number;
    uiTextureKit: string;
    name: string;
    description: string;
    sortOrder: number;
}

interface CraftingCurrencyResultData {
    currencyID: number;
    quantity: number;
    operationID: number;
    firstCraftReward: boolean;
    showCurrencyText: boolean;
}

interface CraftingItemResultData {
    resourcesReturned?: CraftingResourceReturnInfo[];
    craftingQuality?: number;
    qualityProgress: number;
    itemID: number;
    itemGUID: string;
    quantity: number;
    hyperlink: string;
    isCrit: boolean;
    critBonusSkill: number;
    recraftable: boolean;
    bonusCraft: boolean;
    multicraft: number;
    operationID: number;
    firstCraftReward: boolean;
    isEnchant: boolean;
    hasIngenuityProc: boolean;
    concentrationCurrencyID: number;
    concentrationSpent: number;
    ingenuityRefund: number;
}

interface CraftingItemSlotModification {
    dataSlotIndex: number;
    reagent: CraftingReagent;
}

interface CraftingOperationBonusStatInfo {
    bonusStatName: string;
    bonusStatValue: number;
    ratingDescription: string;
    ratingPct: number;
    bonusRatingPct: number;
}

interface CraftingOperationInfo {
    recipeID: number;
    baseDifficulty: number;
    bonusDifficulty: number;
    baseSkill: number;
    bonusSkill: number;
    isQualityCraft: boolean;
    quality: number;
    craftingQuality: number;
    craftingQualityID: number;
    craftingDataID: number;
    lowerSkillThreshold: number;
    upperSkillTreshold: number;
    guaranteedCraftingQualityID: number;
    bonusStats: CraftingOperationBonusStatInfo[];
    concentrationCurrencyID: number;
    concentrationCost: number;
    ingenuityRefund: number;
}

interface CraftingOrderBucketInfo {
    itemID: number;
    spellID: number;
    skillLineAbilityID: number;
    tipAmountAvg: number;
    tipAmountMax: number;
    numAvailable: number;
}

interface CraftingOrderClaimsRemainingInfo {
    claimsRemaining: number;
    secondsToRecharge?: number;
}

interface CraftingOrderCustomerCategory {
    categoryName: string;
    categoryID: number;
    uiSortOrder: number;
    primaryCategorySortOrder?: number;
    secondaryCategorySortOrder?: number;
    type: Enum.CraftingOrderCustomerCategoryType;
}

interface CraftingOrderCustomerCategoryFilters {
    primaryCategoryID?: number;
    secondaryCategoryID?: number;
    tertiaryCategoryID?: number;
}

interface CraftingOrderCustomerOptionInfo {
    skillLineAbilityID: number;
    professionID: number;
    skillUpSkillLineID: number;
    spellID: number;
    itemID: number;
    itemName: string;
    primaryCategoryID: number;
    iLvlMin: number;
    iLvlMax?: number;
    canUse: boolean;
    bindOnPickup: boolean;
    qualityIlvlBonuses?: number[];
    craftingQualityIDs?: number[];
    quality?: Enum.ItemQuality;
    slots?: number;
    level?: number;
    skill?: number;
    secondaryCategoryID?: number;
    tertiaryCategoryID?: number;
    expansionID?: number;
}

interface CraftingOrderCustomerSearchParams {
    categoryFilters: CraftingOrderCustomerCategoryFilters;
    searchText?: string;
    minLevel: number;
    maxLevel: number;
    uncollectedOnly: boolean;
    usableOnly: boolean;
    upgradesOnly: boolean;
    currentExpansionOnly: boolean;
    includePoor: boolean;
    includeCommon: boolean;
    includeUncommon: boolean;
    includeRare: boolean;
    includeEpic: boolean;
    includeLegendary: boolean;
    includeArtifact: boolean;
    isFavoritesSearch: boolean;
}

interface CraftingOrderCustomerSearchResults {
    options: CraftingOrderCustomerOptionInfo[];
    extraColumnType?: Enum.AuctionHouseExtraColumn;
}

interface CraftingOrderInfo {
    orderID: number;
    itemID: number;
    spellID: number;
    skillLineAbilityID: number;
    orderType: Enum.CraftingOrderType;
    orderState: Enum.CraftingOrderState;
    expirationTime: number;
    claimEndTime: number;
    minQuality: number;
    tipAmount: number;
    consortiumCut: number;
    isRecraft: boolean;
    isFulfillable: boolean;
    reagentState: Enum.CraftingOrderReagentsType;
    customerGuid?: string;
    customerName?: string;
    crafterGuid?: string;
    crafterName?: string;
    npcCustomerCreatureID?: number;
    customerNotes: string;
    reagents: CraftingOrderReagentInfo[];
    outputItemHyperlink?: string;
    outputItemGUID?: string;
    recraftItemHyperlink?: string;
    npcOrderRewards: CraftingOrderRewardInfo[];
    npcCraftingOrderSetID: number;
    npcTreasureID: number;
}

interface CraftingOrderMailInfo {
    reason: Enum.RcoCloseReason;
    recipeName: string;
    commissionPaid?: number;
    crafterNote?: string;
    crafterGUID?: string;
    crafterName?: string;
    customerGUID?: string;
    customerName?: string;
}

interface CraftingOrderPersonalOrdersInfo {
    profession: Enum.Profession;
    numPersonalOrders: number;
    professionName: string;
}

interface CraftingOrderReagentInfo {
    reagentInfo: CraftingReagentInfo;
    slotIndex: number;
    source: Enum.CraftingOrderReagentSource;
    isBasicReagent: boolean;
}

interface CraftingOrderRequestInfo {
    orderType: Enum.CraftingOrderType;
    selectedSkillLineAbility?: number;
    searchFavorites: boolean;
    initialNonPublicSearch: boolean;
    primarySort: CraftingOrderSortInfo;
    secondarySort: CraftingOrderSortInfo;
    forCrafter: boolean;
    offset: number;
    callback: CraftingOrderRequestCallback;
    profession?: Enum.Profession;
}

interface CraftingOrderRequestMyOrdersInfo {
    primarySort: CraftingOrderSortInfo;
    secondarySort: CraftingOrderSortInfo;
    offset: number;
    callback: CraftingOrderRequestMyOrdersCallback;
}

interface CraftingOrderRewardInfo {
    itemLink?: string;
    currencyType?: number;
    count: number;
}

interface CraftingOrderSortInfo {
    sortType: Enum.CraftingOrderSortType;
    reversed: boolean;
}

interface CraftingQualityInfo {
    quality: number;
    icon: string;
    iconSmall: string;
    iconInventory: string;
    iconMixed: string;
    iconAppear: string;
    iconDissolve: string;
    barFill: string;
    barBackground: string;
    barBackgroundCap: string;
    barHighlight: string;
    iconChat: string;
    iconQuestObjective: string;
}

interface CraftingReagent {
    itemID?: number;
    currencyID?: number;
}

interface CraftingReagentInfo {
    reagent: CraftingReagent;
    dataSlotIndex: number;
    quantity: number;
}

interface CraftingReagentSlotInfo {
    mcrSlotID: number;
    requiredSkillRank: number;
    slotText?: string;
}

interface CraftingReagentSlotSchematic {
    reagents: CraftingReagent[];
    reagentType: Enum.CraftingReagentType;
    variableQuantities: CraftingVariableQuantities[];
    quantityRequired: number;
    slotInfo?: CraftingReagentSlotInfo;
    dataSlotType: Enum.TradeskillSlotDataType;
    dataSlotIndex: number;
    slotIndex: number;
    orderSource?: Enum.CraftingOrderReagentSource;
    required: boolean;
    hiddenInCraftingForm: boolean;
}

interface CraftingRecipeOutputInfo {
    icon: number;
    hyperlink?: string;
    itemID?: number;
}

interface CraftingRecipeRequirement {
    name: string;
    met: boolean;
    type: Enum.RecipeRequirementType;
}

interface CraftingRecipeSchematic {
    recipeID: number;
    icon: number;
    quantityMin: number;
    quantityMax: number;
    name: string;
    recipeType: Enum.TradeskillRecipeType;
    productQuality?: number;
    outputItemID?: number;
    reagentSlotSchematics: CraftingReagentSlotSchematic[];
    isRecraft: boolean;
    hasCraftingOperationInfo: boolean;
}

interface CraftingRecipeSkillLineInfo {
    professionSkillLineID: number;
    expansionSkillLineID: number;
}

interface CraftingResourceReturnInfo {
    reagent: CraftingReagent;
    quantity: number;
}

interface CraftingTargetItem {
    itemID: number;
    itemGUID: string;
    hyperlink?: string;
    quantity: number;
}

interface CraftingVariableQuantities {
    reagent: CraftingReagent;
    quantity: number;
}

interface CreateFontFamilyMemberInfo {
    alphabet: FontAlphabet;
    file: string;
    height: number;
    flags: TBFFlags;
}

interface CreateFrameOptions {
    frameType: string;
    name?: string;
    parent?: Frame;
    inherits?: string[];
    id?: number;
    forbidden: boolean;
    hidden: boolean;
}

interface CreateRegionParams {
    name?: string;
    drawLayer?: DrawLayer;
    templateName?: string;
    subLevel?: number;
}

interface CreatureFamilyInfo {
    id: number;
    name: string;
    iconFile?: number;
}

interface CreatureTypeInfo {
    id: number;
    name: string;
}

interface CreditsDisplayInfo {
    isDefault: boolean;
    creditsFileID: number;
    keyArt: string;
    background: string;
    name: string;
    logo: number;
    soundKit?: number;
}

interface CriteriaRequiredValue {
    criteriaID: number;
    requiredValue: number;
}

interface CriteriaRequirement {
    completed: boolean;
    requirementText: string;
}

interface CurrencyCost {
    currencyID: number;
    amount: number;
}

interface CurrencyDisplayInfo {
    name: string;
    description: string;
    icon: number;
    quality: number;
    displayAmount: number;
    actualAmount: number;
}

interface CurrencyInfo {
    name: string;
    description: string;
    currencyID: number;
    isHeader: boolean;
    isHeaderExpanded: boolean;
    currencyListDepth: number;
    isTypeUnused: boolean;
    isShowInBackpack: boolean;
    quantity: number;
    trackedQuantity: number;
    iconFileID: number;
    maxQuantity: number;
    canEarnPerWeek: boolean;
    quantityEarnedThisWeek: number;
    isTradeable: boolean;
    quality: Enum.ItemQuality;
    maxWeeklyQuantity: number;
    totalEarned: number;
    discovered: boolean;
    useTotalEarnedForMaxQty: boolean;
    isAccountWide: boolean;
    isAccountTransferable: boolean;
    transferPercentage?: number;
    rechargingCycleDurationMS: number;
    rechargingAmountPerCycle: number;
}

/** A parsed numeric amount and currency from a localized currency string. */
interface CurrencyParseResult {
    /** The numeric amount parsed by the currency parser. */
    amount: number;
    /** The ISO 4217 currency code parsed alongside the amount. */
    currencyCode: string;
}

interface CurrencyTransferTransaction {
    sourceCharacterGUID: string;
    sourceCharacterName: string;
    fullSourceCharacterName: string;
    destinationCharacterGUID: string;
    destinationCharacterName: string;
    fullDestinationCharacterName: string;
    currencyType: number;
    quantityTransferred: number;
    totalQuantityConsumed: number;
    timestamp: number;
}

interface CursorFileInfo {
    name: string;
    hasBaseBlp: boolean;
}

interface CustomAuraButtonApplicationBarOptions {
    /** The maximum number of aura applications represented by the bar. */
    maxApplications: number;
    /** The minimum number of aura applications represented by the bar. */
    minApplications: number;
    /** Optional interpolation method used when updating the bar value. */
    interpolation?: Enum.StatusBarInterpolation;
}

interface CustomAuraButtonApplicationCountOptions {
    /** Optional formatter used to display aura application counts. */
    formatter?: NumericFormatter;
}

interface CustomAuraButtonCasterNameOptions {
    /** If true, append realm names to the displayed string. */
    showRealmName: boolean;
    /** If true, apply class coloring to the text. */
    useClassColors: boolean;
}

interface CustomAuraButtonDispelTypeTextOptions {
    /** Shows the dispel type text for harmful auras. */
    showWhenHarmful: boolean;
    /** Shows the dispel type text for helpful auras. */
    showWhenHelpful: boolean;
    /** Shows the dispel type text for auras that do not have a dispel type. */
    showWithoutDispelType: boolean;
    /** Optional map of dispel type names to custom texts. An empty key can be used for auras without a dispel type. */
    customDispelTextMap?: LuaTable<string, string>;
}

interface CustomAuraButtonDispelTypeTextureAsset {
    /** The texture file or atlas to use. */
    asset: string | number;
    /** Resizes the texture to the atlas dimensions. Ignored when asset does not name an atlas. */
    useAtlasSize: boolean;
    /** Optional texture coordinates used when asset does not name an atlas. */
    texCoords?: CustomAuraButtonDispelTypeTextureTexCoords;
}

interface CustomAuraButtonDispelTypeTextureOptions {
    /** Shows the dispel type texture always, ignoring all other criteria. */
    showAlways: boolean;
    /** Shows the dispel type texture for harmful auras. */
    showWhenHarmful: boolean;
    /** Shows the dispel type texture for helpful auras. */
    showWhenHelpful: boolean;
    /** Shows the dispel type texture for auras that do not have a dispel type. */
    showWithoutDispelType: boolean;
    /** Restricts display of the dispel type texture to either stealable or non-stealable auras. If omitted, the dispel type texture may be shown for both. */
    stealableFilter?: Enum.CustomAuraButtonDispelTypeStealableFilter;
    /** The texture style to use. */
    style: Enum.CustomAuraButtonDispelTypeTextureStyle;
    /** Optional map of dispel type names to custom texture assets. The "None" key represents auras without a dispel type. Only applies when using the CustomAsset style. */
    customDispelAssetMap?: LuaTable<string, CustomAuraButtonDispelTypeTextureAsset>;
    /** Optional map of dispel type names to custom vertex colors. The "None" key represents auras without a dispel type. */
    customDispelColorMap?: LuaTable<string, colorRGB>;
    /** Optional curve used to determine vertex colors from the aura's dispel type. */
    customDispelColorCurve?: LuaColorCurveObject;
}

interface CustomAuraButtonDispelTypeTextureTexCoords {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

interface CustomAuraButtonDurationBarOptions {
    /** The interpolation method used when updating the duration bar. */
    interpolation?: Enum.StatusBarInterpolation;
    /** The direction in which the duration bar progresses. */
    direction?: Enum.StatusBarTimerDirection;
}

interface CustomAuraButtonDurationTextOptions {
    /** Optional duration text binding to use. The binding is copied before being associated with the aura button. */
    binding?: DurationTextBindingObject;
    /** Optional formatter used to display remaining duration values. Ignored if textFormat is specified. */
    textFormatter?: NumericFormatter;
    /** Optional text format configuration applied to the duration text binding. Overrides textFormatter when specified. */
    textFormat?: DurationTextBindingFormatOptions;
    /** Optional text color configuration applied to the duration text binding. */
    textColor?: DurationTextBindingColorOptions;
}

interface CVarInfo {
    value: string;
    defaultValue: string;
    isStoredServerAccount: boolean;
    isStoredServerCharacter: boolean;
    isLockedFromUser: boolean;
    isSecure: boolean;
    isReadOnly: boolean;
}

/** Data for a combat session currently being tracked. */
interface DamageMeterAvailableCombatSession {
    sessionID: number;
    name: string;
    durationSeconds?: number;
}

/** Aggregated data for all sources (units) in a damage meter combat session. */
interface DamageMeterCombatSession {
    combatSources: DamageMeterCombatSource[];
    maxAmount: number;
    totalAmount: number;
    durationSeconds?: number;
}

/** Data for a single source (unit) in a combat session. */
interface DamageMeterCombatSessionSource {
    combatSpells: DamageMeterCombatSpell[];
    maxAmount: number;
    totalAmount: number;
}

/** Aggregated data for a single source (unit) in a damage meter combat session. */
interface DamageMeterCombatSource {
    sourceGUID?: string;
    sourceCreatureID?: number;
    name: string;
    classFilename: string;
    specIconID: number;
    totalAmount: number;
    amountPerSecond: number;
    isLocalPlayer: boolean;
    deathRecapID: number;
    deathTimeSeconds: number;
    classification: string;
    sourceDisplayType: Enum.DamageMeterSourceDisplayType;
    factionGroup?: string;
}

/** Aggregated data for all spells of the same ID cast by a single source (unit) in a combat session. */
interface DamageMeterCombatSpell {
    spellID: number;
    totalAmount: number;
    amountPerSecond: number;
    creatureName: string;
    overkillAmount: number;
    isAvoidable: boolean;
    isDeadly: boolean;
    combatSpellDetails: DamageMeterCombatSpellUnitDetails;
}

/** Amount for a single target for all casts of the same spellID by a single source (unit) in a combat session. */
interface DamageMeterCombatSpellUnitDetails {
    unitName: string;
    unitClassFilename: string;
    classification: string;
    isPet: boolean;
    isMob: boolean;
    amount: number;
    specIconID: number;
}

interface DBColorExport {
    baseTag: string;
    color: ColorMixin;
}

interface DeadlyDebuffInfo {
    criticalTimeRemainingMs?: number;
    criticalStacks?: number;
    priority: number;
    warningText: string;
    soundKitID?: number;
}

interface DeathRecapEventInfo {
}

interface DecorQuantity {
    placedQuantity: number;
    storedQuantity: number;
}

interface DelveAssistActionData {
    assistedPlayer: string;
    mapName?: string;
    creatureName?: string;
    receivedSpellID?: number;
    assistAction: Enum.AssistActionType;
}

interface DifficultyInfo {
    name: string;
    instanceType: string;
    isHeroic: boolean;
    isChallengeMode: boolean;
    displayHeroic: boolean;
    displayMythic: boolean;
    toggleDifficultyID?: number;
    isLFR: boolean;
    minPlayers?: number;
    maxPlayers?: number;
    isUserSelectable: boolean;
}

interface DigSiteMapInfo {
    researchSiteID: number;
    position: Vector2DMixin;
    name: string;
    poiBlobID: number;
    textureIndex: number;
}

interface DiscordChatInfo {
    userID: DiscordMemberOpaqueID;
    globalName: string;
    type: Enum.DiscordDisplayNameType;
    lastOnlineGUID: string;
    lastOnlineName: string;
    hasAttachment: boolean;
    hasPoll: boolean;
    hasEmbed: boolean;
    hasSticker: boolean;
    hasEmoji: boolean;
    hasError: boolean;
    hasForwardedMessage: boolean;
    forwardedMessage: string;
    fromDiscord: boolean;
}

interface DiscreteProgressStepsVisualizationInfo {
    shownState: Enum.WidgetShownState;
    tooltip: string;
    progressMin: number;
    progressMax: number;
    progressVal: number;
    numSteps: number;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface DoorConnectionInfo {
    doorID: number;
    connectionType: Enum.HousingRoomComponentType;
    doorFacing: number;
}

interface DoubleIconAndTextWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    label: string;
    leftText: string;
    leftTooltip: string;
    rightText: string;
    rightTooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface DoubleStateIconRowVisualizationInfo {
    shownState: Enum.WidgetShownState;
    leftIcons: UIWidgetStateIconInfo[];
    rightIcons: UIWidgetStateIconInfo[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface DoubleStatusBarWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    leftBarMin: number;
    leftBarMax: number;
    leftBarValue: number;
    leftBarTooltip: string;
    rightBarMin: number;
    rightBarMax: number;
    rightBarValue: number;
    rightBarTooltip: string;
    barValueTextType: Enum.StatusBarValueTextType;
    text: string;
    leftBarTooltipLoc: Enum.UIWidgetTooltipLocation;
    rightBarTooltipLoc: Enum.UIWidgetTooltipLocation;
    fillMotionType: Enum.UIWidgetMotionType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface DungeonEncounterInfo {
    encounterName: string;
    texture: string;
    isKilled: boolean;
    ineligible: boolean;
}

interface DungeonEntranceMapInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    description: string;
    atlasName: string;
    journalInstanceID: number;
}

interface DurationTextBindingColorOptions {
    curve: LuaColorCurveObject;
    property: Enum.DurationTextBindingProperty;
}

interface DurationTextBindingFormatComponent {
    /** The duration property sampled for this format component. */
    property: Enum.DurationTextBindingProperty;
    /** The numeric formatter used to convert the sampled duration property into text. */
    formatter: NumericFormatter;
}

interface DurationTextBindingFormatOptions {
    formatString: string;
    components: DurationTextBindingFormatComponent[];
}

interface DyeColorCategoryDisplayInfo {
    ID: number;
    name: string;
}

interface DyeColorDisplayInfo {
    ID: number;
    dyeColorCategoryID: number;
    name: string;
    sortOrder: number;
    swatchColorStart: ColorMixin;
    swatchColorEnd: ColorMixin;
    /** The consumable item used to apply this Dye Color; May be nil if dye color does not have an associated item */
    itemID?: number;
    /** The number of this dye's consumable item owned by the player; Includes both held and banked items; Will be 0 if dye has no associated item */
    numOwned: number;
}

interface EditModeAnchorInfo {
    point: FramePoint;
    relativeTo: string;
    relativePoint: FramePoint;
    offsetX: number;
    offsetY: number;
}

interface EditModeLayoutInfo {
    layoutName: string;
    layoutType: Enum.EditModeLayoutType;
    interfaceStyle?: Enum.InputDeviceInterfaceType;
    systems: EditModeSystemInfo[];
}

interface EditModeLayouts {
    layouts: EditModeLayoutInfo[];
    activeLayout: number;
}

interface EditModeSettingInfo {
    setting: number;
    value: number;
}

interface EditModeSystemInfo {
    system: Enum.EditModeSystem;
    systemIndex?: number;
    anchorInfo: EditModeAnchorInfo;
    anchorInfo2?: EditModeAnchorInfo;
    settings: EditModeSettingInfo[];
    isInDefaultPosition: boolean;
}

interface EncounterEventInfo {
    /** ID of the encounter event record. */
    encounterEventID: number;
    /** If true, this event should be displayed on boss ability HUD elements. */
    enabled: boolean;
    /** Spell ID that triggers this event. A single spell may be used by multiple encounter events. */
    spellID: number;
    /** Icon file ID for the event. Typically the same as the spell icon, but may be overridden. */
    iconFileID: number;
    /** Severity level of this event. */
    severity: Enum.EncounterEventSeverity;
    /** Bitmask of spell support icons to show for this event. */
    icons: Enum.EncounterEventIconmask;
}

interface EncounterEventSoundInfo {
    /** Sound file to be played when triggered. */
    file: string | number;
    /** Sound channel to play this file on. */
    channel: UISoundSubType;
    /** Volume scalar for the sound file. */
    volume: number;
}

interface EncounterJournalItemInfo {
    itemID: number;
    encounterID?: number;
    name?: string;
    itemQuality?: string;
    filterType?: Enum.ItemSlotFilterType;
    icon?: number;
    slot?: string;
    armorType?: string;
    link?: string;
    handError?: boolean;
    weaponTypeError?: boolean;
    displayAsPerPlayerLoot?: boolean;
    displayAsVeryRare?: boolean;
    displayAsExtremelyRare?: boolean;
    displaySeasonID?: number;
}

interface EncounterJournalMapEncounterInfo {
    encounterID: number;
    mapX: number;
    mapY: number;
}

interface EncounterJournalSectionInfo {
    spellID: number;
    title: string;
    description?: string;
    headerType: number;
    abilityIcon: number;
    creatureDisplayID: number;
    uiModelSceneID: number;
    siblingSectionID?: number;
    firstChildSectionID?: number;
    filteredByDifficulty: boolean;
    link: string;
    startsOpen: boolean;
}

interface EncounterLootDropInfo {
    lootListKey: number;
    itemHyperlink: string;
    playerRollState: Enum.EncounterLootDropRollState;
    currentLeader?: EncounterLootDropRollInfo;
    isTied: boolean;
    winner?: EncounterLootDropRollInfo;
    allPassed: boolean;
    rollInfos: EncounterLootDropRollInfo[];
    startTime: number;
    duration: number;
}

interface EncounterLootDropRollInfo {
    playerName: string;
    playerGUID: string;
    playerClass: string;
    isSelf: boolean;
    state: Enum.EncounterLootDropRollState;
    isWinner: boolean;
    roll?: number;
}

interface EncounterLootDrops {
    encounterID: number;
    drops: EncounterLootDropInfo[];
}

interface EncounterLootInfo {
    encounterName: string;
    encounterID: number;
    startTime: number;
    duration: number;
}

interface EncounterTimelineEventFilter {
    /** Maximum number of sorted events to return. */
    maxEventCount?: number;
    /** Maximum duration of sorted events to return. */
    maxEventDuration?: number;
    /** If false, include events that are terminal states such as Canceled or Finished. */
    excludeTerminalStates: boolean;
    /** If false, include events that should be hidden by user configuration, such as events on long tracks when the user has opted to not show long countdowns. */
    excludeHiddenEvents: boolean;
}

interface EncounterTimelineEventInfo {
    /** Instance ID for this event. */
    id: EncounterTimelineEventID;
    /** Source that this event came from. */
    source: Enum.EncounterTimelineEventSource;
    /** Spell name associated with this event. For script events, this may instead be the contents of the 'overrideName' field if it wasn't empty. */
    spellName: string;
    /** Spell ID associated with this event. */
    spellID: number;
    /** Icon file ID associated with this event. */
    iconFileID: number;
    /** Base duration of this event at the point that it was queued onto the timeline. */
    duration: number;
    /** Hold duration for this event after it reaches the end of the timeline. During this period, the event will sit in the queued track of the timeline until manually finished or this added duration expires. */
    maxQueueDuration: number;
    /** Bitmask of active icon states for this event. */
    icons: Enum.EncounterEventIconmask;
    /** Severity of this event. */
    severity: Enum.EncounterEventSeverity;
    /** If true, this event is an approximation and may not occur exactly when the timeline suggests it will. */
    isApproximate: boolean;
}

interface EncounterTimelineScriptEventRequest {
    spellID: number;
    iconFileID: number;
    duration: number;
    maxQueueDuration: number;
    overrideName: string;
    icons?: Enum.EncounterEventIconmask;
    severity: Enum.EncounterEventSeverity;
    paused: boolean;
}

interface EncounterTimelineTrackInfo {
    id: Enum.EncounterTimelineTrack;
    type: Enum.EncounterTimelineTrackType;
    /** The exclusive lower bound of durations for events on this track. If zero, this should be treated as an inclusive lower bound. This bound is ignored by the timeline sequence in circumstances where an adjacent Sorted track would exceed its maximum event count, requiring events be pushed 'to the left' by one track. */
    minimumDuration?: number;
    /** The inclusive upper bound of durations for events on this track. */
    maximumDuration?: number;
    /** Lower duration bound for events that want to transition onto this track from an Indeterminate position. Events below this duration are artificially kept in the indeterminate track state until they can transition into a later track in the timeline sequence. */
    minimumEventIntroDuration?: number;
    /** Minimum duration gap that must exist between two sequential candidate events for this track. If two event durations have a distance under this figure, the later of the two events will be artifically kept in the indeterminate track state until it can transition into a later track in the timeline sequence. */
    minimumEventGapDuration?: number;
    /** The maximum number of events permitted within this track. This only applies to Sorted tracks. */
    maximumEventCount?: number;
    /** Sort ordering for events within this track. This only applies to Sorted tracks. */
    sortDirection?: Enum.EncounterTimelineEventSortDirection;
}

interface EncounterTrackingInfo {
    encounterName: string;
    journalEncounterID?: number;
    journalInstanceID?: number;
    instanceName: string;
    subText?: string;
    difficultyID?: number;
    lfgDungeonID?: number;
    groupFinderActivityID?: number;
}

interface EncounterUnitStatus {
    creatureID: number;
    creatureName: string;
    remainingHealthPercent: number;
}

interface EncounterWarningInfo {
    text: string;
    casterGUID: string;
    casterName: string;
    targetGUID: string;
    targetName: string;
    iconFileID: number;
    tooltipSpellID: number;
    isDeadly: boolean;
    color: ColorMixin;
    duration: number;
    severity: Enum.EncounterEventSeverity;
    shouldPlaySound: boolean;
    shouldShowChatMessage: boolean;
    shouldShowWarning: boolean;
}

interface EventDisplayInfo {
    hideTimeLeft: boolean;
    hideDescription: boolean;
    overrideAtlas?: string;
    overrideTooltipWidgetSetID?: number;
}

interface EventToastInfo {
    eventToastID: number;
    title: string;
    subtitle: string;
    instructionText: string;
    iconFileID: number;
    subIcon?: string;
    link: string;
    qualityString?: string;
    quality?: number;
    eventType: Enum.EventToastEventType;
    displayType: Enum.EventToastDisplayType;
    uiTextureKit: string;
    sortOrder: number;
    time?: number;
    uiWidgetSetID?: number;
    extraUiWidgetSetID?: number;
    titleTooltip?: string;
    subtitleTooltip?: string;
    titleTooltipUiWidgetSetID?: number;
    subtitleTooltipUiWidgetSetID?: number;
    showSoundKitID?: number;
    hideSoundKitID?: number;
    colorTint?: ColorMixin;
    flags: number;
}

interface ExpansionDisplayInfo {
    logo: number;
    banner: string;
    features: ExpansionDisplayInfoFeature[];
    highResBackgroundID: number;
    lowResBackgroundID: number;
    textureKit: string;
    glueAmbianceSoundKit?: number;
    glueMusicSoundKit?: number;
    glueCreditsSoundKit?: number;
}

interface ExpansionDisplayInfoFeature {
    icon: number;
    text: string;
}

interface FactionData {
    factionID: number;
    name: string;
    description: string;
    reaction: number;
    currentReactionThreshold: number;
    nextReactionThreshold: number;
    currentStanding: number;
    atWarWith: boolean;
    canToggleAtWar: boolean;
    isChild: boolean;
    isHeader: boolean;
    isHeaderWithRep: boolean;
    isCollapsed: boolean;
    isWatched: boolean;
    hasBonusRepGain: boolean;
    canSetInactive: boolean;
    isAccountWide: boolean;
}

interface FactionInfo {
    name: string;
    groupTag: string;
}

interface FillUpFramesWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    fillMin: number;
    fillMax: number;
    fillValue: number;
    numTotalFrames: number;
    numFullFrames: number;
    pulseFillingFrame: boolean;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface FlyoutInfo {
    name: string;
    description: string;
    numSlots: number;
    isKnown: boolean;
}

interface FlyoutSlotInfo {
    spellID: number;
    overrideSpellID: number;
    isKnown: boolean;
    name?: string;
    specID?: number;
}

interface FogOfWarInfo {
    fogOfWarID: number;
    backgroundAtlas: string;
    maskAtlas: string;
    maskScalar: number;
}

interface FollowerAutoCombatStatsInfo {
    currentHealth: number;
    maxHealth: number;
    attack: number;
    healingTimestamp: number;
    healCost: number;
    minutesHealingRemaining: number;
}

interface FollowerDisplayID {
    id: number;
    followerPageScale: number;
    showWeapon: boolean;
}

interface FollowerMissionCompleteInfo {
    name: string;
    displayIDs: FollowerDisplayID[];
    level: number;
    quality: number;
    currentXP: number;
    maxXP: number;
    height: number;
    scale: number;
    movementType?: number;
    impactDelay?: number;
    castID?: number;
    castSoundID?: number;
    impactID?: number;
    impactSoundID?: number;
    targetImpactID?: number;
    targetImpactSoundID?: number;
    className?: string;
    classAtlas: string;
    portraitIconID: number;
    textureKit: string;
    isTroop: boolean;
    boardIndex: number;
    health: number;
    maxHealth: number;
    role: number;
}

interface FontScriptInfo {
    color: ColorMixin;
    height: number;
    outline: string;
    shadow?: FontScriptShadowInfo;
    fontObject: Font;
    canBeUserScaled: boolean;
}

interface FontScriptShadowInfo {
    color: ColorMixin;
    x: number;
    y: number;
}

interface FriendInfo {
    connected: boolean;
    name: string;
    className?: string;
    area?: string;
    notes?: string;
    guid: string;
    level: number;
    dnd: boolean;
    afk: boolean;
    rafLinkType: Enum.RafLinkType;
}

interface FriendshipReputationInfo {
    friendshipFactionID: number;
    standing: number;
    maxRep: number;
    name?: string;
    text: string;
    texture: number;
    reaction: string;
    reactionThreshold: number;
    nextThreshold?: number;
    reversedColor: boolean;
    overrideColor?: number;
}

interface FriendshipReputationRankInfo {
    currentLevel: number;
    maxLevel: number;
}

interface GameModeDisplayInfo {
    logo: number;
    logoHeight: number;
    logoVerticalOffset: number;
    logoShrunkenHeight: number;
    logoUsesDarkBackdrop: boolean;
    characterCreateExtraHeight: number;
    characterCreateOuterBorder: number;
}

interface GamePadAxisConfig {
    axis: string;
    shift?: number;
    scale?: number;
    deadzone?: number;
    buttonThreshold?: number;
    buttonPos?: string;
    buttonNeg?: string;
    comment?: string;
}

interface GamePadConfig {
    comment?: string;
    name?: string;
    configID: GamePadConfigID;
    labelStyle?: string;
    rawButtonMappings: GamePadRawButtonMapping[];
    rawAxisMappings: GamePadRawAxisMapping[];
    axisConfigs: GamePadAxisConfig[];
    stickConfigs: GamePadStickConfig[];
}

interface GamePadConfigID {
    vendorID?: number;
    productID?: number;
}

interface GamePadMappedState {
    name: string;
    labelStyle: string;
    buttonCount: number;
    axisCount: number;
    stickCount: number;
    buttons: boolean[];
    axes: number[];
    sticks: GamePadStick[];
}

interface GamePadRawAxisMapping {
    rawIndex: number;
    axis?: string;
    comment?: string;
}

interface GamePadRawButtonMapping {
    rawIndex: number;
    button?: string;
    axis?: string;
    axisValue?: number;
    comment?: string;
}

interface GamePadRawState {
    name: string;
    vendorID: number;
    productID: number;
    rawButtonCount: number;
    rawAxisCount: number;
    rawButtons: boolean[];
    rawAxes: number[];
}

interface GamePadStick {
    x: number;
    y: number;
    len: number;
}

interface GamePadStickConfig {
    stick: string;
    axisX?: string;
    axisY?: string;
    deadzone?: number;
    deadzoneX?: number;
    deadzoneY?: number;
    comment?: string;
}

interface GarrisonAbilityCounterInfo {
    id: number;
    icon: number;
    name: string;
    factor: number;
    description: string;
}

interface GarrisonAbilityEffect {
    name: string;
    description: string;
    icon: number;
    factor: number;
}

interface GarrisonAbilityInfo {
    id: number;
    name: string;
    description: string;
    icon: number;
    isTrait: boolean;
    isSpecialization: boolean;
    temporary: boolean;
    category?: string;
    counters: GarrisonAbilityCounterInfo[];
    isEmptySlot: boolean;
}

interface GarrisonEnemyEncounterInfo {
    name: string;
    displayID: number;
    portraitFileDataID: number;
    textureKit: string;
    scale: number;
    height: number;
    mechanics: GarrisonMechanicInfo[];
    autoCombatSpells: AutoCombatSpellInfo[];
    autoCombatAutoAttack?: AutoCombatSpellInfo;
    role: number;
    health: number;
    maxHealth: number;
    attack: number;
    boardIndex: number;
    isElite: boolean;
}

interface GarrisonFollowerAbilityInfo {
    id: number;
    name: string;
    description: string;
    icon: number;
    isTrait: boolean;
    isSpecialization: boolean;
    temporary: boolean;
    category?: string;
    counters: GarrisonAbilityEffect[];
    isEmptySlot: boolean;
}

interface GarrisonFollowerDeathInfo {
    followerID: GarrisonFollower;
    state: number;
}

interface GarrisonMechanicInfo {
    mechanicTypeID: number;
    icon: number;
    name: string;
    factor: number;
    description: string;
    ability?: GarrisonAbilityInfo;
}

interface GarrisonPlotInstanceMapInfo {
    buildingPlotInstanceID: number;
    position: Vector2DMixin;
    name: string;
    atlasName: string;
}

interface GarrisonTalentCurrencyCostInfo {
    currencyType: number;
    currencyQuantity: number;
}

interface GarrisonTalentInfo {
    id: number;
    ability: GarrisonFollowerAbilityInfo;
    name: string;
    icon: number;
    tier: number;
    uiOrder: number;
    type: number;
    prerequisiteTalentID?: number;
    selected: boolean;
    researched: boolean;
    ignoreTalent: boolean;
    researchDuration: number;
    startTime: number;
    timeRemaining: number;
    researchGoldCost: number;
    researchCurrencyCosts: GarrisonTalentCurrencyCostInfo[];
    talentAvailability: Enum.GarrisonTalentAvailability;
    talentRank: number;
    talentMaxRank: number;
    isBeingResearched: boolean;
    description: string;
    perkSpellID: number;
    researchDescription?: string;
    playerConditionReason?: string;
    socketInfo: GarrisonTalentSocketInfo;
    treeID: number;
}

interface GarrisonTalentSocketInfo {
    socketType: number;
    socketSubtype: number;
    misc0: number;
    misc1: number;
}

interface GarrisonTalentTreeInfo {
    treeID: number;
    title: string;
    textureKit: string;
    talents: GarrisonTalentInfo[];
    isClassAgnostic: boolean;
    isThemed: boolean;
    featureType: number;
    featureSubtype: number;
}

interface GatheringOperationBonusStatInfo {
    bonusStatName: string;
    bonusStatValue: number;
    ratingDescription: string;
    ratingPct: number;
    bonusRatingPct: number;
}

interface GatheringOperationInfo {
    spellID: number;
    maxDifficulty: number;
    baseSkill: number;
    bonusSkill: number;
    bonusStats: GatheringOperationBonusStatInfo[];
}

interface GenericWidgetDisplayFrameInfo {
    uiWidgetSetID?: number;
    uiTextureKit?: string;
    title?: string;
    frameWidth: number;
    frameHeight: number;
    extraButtonText?: string;
    closeButtonText?: string;
}

interface GossipOptionRewardInfo {
    id: number;
    quantity: number;
    rewardType: Enum.GossipOptionRewardType;
    context: ItemCreationContext;
}

interface GossipOptionUIInfo {
    gossipOptionID?: number;
    name: string;
    icon: number;
    rewards: GossipOptionRewardInfo[];
    status: Enum.GossipOptionStatus;
    spellID?: number;
    flags: number;
    overrideIconID?: number;
    selectOptionWhenOnlyOption: boolean;
    orderIndex: number;
    failureDescription?: string;
}

interface GossipOptionUIWidgetSetAndType {
    widgetType: number;
    uiWidgetSetID: number;
}

interface GossipPoiInfo {
    name: string;
    textureIndex: number;
    position: Vector2DMixin;
    inBattleMap: boolean;
}

interface GossipQuestUIInfo {
    title: string;
    questLevel: number;
    isTrivial: boolean;
    frequency?: number;
    repeatable?: boolean;
    isComplete?: boolean;
    isLegendary: boolean;
    isIgnored: boolean;
    questID: number;
    isImportant: boolean;
    isMeta: boolean;
    questInfoID: number;
}

interface GraveyardMapInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    textureIndex: number;
    graveyardID: number;
    isGraveyardSelectable: boolean;
}

interface GroupBuffItem {
    /** The persisted key for this item, shared by every rank of the spell. */
    spellID: number;
    /** The spell used for name, icon and tooltip: the highest known rank, or the lowest rank if none are known. */
    displaySpellID: number;
    name: string;
    iconID: number;
    flags: Enum.GroupBuffItemFlags;
    isKnown: boolean;
}

interface GroupBuffVisualAlertInfo {
    spellID: number;
    visualValue: Enum.VisualAlertType;
}

interface GroupCurrencyInfo {
    traitNodeGroupID: number;
    currencyInfos: TreeCurrencyInfo[];
}

interface GroupFinderActivityInfo {
    fullName: string;
    shortName: string;
    categoryID: number;
    groupFinderActivityGroupID: number;
    ilvlSuggestion: number;
    filters: number;
    minLevel: number;
    minLevelSuggestion: number;
    maxLevelSuggestion: number;
    maxNumPlayers: number;
    displayType: Enum.LFGListDisplayType;
    orderIndex: number;
    useHonorLevel: boolean;
    showQuickJoinToast: boolean;
    isMythicPlusActivity: boolean;
    isRatedPvpActivity: boolean;
    isCurrentRaidActivity: boolean;
    isPvpActivity: boolean;
    isMythicActivity: boolean;
    allowCrossFaction: boolean;
    isHeroicActivity: boolean;
    isNormalActivity: boolean;
    mapID: number;
    difficultyID: number;
    redirectedDifficultyID: number;
    useDungeonRoleExpectations: boolean;
}

interface GuildNewsInfo {
    isSticky: boolean;
    isHeader: boolean;
    newsType: number;
    whoText?: string;
    whatText?: string;
    newsDataID: number;
    data: number[];
    weekday: number;
    day: number;
    month: number;
    year: number;
    guildMembersPresent: number;
}

interface GuildRenameStatus {
    isNameChangeEnabled: boolean;
    isPlayerGuildMaster: boolean;
    refundEligibleEndTime: number;
    nextRenameTime: number;
    renamePrice: number;
    refundAmount: number;
    currentGuildMoney: number;
    result: Enum.GuildErrorType;
    oldGuildName: string;
    reservedName: string;
    reservedNameExpirationTime: number;
}

interface GuildTabardInfo {
    backgroundColor: ColorMixin;
    borderColor: ColorMixin;
    emblemColor: ColorMixin;
    emblemFileID: number;
    emblemStyle: number;
}

interface GxAdapterInfoDetails {
    name: string;
    isLowPower: boolean;
    isExternal: boolean;
}

interface HonorRewardInfo {
    honorLevelName: string;
    badgeFileDataID: number;
    achievementRewardedID: number;
}

interface HorizontalCurrenciesWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    currencies: UIWidgetCurrencyInfo[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface HouseExteriorSizeOption {
    size: Enum.HousingFixtureSize;
    name: string;
    isLocked: boolean;
}

interface HouseExteriorSizeOptionsInfo {
    selectedSize: Enum.HousingFixtureSize;
    options: HouseExteriorSizeOption[];
}

interface HouseExteriorTypeOption {
    houseExteriorTypeID: number;
    name: string;
    isLocked: boolean;
    isInvalid: boolean;
    reasonString: string;
}

interface HouseExteriorTypeOptionsInfo {
    selectedExteriorType: number;
    options: HouseExteriorTypeOption[];
}

interface HouseholdMemberInfo {
    characterName: string;
    classID: number;
}

interface HouseInfo {
    plotID: number;
    houseName?: string;
    ownerName?: string;
    plotCost?: number;
    neighborhoodName?: string;
    moveOutTime?: number;
    plotReserved?: boolean;
    neighborhoodGUID?: string;
    houseGUID?: string;
}

interface HouseLevelFavor {
    houseGUID?: string;
    houseLevel: number;
    houseFavor: number;
}

interface HouseLevelInfo {
    /** This specific house's current level, determined/increasesd by earning house xp */
    level: number;
    /** Current max decor placement budget for inside the house; Can be increased via house level */
    interiorDecorPlacementBudget: number;
    /** Current max decor placement budget for the house exterior/in the house's plot; Can be increased via house level */
    exteriorDecorPlacementBudget: number;
    /** Current max room placement budget for the house; Can be increased via house level */
    roomPlacementBudget: number;
    exteriorFixtureBudget: number;
}

interface HouseLevelReward {
    type: Enum.HouseLevelRewardType;
    asset?: string | number;
    iconTexture?: string | number;
    iconAtlas?: string;
    objectName?: string;
    tooltipText?: string;
    valueType?: Enum.HouseLevelRewardValueType;
    oldValue?: number;
    newValue?: number;
}

interface HouseOwnerCharacterInfo {
    characterName: string;
    classID: number;
    error: Enum.HouseOwnerError;
    playerGUID: string;
}

interface HousingBlueprintBudgetEntry {
    budgetType: Enum.HousingBudgetType;
    cost: number;
    /** Will be nil if there is no target house or information for it is unavailable */
    max?: number;
    /** Will be nil if there is no target house or information for it is unavailable */
    current?: number;
}

interface HousingBlueprintBudgetInfo {
    /** Map of budget type to budget entry */
    exteriorBudgets: LuaTable<Enum.HousingBudgetType, HousingBlueprintBudgetEntry>;
    /** Map of budget type to budget entry */
    interiorBudgets: LuaTable<Enum.HousingBudgetType, HousingBlueprintBudgetEntry>;
}

/** List of Blueprints, separated into like groups */
interface HousingBlueprintCollection {
    groups: HousingBlueprintGroup[];
}

/** A single specific object that makes up a Blueprint's contents */
interface HousingBlueprintContentEntry {
    contentType: Enum.HousingBlueprintContentType;
    recordID: number;
    name: string;
    /** Total instances of the object contained within or required by the Blueprint */
    total: number;
    /** The number of instances of this item that the player doesn't own, or have unlocked, or have available for use (depending on the type of content) */
    numMissing: number;
    /** True for content that isn't valid for use whether it's owned or not, for example exterior types of the opposite faction than the house's neighborhood */
    invalid: boolean;
    tooltip?: string;
}

/** Group of entries of one specific type of object within a Blueprint */
interface HousingBlueprintContentGroup {
    contentType: Enum.HousingBlueprintContentType;
    entries: HousingBlueprintContentEntry[];
}

interface HousingBlueprintContentInfo {
    shareCode: string;
    targetHouseGUID?: string;
    budgetInfo: HousingBlueprintBudgetInfo;
    contentGroups: HousingBlueprintContentGroup[];
    unmetRequirementFlags: Enum.HousingBlueprintUnmetRequirementFlags;
    blockingRequirementFlags: Enum.HousingBlueprintUnmetRequirementFlags;
}

/** Group of Blueprints of the same or similar types */
interface HousingBlueprintGroup {
    name: string;
    entries: HousingBlueprintInfo[];
}

/** List of entries of one specific type of object within a Blueprint */
interface HousingBlueprintInfo {
    blueprintID: number;
    shareCode: string;
    name: string;
    blueprintType: Enum.HousingBlueprintType;
    creationTime: number;
    /** True if this blueprint is an automatically saved backup, rather than a manually player-saved blueprint */
    isAutoSave: boolean;
}

interface HousingBundleDecorEntryInfo {
    decorID: number;
    quantity: number;
}

interface HousingBundleInfo {
    productID: number;
    price: number;
    originalPrice?: number;
    nonDecorProducts: number[];
    decorEntries: HousingBundleDecorEntryInfo[];
    /** Bundles containing non-decor items cannot be previewed */
    canPreview: boolean;
}

interface HousingCatalogCategoryInfo {
    ID: number;
    orderIndex: number;
    name?: string;
    icon?: string;
    subcategoryIDs: number[];
    /** True if the player owns anything that falls under this category */
    anyStoredEntries: boolean;
}

/** Identifier for base entries in the catalog */
interface HousingCatalogEntryID {
    recordID: number;
    entryType: Enum.HousingCatalogEntryType;
}

/** Base information about an object in the Catalog; For info for a specific owned stack of this object, see HousingCatalogEntryVariantInfo */
interface HousingCatalogEntryInfo {
    recordID: number;
    entryType: Enum.HousingCatalogEntryType;
    itemID?: number;
    name: string;
    /** 3D model asset for displaying in the UI; May be nil if the entry doesn't have a model, or has one that isn't supported by UI model scenes */
    asset?: string | number;
    /** Entry icon in the form of a texture file; Catalog entries should have either this OR an iconAtlas set */
    iconTexture?: string | number;
    /** Entry icon in the form a texture atlas element; Catalog entries should have either this OR an iconTexture set */
    iconAtlas?: string;
    /** Specific UI model scene ID to use when previewing this entry's 3D model; If not set, the default catalog model scene is used */
    uiModelSceneID?: number;
    categoryIDs: number[];
    subcategoryIDs: number[];
    /** Simple localized 'tag' strings that are primarily used for things like categorization and filtering */
    dataTagsByID: any;
    size: Enum.HousingCatalogEntrySize;
    /** How much of the applicable budget placing this entry would cost (if any) */
    placementCost: number;
    /** The total number of instances of this entry that exist in storage across all variants; Does not include unredeemed instances (see remainingRedeemable) */
    totalNumStored: number;
    /** The number of unredeemed instances of this entry that exist in storage; Some auto-awarded housing objects are granted in this 'lazily-instantiated' way, and will be 'redeemed' on first being placed */
    remainingRedeemable: number;
    /** The total number of instances of this entry that have been placed across all of the player's houses and plots, across all variants */
    totalNumPlaced: number;
    /** The number of instances that can be destroyed for this entry. */
    destroyableInstanceCount: number;
    /** This decor is flagged to display as a unique trophy item. */
    isUniqueTrophy: boolean;
    /** True if this entry is something that is allowed to be placed outside, within a plot */
    isAllowedOutdoors: boolean;
    /** True if this entry is something that is allowed to be placed indoors, within a house interior */
    isAllowedIndoors: boolean;
    /** True if this entry is something that can be customized; Kinds of customization vary depending on the entry type */
    canCustomize: boolean;
    isPrefab: boolean;
    quality?: Enum.ItemQuality;
    /** House XP that can be gained upon acquiring this entry for the first time */
    firstAcquisitionBonus: number;
    /** Describes specific sources this entry may be gained from; Faction-specific sources may or may not be included based on the current player's faction */
    sourceText: string;
}

/** Compound Identifier for entry variant stacks in the catalog */
interface HousingCatalogEntryVariantID {
    recordID: number;
    entryType: Enum.HousingCatalogEntryType;
    /** Hashed value used to identify and differentiate stacks that are the same type and record, but have some variant-specific difference (e.g. dye colors) */
    variantIdentifier: number;
}

/** Represents a single stack of instances of an object in the Catalog, that are all of a specific variation; For example, a stack of undyed chairs, or blue-dyed tables */
interface HousingCatalogEntryVariantInfo {
    entryVariantID: HousingCatalogEntryVariantID;
    /** The number of instances of this specific variant that exist in storage */
    numStored: number;
    /** Dye slot information for this variant; Empty for entries that can't be dyed */
    dyeSlots: HousingDecorDyeSlot[];
}

interface HousingCatalogFilterTagGroupInfo {
    groupID: number;
    groupName: string;
    tags: HousingCatalogFilterTagInfo[];
}

interface HousingCatalogFilterTagInfo {
    tagID: number;
    tagName: string;
    orderIndex: number;
    anyAssociatedEntries: boolean;
}

interface HousingCatalogSubcategoryInfo {
    ID: number;
    orderIndex: number;
    parentCategoryID: number;
    name?: string;
    icon?: string;
    /** True if the player owns anything that falls under this subcategory */
    anyStoredEntries: boolean;
}

interface HousingCategorySearchInfo {
    /** If true, search will only return categories/subcategories that the player has something stored under */
    withStoredEntriesOnly: boolean;
    includeFeaturedCategory: boolean;
    /** If set, will restrict results to only categories associated with/used by this Editor Mode */
    editorModeContext?: Enum.HouseEditorMode;
}

interface HousingCoreFixtureInfo {
    /** For fixtures that are variants, the id of specific selected variant; If fixture has no variants, will be the same id as selectedStyleFixtureID */
    selectedVariantFixtureID: number;
    /** For fixtures that are variants, the id of their specific base style fixture; If fixture has no variants, will be the same id as selectedVariantFixtureID */
    selectedStyleFixtureID: number;
    /** Fixtures that are variants of the same style as the selected (meaning they all share the same hooks); Includes the currently selected fixture */
    currentStyleVariantOptions: HousingFixtureOption[];
    /** Fixtures that are different styles for this type and size of fixture (swapping will clear all hooks); Includes the currently selected fixture */
    styleOptions: HousingFixtureOption[];
}

interface HousingDecorDyeSlot {
    ID: number;
    /** What category of dye colors this slot is for; This currently has no functional useage as slots accept colors of any category, but may be used for things like labeling in the future */
    dyeColorCategoryID: number;
    /** Display sort order */
    orderIndex: number;
    /** The specific shader channel that this slot affects when a dye color is applied */
    channel: number;
    /** What dye color (if any) is currently applied to this slot */
    dyeColorID?: number;
    /** The name of the dye color (if any) that is currently applied to this slot */
    dyeColorName?: string;
}

/** Info for an instance of Housing Decor that has been/is being placed within a House or its exterior Plot */
interface HousingDecorInstanceInfo {
    decorGUID: string;
    decorID: number;
    name: string;
    /** True if this decor is already being edited by someone else */
    isLocked: boolean;
    /** True if this decor can be customized, namely by applying Dyes */
    canBeCustomized: boolean;
    /** False if this decor must remain placed in the house and cannot be placed back into house chest storage */
    canBeRemoved: boolean;
    isAllowedOutdoors: boolean;
    isAllowedIndoors: boolean;
    isRefundable: boolean;
    canAttachPet: boolean;
    /** Empty for decor that can't be dyed (see canBeCustomized) */
    dyeSlots: HousingDecorDyeSlot[];
    /** Simple localized 'tag' strings that are primarily used for things like categorization and filtering */
    dataTagsByID: any;
    size: Enum.HousingCatalogEntrySize;
}

/** Smaller structs with the minimum fields from HousingDecorInstanceInfo needed to identify/display a slim list of placed decor */
interface HousingDecorInstanceListEntry {
    decorGUID: string;
    name: string;
}

interface HousingFeaturedSmallProductInfo {
    entryVariantID?: HousingCatalogEntryVariantID;
    productID: number;
    price: number;
    originalPrice?: number;
    canPreview: boolean;
}

interface HousingFixtureOption {
    fixtureID: number;
    name: string;
    typeID: number;
    typeName: string;
    isLocked: boolean;
    isInvalid: boolean;
    reasonString: string;
    colorID: number;
}

interface HousingFixturePointInfo {
    ownerHash: number;
    selectedFixtureID?: number;
    fixtureOptions: HousingFixtureOption[];
    canSelectionBeRemoved: boolean;
}

interface HousingMarketInfo {
    price: number;
    productID: number;
    bundleIDs: number[];
}

interface HousingPreviewItemData {
    decorGUID?: string;
    productID?: number;
    bundleCatalogShopProductID?: number;
    isBundleParent: boolean;
    isBundleChild: boolean;
    id: number;
    decorID: number;
    name: string;
    icon: number;
    price: number;
    salePrice?: number;
}

interface HousingRoomComponentInstanceInfo {
    roomGUID: string;
    type: Enum.HousingRoomComponentType;
    componentID: number;
    canBeCustomized: boolean;
    currentThemeSet?: number;
    availableThemeSets: number[];
    currentWallpaper?: number;
    currentRoomComponentTextureRecID?: number;
    ceilingType: Enum.HousingRoomComponentCeilingType;
    doorType: Enum.HousingRoomComponentDoorType;
}

interface HTMLContentNode {
    text: string;
    type: HTMLTextType;
    align: JustifyHorizontal;
}

interface IconAndTextWidgetVisualizationInfo {
    state: Enum.IconAndTextWidgetState;
    text: string;
    tooltip: string;
    dynamicTooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    shiftTextType: Enum.IconAndTextShiftTextType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface IconTextAndBackgroundWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    text: string;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface IconTextAndCurrenciesWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    enabledState: Enum.WidgetEnabledState;
    descriptionShownState: Enum.WidgetShownState;
    descriptionEnabledState: Enum.WidgetEnabledState;
    text: string;
    description: string;
    currencies: UIWidgetCurrencyInfo[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ImportLoadoutEntryInfo {
    nodeID: number;
    ranksGranted: number;
    ranksPurchased: number;
    selectionEntryID: number;
}

interface IncreasedTraitData {
    itemNameIncreasing: string;
    itemQualityIncreasing: Enum.ItemQuality;
    numPointsIncreased: number;
}

interface InitiativeActivityLogEntry {
    taskID: number;
    playerName: string;
    taskName: string;
    completionTime: number;
    amount: number;
}

interface InitiativeActivityLogInfo {
    isLoaded: boolean;
    neighborhoodGUID: string;
    nextUpdateTime: number;
    taskActivity: InitiativeActivityLogEntry[];
}

interface InitiativeMilestoneInfo {
    milestoneOrderIndex: number;
    requiredContributionAmount: number;
    rewards: InitiativeMilestoneRewardInfo[];
}

interface InitiativeMilestoneRewardInfo {
    title: string;
    description: string;
    decorID: number;
    decorQuantity: number;
    favor: number;
    money: number;
    rewardQuestID: number;
}

interface InitiativeTaskInfo {
    ID: number;
    taskName: string;
    description: string;
    progressContributionAmount: number;
    tracked: boolean;
    supersedes: number;
    timesCompleted: number;
    completed: boolean;
    inProgress: boolean;
    taskType: Enum.NeighborhoodInitiativeTaskType;
    sortOrder: number;
    rewardQuestID: number;
    requirementsList: CriteriaRequirement[];
    criteriaList: CriteriaRequiredValue[];
}

interface InitiativeTasksTracked {
    trackedIDs: number[];
}

interface InspectGuildInfo {
    achievementPoints: number;
    numMembers: number;
    guildName: string;
    realmName: string;
}

interface InspectPVPData {
    rating: number;
    gamesWon: number;
    gamesPlayed: number;
    roundsWon: number;
    roundsPlayed: number;
}

interface InspectRatedBGData {
    rating: number;
    played: number;
    won: number;
}

interface InstanceInfo {
    name: string;
    instanceType: string;
    difficultyID: number;
    difficultyName: string;
    maxPlayers: number;
    dynamicDifficulty: number;
    isDynamic?: boolean;
    instanceID: number;
    instanceGroupSize: number;
    lfgDungeonID?: number;
    hasWorldTier: boolean;
}

interface InvasionMapInfo {
    invasionID: number;
    name: string;
    position: Vector2DMixin;
    atlasName: string;
    rewardQuestID?: number;
}

interface IslandsQueueDifficultyInfo {
    difficultyId: number;
    previewRewardQuestId: number;
}

interface ItemDisplayVisualizationInfo {
    shownState: Enum.WidgetShownState;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    itemInfo: UIWidgetItemInfo;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ItemInfoResult {
    itemName: string;
    itemLink: string;
    itemQuality: Enum.ItemQuality;
    itemLevel: number;
    itemMinLevel: number;
    itemType: string;
    itemSubType: string;
    itemStackCount: number;
    itemEquipLoc: string;
    itemTexture: number;
    sellPrice: number;
    classID: number;
    subclassID: number;
    bindType: number;
    expansionID: number;
    setID?: number;
    isCraftingReagent: boolean;
    itemDescription: string;
}

interface ItemInteractionChargeInfo {
    newChargeAmount: number;
    rechargeRate: number;
    timeToNextCharge: number;
}

interface ItemInteractionFrameInfo {
    textureKit: string;
    openSoundKitID: number;
    closeSoundKitID: number;
    titleText: string;
    tutorialText: string;
    buttonText: string;
    interactionType: Enum.UIItemInteractionType;
    flags: Enum.UIItemInteractionFlags;
    description?: string;
    buttonTooltip?: string;
    confirmationDescription?: string;
    slotTooltip?: string;
    cost?: number;
    currencyTypeId?: number;
    dropInSlotSoundKitId?: number;
}

interface ItemKey {
    itemID: number;
    itemLevel: number;
    itemSuffix: number;
    battlePetSpeciesID: number;
}

interface ItemKeyInfo {
    itemID: number;
    battlePetSpeciesID: number;
    itemName: string;
    battlePetLink?: string;
    appearanceLink?: string;
    quality: Enum.ItemQuality;
    iconFileID: number;
    isPet: boolean;
    isCommodity: boolean;
    isEquipment: boolean;
}

interface ItemPurchaseCurrency {
    iconFileID?: number;
    currencyCount: number;
    name: string;
}

interface ItemPurchaseInfo {
    money: number;
    itemCount: number;
    refundSeconds: number;
    currencyCount: number;
    hasEnchants: boolean;
}

interface ItemPurchaseItem {
    iconFileID?: number;
    itemCount: number;
    hyperlink: string;
}

interface ItemQuestInfo {
    isQuestItem: boolean;
    questID?: number;
    isActive: boolean;
}

interface ItemSearchResultInfo {
    itemKey: ItemKey;
    owners: string[];
    totalNumberOfOwners: number;
    timeLeft: Enum.AuctionHouseTimeLeftBand;
    auctionID: number;
    quantity: number;
    itemLink?: string;
    containsOwnerItem: boolean;
    containsAccountItem: boolean;
    containsSocketedItem: boolean;
    bidder?: string;
    minBid?: number;
    bidAmount?: number;
    buyoutAmount?: number;
    timeLeftSeconds?: number;
}

interface ItemUpgradeCostDiscountInfo {
    isDiscounted: boolean;
    discountHighWatermark: number;
    isPartialTwoHandDiscount: boolean;
    isAccountWideDiscount: boolean;
    /** Reflects whether current character meets discount's high watermark, even if discount itself is account-wide */
    doesCurrentCharacterMeetHighWatermark: boolean;
}

interface ItemUpgradeCurrencyCost {
    cost: number;
    currencyID: number;
    discountInfo: ItemUpgradeCostDiscountInfo;
}

interface ItemUpgradeInfo {
    currentLevel: number;
    maxLevel: number;
    maxItemLevel: number;
    trackString?: string;
    trackStringID?: number;
}

interface ItemUpgradeItemCost {
    cost: number;
    itemID: number;
    discountInfo: ItemUpgradeCostDiscountInfo;
}

interface ItemUpgradeItemInfo {
    iconID: number;
    name: string;
    itemUpgradeable: boolean;
    displayQuality: number;
    highWatermarkSlot: number;
    currUpgrade: number;
    maxUpgrade: number;
    minItemLevel: number;
    maxItemLevel: number;
    upgradeLevelInfos: ItemUpgradeLevelInfo[];
    customUpgradeString?: string;
    upgradeCostTypesForSeason: ItemUpgradeSeasonalCostType[];
}

interface ItemUpgradeLevelInfo {
    upgradeLevel: number;
    displayQuality: number;
    itemLevelIncrement: number;
    levelStats: ItemUpgradeStat[];
    currencyCostsToUpgrade: ItemUpgradeCurrencyCost[];
    itemCostsToUpgrade: ItemUpgradeItemCost[];
    moneyCost?: number;
    failureMessage?: string;
}

/** Costs are made up of either an Item OR a Currency, so either itemID or currencyID will be nil */
interface ItemUpgradeSeasonalCostType {
    itemID?: number;
    currencyID?: number;
    orderIndex: number;
    sourceString?: string;
}

interface ItemUpgradeStat {
    displayString: string;
    statValue: number;
    active: boolean;
}

interface JSONSerializationOptions {
    /** If true, attempt to ignore errors from unsupported values and instead replace them where applicable with 'null' JSON values. */
    ignoreSerializationErrors: boolean;
}

interface LevelUpBattlegroundInfo {
    id: number;
    icon: number;
    name: string;
    isEpic: boolean;
}

interface LfgApplicantData {
    applicantID: number;
    applicationStatus: string;
    pendingApplicationStatus?: string;
    numMembers: number;
    isNew: boolean;
    comment: string;
    displayOrderID: number;
}

interface LfgCategoryData {
    name: string;
    searchPromptOverride?: string;
    separateRecommended: boolean;
    autoChooseActivity: boolean;
    preferCurrentArea: boolean;
    showPlaystyleDropdown: boolean;
    allowCrossFaction: boolean;
}

interface LFGDungeonInfo {
    name: string;
    iconID: number;
    link?: string;
}

interface LfgEntryData {
    activityIDs: number[];
    requiredItemLevel: number;
    requiredHonorLevel: number;
    name: string;
    comment: string;
    voiceChat: string;
    voiceMode: Enum.LFGEntryVoiceMode;
    censored: boolean;
    duration: number;
    autoAccept: boolean;
    privateGroup: boolean;
    questID?: number;
    requiredDungeonScore?: number;
    requiredPvpRating?: number;
    playstyle?: Enum.LFGEntryPlaystyle;
    generalPlaystyle?: Enum.LFGEntryGeneralPlaystyle;
    isCrossFactionListing: boolean;
    newPlayerFriendly: boolean;
}

interface LfgListingCreateData {
    activityIDs: number[];
    questID?: number;
    isAutoAccept: boolean;
    isCrossFactionListing: boolean;
    isPrivateGroup: boolean;
    newPlayerFriendly: boolean;
    playstyle: Enum.LFGEntryPlaystyle;
    generalPlaystyle: Enum.LFGEntryGeneralPlaystyle;
    requiredDungeonScore: number;
    requiredItemLevel: number;
    requiredPvpRating: number;
    voiceMode: Enum.LFGEntryVoiceMode;
}

interface LFGLockInfo {
    lfgID: number;
    reason: number;
    hideEntry: boolean;
}

interface LFGRoles {
    tank: boolean;
    healer: boolean;
    dps: boolean;
}

interface LfgSearchResultData {
    searchResultID: number;
    activityIDs: number[];
    leaderName?: string;
    name: string;
    comment: string;
    voiceChat: string;
    voiceMode: Enum.LFGEntryVoiceMode;
    censored: boolean;
    requiredItemLevel: number;
    requiredHonorLevel: number;
    hasSelf: boolean;
    numMembers: number;
    numBNetFriends: number;
    numCharFriends: number;
    numGuildMates: number;
    isDelisted: boolean;
    autoAccept: boolean;
    isWarMode: boolean;
    age: number;
    questID?: number;
    leaderOverallDungeonScore?: number;
    leaderDungeonScoreInfo: BestDungeonScoreMapInfo[];
    leaderBestDungeonScoreInfo?: BestDungeonScoreMapInfo;
    leaderPvpRatingInfo: PvpRatingInfo[];
    requiredDungeonScore?: number;
    requiredPvpRating?: number;
    playstyle?: Enum.LFGEntryPlaystyle;
    generalPlaystyle?: Enum.LFGEntryGeneralPlaystyle;
    crossFactionListing?: boolean;
    leaderFactionGroup: number;
    newPlayerFriendly?: boolean;
    partyGUID: string;
}

interface LfgSearchResultPlayerInfo {
    name?: string;
    level?: number;
    areaName?: string;
    className: string;
    classFilename: string;
    specName?: string;
    assignedRole: string;
    lfgRoles: LFGRoles;
    isLeader: boolean;
    isLeaver: boolean;
}

interface LobbyMatchmakerQueueInfo {
    isQueueActive: boolean;
    playlistEntryID: PartyPlaylistEntry;
    queueState: Enum.PlunderstormQueueState;
    queueStartTime: number;
}

interface LocaleInfo {
    localeId: number;
    localeName: string;
}

interface LootJournalItemInfo {
    itemID: number;
    icon: number;
    invType: number;
}

interface LootJournalItemSetInfo {
    setID: number;
    itemLevel: number;
    name: string;
}

interface LoreTextEntry {
    text: string;
    isHeader: boolean;
}

interface LossOfControlData {
    locType: string;
    spellID: number;
    displayText: string;
    iconTexture: number;
    startTime?: number;
    timeRemaining?: number;
    duration?: number;
    lockoutSchool: number;
    priority: number;
    displayType: number;
    auraInstanceID?: number;
}

interface LuaColorCurvePoint {
    x: number;
    y: ColorMixin;
}

interface MailReceiveInfo {
    sender: string;
    money: number;
}

interface MailSendInfo {
    target: string;
    sendMoney: number;
}

interface MajorFactionData {
    name: string;
    description: string;
    highlights: RenownHighlightInfo[];
    factionID: number;
    expansionID: number;
    bountySetID: number;
    isUnlocked: boolean;
    useJourneyUnlockToast: boolean;
    hideRenownLevelUpToast: boolean;
    unlockDescription?: string;
    uiPriority: number;
    renownLevel: number;
    maxLevel: number;
    renownReputationEarned: number;
    renownLevelThreshold: number;
    textureKit: string;
    celebrationSoundKit: number;
    renownFanfareSoundKitID: number;
    factionFontColor?: DBColorExport;
    renownTrackLevelEffectID?: number;
    playerCompanionID?: number;
}

interface MajorFactionProgressionInfo {
    renownLevel: number;
    previousWeekProgressiveMaxLevel: number;
    currentWeekProgressiveMaxLevel: number;
    maxLevel: number;
    renownReputationEarned: number;
    renownLevelThreshold: number;
    weekNumber: number;
}

interface MajorFactionRenownInfo {
    renownLevel: number;
    renownReputationEarned: number;
    renownLevelThreshold: number;
}

interface MajorFactionRenownLevelInfo {
    factionID: number;
    level: number;
    locked: boolean;
    isMilestone: boolean;
    isCapstone: boolean;
}

interface MajorFactionRenownRewardInfo {
    renownRewardID: number;
    uiOrder: number;
    isAccountUnlock: boolean;
    itemID?: number;
    spellID?: number;
    mountID?: number;
    transmogID?: number;
    transmogSetID?: number;
    titleMaskID?: number;
    transmogIllusionSourceID?: number;
    icon?: number;
    name?: string;
    description?: string;
    toastDescription?: string;
    rewardType?: number;
    isCollected?: boolean;
}

interface MapBannerInfo {
    areaPoiID: number;
    name: string;
    atlasName: string;
    uiTextureKit?: string;
}

interface MapLinkInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    atlasName: string;
    linkedUiMapID: number;
}

interface MapPinAnimationWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    animType: Enum.MapPinAnimationType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface MapSeasonBestInfo {
    durationSec: number;
    level: number;
    completionDate: CalendarTime;
    affixIDs: number[];
    members: MythicPlusMember[];
    dungeonScore: number;
}

interface MapTaxiNodeInfo {
    nodeID: number;
    position: Vector2DMixin;
    name: string;
    atlasName: string;
    faction: Enum.FlightPathFaction;
    textureKit: string;
    isUndiscovered: boolean;
}

interface MatchDetail {
    type: Enum.MatchDetailType;
    value: number;
}

interface MatchDetails {
    matchType: Enum.EndOfMatchType;
    matchEnded: boolean;
    detailsList: MatchDetail[];
}

interface MatchPVPStatColumn {
    pvpStatID: number;
    columnHeaderID: number;
    orderIndex: number;
    name: string;
    tooltipTitle: string;
    tooltip: string;
}

interface MerchantItemInfo {
    name?: string;
    texture: number;
    price: number;
    stackCount: number;
    numAvailable: number;
    isPurchasable: boolean;
    isUsable: boolean;
    hasExtendedCost: boolean;
    currencyID?: number;
    spellID?: number;
    isQuestStartItem: boolean;
}

interface MinimapScriptTrackingFilter {
    spellID?: number;
    filterID?: Enum.MinimapTrackingFilter;
}

interface MinimapScriptTrackingInfo {
    name: string;
    texture: number;
    active: boolean;
    type: string;
    subType: number;
    spellID?: number;
}

interface MirrorTimerInfo {
    name: string;
    startValue: number;
    maxValue: number;
    scale: number;
    paused: number;
    label: string;
    spellID: number;
}

interface MissionDeploymentInfo {
    location: string;
    xp: number;
    environment?: string;
    environmentDesc?: string;
    environmentTexture: number;
    locTextureKit: string;
    isExhausting: boolean;
    enemies: GarrisonEnemyEncounterInfo[];
}

interface MissionEncounterIconInfo {
    portraitFileDataID: number;
    missionScalar: number;
    isElite: boolean;
    isRare: boolean;
}

interface ModelLight {
    omnidirectional: boolean;
    /** If this light is omnidirectional then point refers to a position, otherwise it refers to a direction */
    point: Vector3DMixin;
    ambientIntensity: number;
    ambientColor?: ColorMixin;
    diffuseIntensity: number;
    diffuseColor?: ColorMixin;
}

interface ModifiedInstanceInfo {
    lfrItemLevel?: number;
    normalItemLevel?: number;
    heroicItemLevel?: number;
    mythicItemLevel?: number;
    uiTextureKit: string;
    description: string;
}

interface MountCreatureDisplayInfo {
    creatureDisplayID: number;
    isVisible: boolean;
}

interface MountInfo {
    name: string;
    spellID: number;
    icon: number;
    isActive: boolean;
    isUsable: boolean;
    sourceType: number;
    isFavorite: boolean;
    isFactionSpecific: boolean;
    faction?: Enum.PvPFaction;
    shouldHideOnChar: boolean;
    isCollected: boolean;
    mountID: number;
    isSteadyFlight: boolean;
}

interface MountInfoExtra {
    creatureDisplayInfoID?: number;
    description: string;
    source: string;
    isSelfMount: boolean;
    mountTypeID: number;
    uiModelSceneID: number;
    animID: number;
    spellVisualKitID: number;
    disablePlayerMountPreview: boolean;
}

/** Information about a specific M+ run */
interface MythicPlusAffixScoreInfo {
    name: string;
    score: number;
    level: number;
    durationSec: number;
    overTime: boolean;
}

interface MythicPlusDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    weekday: number;
}

interface MythicPlusKeystoneAffix {
    id: number;
    seasonID: number;
}

interface MythicPlusLeaderboardPlayerResult {
    playerGUID: string;
    specID: number;
}

interface MythicPlusLeaderboardResult {
    completionTime: number;
    players: MythicPlusLeaderboardPlayerResult[];
}

interface MythicPlusMember {
    name?: string;
    specID: number;
    classID: number;
}

interface MythicPlusRatingLinkInfo {
    mapChallengeModeID: number;
    level: number;
    completedInTime: number;
    dungeonScore: number;
    name: string;
}

/** Specific information about a completed mythic plus run. */
interface MythicPlusRatingMapSummary {
    challengeModeID: number;
    mapScore: number;
    bestRunLevel: number;
    bestRunDurationMS: number;
    finishedSuccess: boolean;
}

/** The current season rating and well as a list of completed mythic plus runs. */
interface MythicPlusRatingSummary {
    currentSeasonScore: number;
    runs: MythicPlusRatingMapSummary[];
}

interface MythicPlusRunInfo {
    mapChallengeModeID: number;
    level: number;
    thisWeek: boolean;
    completed: boolean;
    runScore: number;
    durationSec: number;
    completionDate: CalendarTime;
    season: number;
}

interface NameOverrideEntry {
    originalName: string;
    overrideName: string;
}

interface NeighborhoodInfo {
    neighborhoodType: NeighborhoodType;
    neighborhoodOwnerType: NeighborhoodOwnerType;
    neighborhoodName: string;
    neighborhoodGUID: string;
    ownerGUID: string;
    suggestionReason?: Enum.HouseFinderSuggestionReason;
    ownerName?: string;
    locationName?: string;
}

interface NeighborhoodInitiativeInfo {
    isLoaded: boolean;
    neighborhoodGUID: string;
    initiativeID: number;
    currentCycleID: number;
    progressRequired: number;
    currentProgress: number;
    playerTotalContribution: number;
    duration: number;
    tasks: InitiativeTaskInfo[];
    milestones: InitiativeMilestoneInfo[];
    title: string;
    description: string;
}

interface NeighborhoodPlotMapInfo {
    mapPosition: Vector2DMixin;
    plotDataID: number;
    plotID: number;
    ownerType: Enum.HousingPlotOwnerType;
    plotCost?: number;
    ownerName?: string;
}

interface NeighborhoodRosterMemberInfo {
    playerGUID: string;
    residentName: string;
    residentType: ResidentType;
    isOnline: boolean;
    plotID: number;
    subdivision?: number;
}

interface NeighborhoodRosterMemberUpdateInfo {
    playerGUID: string;
    residentType: ResidentType;
    isOnline: boolean;
}

interface NewCraftingOrderInfo {
    skillLineAbilityID: number;
    orderType: Enum.CraftingOrderType;
    orderDuration: Enum.CraftingOrderDuration;
    tipAmount: number;
    customerNotes: string;
    reagentInfos: RegularReagentInfo[];
    craftingReagentItems: CraftingReagentInfo[];
    minCraftingQualityID?: number;
    orderTarget?: string;
    recraftItem?: string;
}

interface NumberAbbreviationBreakpoint {
    /** Breakpoints should generally be specified as pairs, with one at the named order (1,000) with fractionDivisor = 10, and one a single order higher (eg. 10,000) with fractionDivisor = 1., This ruleset means numbers like '1234' will be abbreviated to '1.2k' and numbers like '12345' to '12k'. */
    breakpoint: number;
    /** Abbreviation name to be looked up as a global string. */
    abbreviation: string;
    /** significandDivisor and fractionDivisor should multiply such that they become equal to a named order of magnitude, such as thousands or  millions. */
    significandDivisor: number;
    fractionDivisor: number;
    /** Defaults to true. Set to false to skip the global string lookup and use the raw abbreviation string when formatting results */
    abbreviationIsGlobal: boolean;
}

interface NumberAbbrevOptions {
    /** Order these from largest to smallest. */
    breakpointData?: NumberAbbreviationBreakpoint[];
    /** Locale controls whether standard asian abbreviation data will be used along with a small change in behavior for large number abbreviation when fractionDivisor is greater than zero. */
    locale?: string;
    /** Provides a cached config object for optimal performance when calling abbreviation functions multiple times with the same options. */
    config?: AbbreviateConfig;
}

interface NumericRuleFormatBreakpoint {
    /** Minimum input value that this rule applies to. */
    threshold: number;
    /** If specified, the input value is rounded to multiples of this step before processing. */
    step?: number;
    /** If specified, the rounding mode to apply to the step. */
    rounding: Enum.NumericRuleFormatRounding;
    /** If specified, clamps the input value to this value if lesser after rounding. */
    min?: number;
    /** If specified, clamps the input value to this value if greater after rounding. */
    max?: number;
    /** The format string to apply at this threshold. If no components are specified, this can include at-most one numeric format specifier - else, should contain an equal number of format specifiers to elements in the components array. */
    format: string;
    /** Vector of component descriptions for this rule. */
    components?: NumericRuleFormatComponent[];
}

interface NumericRuleFormatComponent {
    /** If specified, divide the value by this amount and use the resulting quotient. This is applied before modulo division. */
    div?: number;
    /** If specified, divide the value by this amount and use the resulting remainder. This is applied after quotient division. */
    mod?: number;
    /** If specified, round the value to multiples of this step. This is applied after all division. */
    step?: number;
    /** If specified, rounding mode to apply to the step. */
    rounding: Enum.NumericRuleFormatRounding;
}

interface OngoingEventInfo {
    areaPoiID: number;
    rewardsClaimed: boolean;
    displayInfo: EventDisplayInfo;
}

interface OwnedAuctionInfo {
    auctionID: number;
    itemKey: ItemKey;
    itemLink?: string;
    status: Enum.AuctionStatus;
    quantity: number;
    timeLeftSeconds?: number;
    timeLeft?: Enum.AuctionHouseTimeLeftBand;
    bidAmount?: number;
    buyoutAmount?: number;
    bidder?: string;
}

interface PartyPoseInfo {
    partyPoseID: number;
    mapID: number;
    widgetSetID?: number;
    victoryModelSceneID: number;
    defeatModelSceneID: number;
    victorySoundKitID: number;
    defeatSoundKitID: number;
    uiTextureKit?: string;
    titleText?: string;
    extraButtonText?: string;
    flags: Enum.PartyPoseFlags;
}

interface PerksActivitiesInfo {
    activePerksMonth: number;
    displayMonthName: string;
    secondsRemaining: number;
    activities: PerksActivityInfo[];
    thresholds: PerksActivityThresholdInfo[];
}

interface PerksActivitiesPending {
    pendingIDs: number[];
}

interface PerksActivitiesTracked {
    trackedIDs: number[];
}

interface PerksActivityCondition {
    isMet: boolean;
    text: string;
    uiPriority: number;
}

interface PerksActivityInfo {
    ID: number;
    activityName: string;
    description: string;
    thresholdContributionAmount: number;
    completed: boolean;
    inProgress: boolean;
    tracked: boolean;
    supersedes: number;
    uiPriority: number;
    areAllConditionsMet: boolean;
    conditions: PerksActivityCondition[];
    eventName?: string;
    eventStartTime?: number;
    eventEndTime?: number;
    requirementsList: CriteriaRequirement[];
    criteriaList: CriteriaRequiredValue[];
    tagNames: string[];
}

interface PerksActivityTags {
    tagName: string[];
}

interface PerksActivityThresholdInfo {
    thresholdOrderIndex: number;
    currencyAwardAmount: number;
    requiredContributionAmount: number;
    pendingReward: boolean;
    itemReward?: number;
}

interface PerksProgramItemDisplayInfo {
    overrideModelSceneID?: number;
    creatureDisplayInfoID?: number;
    mainHandItemModifiedAppearanceID?: number;
    offHandItemModifiedAppearanceID?: number;
}

interface PerksProgramPendingChestRewards {
    rewardTypeID: number;
    perksVendorItemID?: number;
    rewardAmount: number;
    monthRewarded?: string;
    activityMonthID: number;
    thresholdOrderIndex: number;
}

interface PerksVendorCategoryInfo {
    ID: number;
    displayName: string;
    defaultUIModelSceneID: number;
}

interface PerksVendorItemInfo {
    name: string;
    perksVendorCategoryID: number;
    description: string;
    timeRemaining: number;
    purchased: boolean;
    refundable: boolean;
    subItemsLoaded: boolean;
    isPurchasePending: boolean;
    doesNotExpire: boolean;
    price: number;
    originalPrice?: number;
    showSaleBanner: boolean;
    perksVendorItemID: number;
    itemID: number;
    iconTexture: string;
    mountID: number;
    mountTypeName: string;
    speciesID: number;
    transmogSetID: number;
    itemModifiedAppearanceID: number;
    subItems: PerksVendorSubItemInfo[];
    uiGroupInfo?: PerksVendorItemUIGroupInfo;
    invType: string;
    quality: Enum.ItemQuality;
}

interface PerksVendorItemUIGroupInfo {
    ID: number;
    name: string;
    priority: number;
}

interface PerksVendorSubItemInfo {
    name: string;
    itemID: number;
    itemModifiedAppearanceID: number;
    invType: string;
    quality: Enum.ItemQuality;
}

interface PetAbilityLevelInfo {
    abilityID: number;
    level: number;
}

interface PetInfo {
    slotID: number;
    icon: number;
    name: string;
    level: number;
    familyName: string;
    specialization: string;
    type: string;
    petAbilities: number[];
    specAbilities: number[];
    displayID: number;
    isFavorite: boolean;
    isExotic: boolean;
    uiModelSceneID: number;
    petNumber: number;
    creatureID: number;
    specID: number;
    loyaltyLevel: number;
    loyaltyName: string;
    happinessLevel: number;
    experience: number;
    experienceNeeded: number;
}

interface PetJournalPetInfo {
    speciesID: number;
    customName?: string;
    petLevel?: number;
    xp?: number;
    maxXP?: number;
    displayID?: number;
    isFavorite?: boolean;
    icon: number;
    petType: number;
    creatureID: number;
    name?: string;
    sourceText: string;
    description: string;
    isWild?: boolean;
    canBattle: boolean;
    tradable: boolean;
    unique: boolean;
    obtainable: boolean;
    canAttachToDecor: boolean;
    creatureModelScale?: number;
}

interface PetSpecInfo {
    specID: number;
    specIndex: number;
    specializationName: string;
}

interface PetTamerMapInfo {
    areaPoiID: number;
    position: Vector2DMixin;
    name: string;
    atlasName?: string;
    textureIndex?: number;
}

interface PingActionCooldownUIInfo {
    durationMs: number;
    remainingMs: number;
}

interface PingActionUIInfo {
    spellID: number;
    itemID: number;
    textureFileDataID: number;
    cooldownInfo?: PingActionCooldownUIInfo;
    spellCategoryID: number;
}

interface PingCooldownInfo {
    startTimeMs: number;
    endTimeMs: number;
}

interface PingMacroInfo {
    type?: Enum.PingSubjectType;
    targetToken?: string;
    spellID?: number;
    itemID?: number;
}

interface PingTypeInfo {
    orderIndex: number;
    type: Enum.PingSubjectType;
    uiTextureKitID: string;
}

interface PlayerAttackPowerInfo {
    mainHandAttackPower: number;
    offHandAttackPower: number;
    rangedAttackPower: number;
    baseAttackPower: number;
    baseRangedAttackPower: number;
}

interface PlayerChoiceInfo {
    objectGUID: string;
    choiceID: number;
    questionText: string;
    pendingChoiceText: string;
    uiTextureKit: string;
    hideWarboardHeader: boolean;
    keepOpenAfterChoice: boolean;
    requiresSelection: boolean;
    hideAnswerArt: boolean;
    playerChoiceLayout: Enum.PlayerChoiceLayout;
    options: PlayerChoiceOptionInfo[];
    soundKitID?: number;
    closeUISoundKitID?: number;
}

interface PlayerChoiceOptionButtonInfo {
    id: number;
    text: string;
    disabled: boolean;
    showCheckmark: boolean;
    hideButtonShowText: boolean;
    selected: boolean;
    confirmation?: string;
    tooltip?: string;
    rewardQuestID?: number;
    soundKitID?: number;
    listText?: string;
}

interface PlayerChoiceOptionInfo {
    id: number;
    description: string;
    header: string;
    choiceArtID: number;
    desaturatedArt: boolean;
    disabledOption: boolean;
    hasRewards: boolean;
    rewardInfo: PlayerChoiceOptionRewardInfo;
    uiTextureKit: string;
    maxStacks: number;
    buttons: PlayerChoiceOptionButtonInfo[];
    widgetSetID?: number;
    spellID?: number;
    rarity?: Enum.PlayerChoiceRarity;
    typeArtID?: number;
    headerIconAtlasElement?: string;
    subHeader?: string;
    consolidateWidgets: boolean;
}

interface PlayerChoiceOptionRewardInfo {
    currencyRewards: PlayerChoiceRewardCurrencyInfo[];
    itemRewards: PlayerChoiceRewardItemInfo[];
    repRewards: PlayerChoiceRewardReputationInfo[];
}

interface PlayerChoiceRewardCurrencyInfo {
    currencyId: number;
    name: string;
    currencyTexture: number;
    quantity: number;
    isCurrencyContainer: boolean;
}

interface PlayerChoiceRewardItemInfo {
    itemId: number;
    name: string;
    quantity: number;
}

interface PlayerChoiceRewardReputationInfo {
    factionId: number;
    quantity: number;
}

interface PlayerCurrencyCategoryInfo {
    categoryName: string;
    currencyTypes: number[];
    childCategories: number[];
}

interface PlayerInfoCharacterData {
    name: string;
    fileName: string;
    alternateFormRaceData?: CharacterAlternateFormData;
    createScreenIconAtlas: string;
    sex: Enum.UnitSex;
}

interface PlaySoundParams {
    soundKitID: number;
    uiSoundSubType: UISoundSubType;
    forceNoDuplicates: boolean;
    runFinishCallback: boolean;
    overridePriority?: number;
    volumeOverride?: number;
}

interface PlaySoundResult {
    success: boolean;
    soundHandle: number;
}

interface PowerTypeChange {
    powerType: Enum.PowerType;
    amount: number;
}

interface PreviewDyeSlotInfo {
    dyeColorID: number;
    dyeSlotID: number;
}

interface PreyHuntProgressWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    progressState: Enum.PreyHuntProgressState;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface PrivateAuraIconInfo {
    iconAnchor: AnchorBinding;
    iconWidth: number;
    iconHeight: number;
    borderScale?: number;
}

interface ProfessionInfo {
    profession?: Enum.Profession;
    professionID: number;
    sourceCounter: number;
    professionName: string;
    expansionName: string;
    skillLevel: number;
    maxSkillLevel: number;
    skillModifier: number;
    isPrimaryProfession: boolean;
    parentProfessionID?: number;
    parentProfessionName?: string;
}

interface ProfTabHighlight {
    description: string;
}

interface ProfTabInfo {
    rootNodeID: number;
    name: string;
    description: string;
    rootIconID: number;
    highlights: ProfTabHighlight[];
}

interface PurchasableBankTabData {
    tabCost: number;
    canAfford: boolean;
    purchasePromptTitle: string;
    purchasePromptBody: string;
    purchasePromptConfirmation: string;
}

interface PvpBrawlInfo {
    brawlID: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    canQueue: boolean;
    minLevel: number;
    maxLevel: number;
    groupsAllowed: boolean;
    crossFactionAllowed: boolean;
    timeLeftUntilNextChange?: number;
    brawlType: Enum.BrawlType;
    mapNames: string[];
    includesAllArenas: boolean;
    minItemLevel: number;
    shouldHideRewardIcon: boolean;
}

interface PVPPersonalRatedInfo {
    personalRating: number;
    bestSeasonRating: number;
    bestWeeklyRating: number;
    seasonPlayed: number;
    seasonWon: number;
    weeklyPlayed: number;
    weeklyWon: number;
    lastWeeksBestRating: number;
    hasWonBracketToday: boolean;
    tier: number;
    ranking?: number;
    roundsSeasonPlayed: number;
    roundsSeasonWon: number;
    roundsWeeklyPlayed: number;
    roundsWeeklyWon: number;
}

interface PVPPostMatchCurrencyReward {
    currencyType: number;
    quantityChanged: number;
}

interface PVPPostMatchItemReward {
    type: string;
    link: string;
    quantity: number;
    specID: number;
    sex: number;
    isUpgraded: boolean;
}

interface PvpRatingInfo {
    bracket: number;
    rating: number;
    activityName: string;
    tier: number;
}

interface PvpReadyCheckInfo {
    roles: PvpRoleQueueInfo[];
    numPlayersAccepted: number;
    numPlayersDeclined: number;
    totalNumPlayers: number;
}

interface PvpRoleQueueInfo {
    role: string;
    totalRole: number;
    totalAccepted: number;
    totalDeclined: number;
}

interface PvpScalingData {
    scalingDataID: number;
    specializationID: number;
    name: string;
    value: number;
}

interface PVPScoreInfo {
    name: string;
    guid: string;
    killingBlows: number;
    honorableKills: number;
    deaths: number;
    honorGained: number;
    faction: number;
    raceName: string;
    gender: number;
    className: string;
    classToken: string;
    damageDone: number;
    healingDone: number;
    rating: number;
    ratingChange: number;
    prematchMMR: number;
    mmrChange: number;
    postmatchMMR: number;
    talentSpec: string;
    honorLevel: number;
    roleAssigned: number;
    stats: PVPStatInfo[];
}

interface PVPStatInfo {
    pvpStatID: number;
    pvpStatValue: number;
    orderIndex: number;
    name: string;
    tooltip: string;
    iconName: string;
}

interface PvpTalentInfo {
    talentID: number;
    name: string;
    icon: number;
    selected: boolean;
    available: boolean;
    spellID: number;
    unlocked: boolean;
    known: boolean;
    grantedByAura: boolean;
    dependenciesUnmet: boolean;
    dependenciesUnmetReason?: string;
}

interface PvpTalentSlotInfo {
    enabled: boolean;
    level: number;
    selectedTalentID?: number;
    availableTalentIDs: number[];
}

interface PVPTeamInfo {
    name: string;
    size: number;
    rating: number;
    ratingNew: number;
    ratingMMR: number;
}

interface PvpTierInfo {
    name: string;
    descendRating: number;
    ascendRating: number;
    descendTier: number;
    ascendTier: number;
    pvpTierEnum: number;
    tierIconID: number;
}

interface QuestInfo {
    title: string;
    questLogIndex: number;
    questID: number;
    campaignID?: number;
    level: number;
    difficultyLevel: number;
    suggestedGroup: number;
    frequency?: Enum.QuestFrequency;
    isHeader: boolean;
    useMinimalHeader: boolean;
    sortAsNormalQuest: boolean;
    isCollapsed: boolean;
    startEvent: boolean;
    isTask: boolean;
    isBounty: boolean;
    isStory: boolean;
    isScaling: boolean;
    isOnMap: boolean;
    hasLocalPOI: boolean;
    isHidden: boolean;
    isAutoComplete: boolean;
    overridesSortOrder: boolean;
    readyForTranslation: boolean;
    isInternalOnly: boolean;
    isAbandonOnDisable: boolean;
    headerSortKey?: number;
    questClassification: Enum.QuestClassification;
}

interface QuestLineInfo {
    questLineName: string;
    questName: string;
    questLineID: number;
    questID: number;
    x: number;
    y: number;
    isHidden: boolean;
    isLegendary: boolean;
    isLocalStory: boolean;
    isDaily: boolean;
    isCampaign: boolean;
    isImportant: boolean;
    isAccountCompleted: boolean;
    isCombatAllyQuest: boolean;
    isMeta: boolean;
    inProgress: boolean;
    isQuestStart: boolean;
    floorLocation: Enum.QuestLineFloorLocation;
    startMapID: number;
}

interface QuestObjectiveInfo {
    text: string;
    type: string;
    finished: boolean;
    numFulfilled: number;
    numRequired: number;
    objectiveType?: QuestObjectiveType;
}

interface QuestPOIMapInfo {
    childDepth?: number;
    questTagType?: Enum.QuestTagType;
    questID: number;
    numObjectives: number;
    mapID: number;
    x: number;
    y: number;
    isQuestStart: boolean;
    isDaily: boolean;
    isCombatAllyQuest: boolean;
    isMeta: boolean;
    inProgress: boolean;
    isMapIndicatorQuest: boolean;
}

interface QuestRequiredCurrencyInfo {
    texture: number;
    name: string;
    currencyID: number;
    quality: number;
    requiredAmount: number;
}

interface QuestRewardCurrencyInfo {
    texture: number;
    name: string;
    currencyID: number;
    quality: number;
    baseRewardAmount: number;
    bonusRewardAmount: number;
    totalRewardAmount: number;
    questRewardContextFlags?: Enum.QuestRewardContextFlags;
}

interface QuestRewardReputationInfo {
    factionID: number;
    rewardAmount: number;
}

interface QuestRewardSpellInfo {
    texture: number;
    name: string;
    garrFollowerID?: number;
    isTradeskill: boolean;
    isSpellLearned: boolean;
    hideSpellLearnText: boolean;
    isBoostSpell: boolean;
    genericUnlock: boolean;
    type: Enum.QuestCompleteSpellType;
}

interface QuestSessionPlayerDetails {
    name: string;
    guid: string;
}

interface QuestTagInfo {
    tagName: string;
    tagID: number;
    worldQuestType?: number;
    quality?: Enum.WorldQuestQuality;
    tradeskillLineID?: number;
    isElite?: boolean;
    displayExpiration?: boolean;
}

interface QuestTheme {
    background: string;
    seal: string;
    signature: string;
    poiIcon: string;
    mapPinInfo?: UIMapPinInfo;
}

interface QuestTimerInfo {
    questID: number;
    questTimer: number;
}

interface QueueSpecificInfo {
    queueType: string;
    lfgIDs?: number[];
    lfgListID?: number;
    activityID?: number;
    battlefieldType?: string;
    listID?: number;
    mapName?: string;
    rated?: boolean;
    isBrawl?: boolean;
    teamSize?: number;
}

interface RaceInfo {
    raceName: string;
    clientFileString: string;
    raceID: number;
}

interface RafAppearanceInfo {
    appearanceID: number;
}

interface RafAppearanceSetInfo {
    setID: number;
    setName: string;
    appearanceIDs: number[];
}

interface RafIllusionInfo {
    spellItemEnchantmentID: number;
}

interface RafInfo {
    versions: RafVersionInfo[];
    recruitmentInfo?: RafRecruitmentinfo;
    recruits: RafRecruit[];
    claimInProgress: boolean;
}

interface RafMonthCount {
    lifetimeMonths: number;
    spentMonths: number;
    availableMonths: number;
}

interface RafMountInfo {
    spellID: number;
    mountID: number;
}

interface RafPetInfo {
    creatureID: number;
    speciesID: number;
    displayID: number;
    speciesName: string;
    description: string;
}

interface RafRecruit {
    bnetAccountID: number;
    wowAccountGUID: string;
    battleTag: string;
    monthsRemaining: number;
    subStatus: Enum.RafRecruitSubStatus;
    acceptanceID: RecruitAcceptanceID;
    versionRecruited: Enum.RecruitAFriendRewardsVersion;
    activities: RafRecruitActivity[];
}

interface RafRecruitActivity {
    activityID: number;
    rewardQuestID: number;
    state: Enum.RafRecruitActivityState;
}

interface RafRecruitmentinfo {
    recruitmentCode: string;
    recruitmentURL: string;
    expireTime: number;
    remainingTimeSeconds: number;
    totalUses: number;
    remainingUses: number;
    sourceRealm: string;
    sourceFaction: string;
}

interface RafReward {
    rewardID: number;
    rafVersion: Enum.RecruitAFriendRewardsVersion;
    itemID: number;
    rewardType: Enum.RafRewardType;
    petInfo?: RafPetInfo;
    mountInfo?: RafMountInfo;
    appearanceInfo?: RafAppearanceInfo;
    titleInfo?: RafTitleInfo;
    appearanceSetInfo?: RafAppearanceSetInfo;
    illusionInfo?: RafIllusionInfo;
    canClaim: boolean;
    claimed: boolean;
    canAfford: boolean;
    repeatable: boolean;
    repeatableClaimCount: number;
    monthsRequired: number;
    monthCost: number;
    availableInMonths: number;
    iconID: number;
}

interface RafSystemInfo {
    maxRecruits: number;
    maxRecruitMonths: number;
    maxRecruitmentUses: number;
    daysInCycle: number;
}

interface RafTitleInfo {
    titleMaskID: number;
}

interface RafVersionInfo {
    rafVersion: Enum.RecruitAFriendRewardsVersion;
    monthCount: RafMonthCount;
    rewards: RafReward[];
    nextReward?: RafReward;
    numAffordableRewards: number;
    numRecruits: number;
}

interface RandomBGInfo {
    canQueue: boolean;
    bgID: number;
    bgIndex: number;
    hasRandomWinToday: boolean;
    minLevel: number;
    maxLevel: number;
    name: string;
}

interface RatedBGBlitzSpecStats {
    weeklyMostPlayedSpecID: number;
    weeklyMostPlayedSpecGames: number;
    seasonMostPlayedSpecID: number;
    seasonMostPlayedSpecGames: number;
}

interface RatedMatchDeserterPenalty {
    personalRatingChange: number;
    queuePenaltySpellID: number;
    queuePenaltyDuration: number;
}

interface RatedSoloShuffleSpecStats {
    weeklyMostPlayedSpecID: number;
    weeklyMostPlayedSpecRounds: number;
    seasonMostPlayedSpecID: number;
    seasonMostPlayedSpecRounds: number;
}

interface RecentAlliesSearchInfo {
    searchText: string;
    isOnline: boolean;
    isDND: boolean;
    isAFK: boolean;
    isOffline: boolean;
    interactionCategoryFilters: Enum.RecentAlliesInteractionCategoryFilter[];
}

interface RecentAllyCharacterData {
    guid: string;
    name: string;
    fullName: string;
    realmName: string;
    level: number;
    classID: number;
    raceID: number;
    sex: Enum.UnitSex;
}

interface RecentAllyData {
    stateData: RecentAllyStateData;
    characterData: RecentAllyCharacterData;
    interactionData: RecentAllyInteractionData;
}

interface RecentAllyInteraction {
    type: Enum.RolodexType;
    description: string;
    timestamp: number;
    contextData: RecentAllyInteractionContextData;
}

interface RecentAllyInteractionContextData {
    itemID?: number;
    locationName?: string;
    activityDifficultyID?: number;
    activityDifficultyLevel?: number;
}

interface RecentAllyInteractionData {
    interactions: RecentAllyInteraction[];
    note?: string;
}

interface RecentAllyStateData {
    isOnline: boolean;
    isDND: boolean;
    isAFK: boolean;
    isConvertedLegacyFriend: boolean;
    pinExpirationDate?: number;
    friendRequestSentThisSession: boolean;
    currentLocation?: string;
}

interface RecruitingClubInfo {
    clubFinderGUID: string;
    numActiveMembers: number;
    name: string;
    comment: string;
    guildLeader: string;
    isGuild: boolean;
    emblemInfo: number;
    tabardInfo?: GuildTabardInfo;
    recruitingSpecIds: number[];
    recruitmentFlags: number;
    localeSet: boolean;
    recruitmentLocale: number;
    minILvl: number;
    cached: number;
    cacheRequested: number;
    lastPosterGUID: string;
    clubId: string;
    lastUpdatedTime: number;
    isCrossFaction: boolean;
    realmName?: string;
}

interface RefundableDecorInfo {
    decorGUID: string;
    timeRemainingSeconds: number;
    name: string;
    price: string;
}

interface RegularReagentInfo {
    reagent: CraftingReagent;
    quantity: number;
}

interface RemixArtifactAppearanceInfo {
    uiCameraID: number;
    altHandUICameraID?: number;
}

interface RemixArtifactArtInfo {
    textureKit: string;
    titleName: string;
    uiModelSceneID: number;
    spellVisualKitID: number;
}

interface RemixArtifactInfo {
    itemID: number;
    altItemID?: number;
    artifactAppearanceID: number;
    appearanceModID: number;
    itemAppearanceID?: number;
    altItemAppearanceID?: number;
    altOnTop: boolean;
}

interface RenownHighlightInfo {
    title: string;
    description: string;
    level: number;
}

interface ReplicateItemInfo {
    name?: string;
    texture?: number;
    count: number;
    qualityID: number;
    usable?: boolean;
    level: number;
    levelType?: string;
    minBid: number;
    minIncrement: number;
    buyoutPrice: number;
    bidAmount: number;
    highBidder?: string;
    bidderFullName?: string;
    owner?: string;
    ownerFullName?: string;
    saleStatus: number;
    itemID: number;
    hasAllInfo?: boolean;
}

interface RoleShortageReward {
    validRoles: string[];
    rewardSpellID: number;
    rewardItemID: number;
}

interface RoomComponentWallpaper {
    name: string;
    roomComponentTextureRecID: number;
}

interface RoomOptionInfo {
    roomName: string;
    roomID: number;
    learned: boolean;
    numOwned: number;
}

interface RuneforgeItemPreviewInfo {
    itemGUID: string;
    itemLevel: number;
    itemName: string;
}

interface RuneforgeLegendaryComponentInfo {
    powerID: number;
    modifiers: number[];
}

interface RuneforgeLegendaryCraftDescription {
    baseItem: ItemLocationMixin;
    runeforgePowerID: number;
    modifiers: number[];
}

interface RuneforgePower {
    runeforgePowerID: number;
    state: Enum.RuneforgePowerState;
    name: string;
    descriptionSpellID: number;
    description: string;
    source?: string;
    iconFileID: number;
    specName?: string;
    matchesSpec: boolean;
    matchesCovenant: boolean;
    covenantID?: number;
    slots: string[];
}

interface ScenarioCriteriaInfo {
    description: string;
    criteriaType: number;
    completed: boolean;
    quantity: number;
    totalQuantity: number;
    flags: number;
    assetID: number;
    criteriaID: number;
    duration: number;
    elapsed: number;
    failed: boolean;
    isWeightedProgress: boolean;
    isFormatted: boolean;
    quantityString: string;
}

interface ScenarioDisplayInfo {
    themeColor?: ColorMixin;
    startSoundKitID?: number;
}

interface ScenarioHeaderCurrenciesAndBackgroundWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    currencies: UIWidgetCurrencyInfo[];
    headerText: string;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ScenarioHeaderDelvesWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    headerText: string;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    tierText: string;
    tierTooltipSpellID?: number;
    currencies: UIWidgetCurrencyInfo[];
    spells: UIWidgetSpellInfo[];
    rewardInfo: UIWidgetRewardInfo;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ScenarioHeaderTimerWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    timerMin: number;
    timerMax: number;
    timerValue: number;
    headerText: string;
    timerTooltip: string;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ScenarioIconInfo {
    x: number;
    y: number;
    atlas: string;
    description: string;
}

interface ScenarioInformation {
    name: string;
    currentStage: number;
    numStages: number;
    flags: number;
    isComplete: boolean;
    xp: number;
    money: number;
    type: number;
    area: string;
    uiTextureKit: string;
    scenarioID: number;
}

interface ScenarioStepInfo {
    title: string;
    description: string;
    numCriteria: number;
    stepFailed: boolean;
    isBonusStep: boolean;
    isForCurrentStepOnly: boolean;
    shouldShowBonusObjective: boolean;
    spells: ScenarioStepSpellInfo[];
    weightedProgress?: number;
    rewardQuestID: number;
    widgetSetID?: number;
    stepID: number;
}

interface ScenarioStepSpellInfo {
    spellID: number;
    name: string;
    icon: number;
}

interface ScheduledEventInfo {
    eventKey: string;
    eventID: number;
    areaPoiID: number;
    startTime: number;
    endTime: number;
    duration: number;
    hasReminder: boolean;
    rewardsClaimed: boolean;
    displayInfo: EventDisplayInfo;
}

interface ScriptBucketThrottleLimits {
    luaScriptBucketThrottleMaxMsPerSecondNormal: number;
    luaScriptBucketThrottleMaxMsPerSecondRestricted: number;
    luaScriptBucketThrottleMaxMsBurstNormal: number;
    luaScriptBucketThrottleMaxMsBurstRestricted: number;
}

interface ScriptedAnimationEffect {
    id: number;
    visual: number;
    visualScale: number;
    duration: number;
    trajectory: Enum.ScriptedAnimationTrajectory;
    yawRadians: number;
    pitchRadians: number;
    rollRadians: number;
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    animation: number;
    animationSpeed: number;
    alpha: number;
    useTargetAsSource: boolean;
    startBehavior?: Enum.ScriptedAnimationBehavior;
    startSoundKitID?: number;
    finishEffectID?: number;
    finishBehavior?: Enum.ScriptedAnimationBehavior;
    finishSoundKitID?: number;
    startAlphaFade?: number;
    startAlphaFadeDuration?: number;
    endAlphaFade?: number;
    endAlphaFadeDuration?: number;
    animationStartOffset?: number;
    loopingSoundKitID?: number;
    particleOverrideScale?: number;
}

interface ScriptObject {
}

interface SeasonTimeInfo {
    bestTime: number;
    lastTime: number;
    medal: number;
}

interface SecureCopyOptions {
    /** Maximum table nesting depth allowed during recursive copying. */
    maxTraversalDepth: number;
    /** Wrap function values in secure closures that call through using the original function taint. */
    wrapUntrustedFunctions: boolean;
    /** If true, preserve references to script objects in the copied output. By default, script objects will raise an error. */
    permitScriptObjects: boolean;
}

interface SecureDelegateOptions {
    /** Wrap function arguments in secure closures that call through using the original function taint. */
    wrapUntrustedFunctions: boolean;
}

interface SelfResurrectOption {
    name: string;
    optionType: Enum.SelfResurrectOptionType;
    id: number;
    canUse: boolean;
    isLimited: boolean;
    priority: number;
}

interface SendChatMessageParams {
    message: string;
    /** Chat type string ('SAY', 'EMOTE', etc.). Defaults to 'SAY' if not specified. */
    chatType?: string;
    /** Language to send the message in. */
    languageID?: number;
    /** Name of the player to send a message to. Only applies to chat types that support targeted messages. */
    target?: string;
}

interface SendPingResult {
    type?: Enum.PingSubjectType;
    result: Enum.PingResult;
}

interface SendWhoFilters {
    classIDs: number[];
    raceIDs: number[];
    uiMapIDs: number[];
}

interface SkillLineAttributes {
    skillID: number;
    name: string;
    isHeader: boolean;
    isCollapsed: boolean;
    rank: number;
    tempPoints: number;
    modifier: number;
    maxRank: number;
    isAbandonable: boolean;
    stepCost: number;
    rankCost: number;
    minLevel: number;
    costType: number;
    parentSkillLineID: number;
    skillLineCategoryID: number;
    description: string;
}

interface SocialQueueConfig {
    TOASTS_DISABLED: boolean;
    TOAST_DURATION: number;
    DELAY_DURATION: number;
    QUEUE_MULTIPLIER: number;
    PLAYER_MULTIPLIER: number;
    PLAYER_FRIEND_VALUE: number;
    PLAYER_GUILD_VALUE: number;
    THROTTLE_INITIAL_THRESHOLD: number;
    THROTTLE_DECAY_TIME: number;
    THROTTLE_PRIORITY_SPIKE: number;
    THROTTLE_MIN_THRESHOLD: number;
    THROTTLE_PVP_PRIORITY_NORMAL: number;
    THROTTLE_PVP_PRIORITY_LOW: number;
    THROTTLE_PVP_HONOR_THRESHOLD: number;
    THROTTLE_LFGLIST_PRIORITY_DEFAULT: number;
    THROTTLE_LFGLIST_PRIORITY_ABOVE: number;
    THROTTLE_LFGLIST_PRIORITY_BELOW: number;
    THROTTLE_LFGLIST_ILVL_SCALING_ABOVE: number;
    THROTTLE_LFGLIST_ILVL_SCALING_BELOW: number;
    THROTTLE_RF_PRIORITY_ABOVE: number;
    THROTTLE_RF_ILVL_SCALING_ABOVE: number;
    THROTTLE_DF_MAX_ITEM_LEVEL: number;
    THROTTLE_DF_BEST_PRIORITY: number;
}

interface SocialQueueGroupInfo {
    canJoin: boolean;
    numQueues: number;
    needTank: boolean;
    needHealer: boolean;
    needDamage: boolean;
    isSoloQueueParty: boolean;
    questSessionActive: boolean;
    leaderGUID: string;
}

interface SocialQueueGroupQueueInfo {
    clientID: number;
    eligible: boolean;
    needTank: boolean;
    needHealer: boolean;
    needDamage: boolean;
    isAutoAccept: boolean;
    queueData: QueueSpecificInfo;
}

interface SocialQueuePlayerInfo {
    guid: string;
    clubId?: string;
}

interface SocketInfo {
    name?: string;
    icon?: number;
    gemMatchesSocket: boolean;
}

interface SocketItemInfo {
    name?: string;
    icon?: number;
    quality: Enum.ItemQuality;
}

interface SoulbindConduitData {
    conduitID: number;
    conduitRank: number;
}

interface SoulbindData {
    ID: number;
    covenantID: number;
    name: string;
    description: string;
    textureKit: string;
    unlocked: boolean;
    cvarIndex: number;
    tree: SoulbindTree;
    modelSceneData: SoulbindModelSceneData;
    activationSoundKitID: number;
    playerConditionReason?: string;
}

interface SoulbindModelSceneData {
    creatureDisplayInfoID: number;
    modelSceneActorID: number;
}

interface SoulbindNode {
    ID: number;
    row: number;
    column: number;
    icon: number;
    spellID: number;
    playerConditionReason?: string;
    conduitID: number;
    conduitRank: number;
    state: Enum.SoulbindNodeState;
    conduitType?: Enum.SoulbindConduitType;
    parentNodeIDs: number[];
    failureRenownRequirement?: number;
    socketEnhanced?: boolean;
}

interface SoulbindTree {
    editable: boolean;
    nodes: SoulbindNode[];
}

interface SpacerVisualizationInfo {
    shownState: Enum.WidgetShownState;
    widgetWidth: number;
    widgetHeight: number;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface SpecializationCurrencyInfo {
    numAvailable: number;
    currencyName: string;
}

interface SpecializationInfoOutput {
    specId: number;
    name?: string;
    description?: string;
    icon?: number;
    role?: string;
    primaryStat?: number;
    pointsSpent: number;
    background?: string;
    previewPointsSpent: number;
    isUnlocked: boolean;
}

interface SpecializationInfoQuery {
    specializationIndex: number;
    isInspect: boolean;
    isPet: boolean;
    inspectTarget?: string;
    sex?: number;
    groupIndex?: number;
    classID?: number;
}

interface SpecializationInfoResult {
    id: number;
    name: string;
    description: string;
    icon: number;
    role: string;
    recommended: boolean;
    allowedForBoost: boolean;
    masterySpell1?: number;
    masterySpell2?: number;
}

interface SpecializationTabInfo {
    enabled: boolean;
    errorReason: string;
}

interface SpecPerkInfo {
    perkID: number;
    isMajorPerk: boolean;
}

interface SpellBookItemInfo {
    /** Represents a base spellID for spells, flyoutID for flyouts, or petActionID for pet actions */
    actionID: number;
    /** May be nil if item is not a spell; Will be the overriding spellID if spell is overriden, otherwise will match actionID */
    spellID?: number;
    itemType: Enum.SpellBookItemType;
    name: string;
    /** May be empty if flyout, or if spell's data isn't loaded yet; Listen for SPELL_TEXT_UPDATE event, or use SpellMixin to load asynchronously */
    subName: string;
    iconID: number;
    /** True if the item is a passive spell; Will always be false if it is not a spell */
    isPassive: boolean;
    /** True if the item belongs to a non-active specialization */
    isOffSpec: boolean;
    /** Index of the SkillLine this SpellBookItem is part of; Nil this SpellBookItem isn't part of a SkillLine */
    skillLineIndex?: number;
}

interface SpellBookSkillLineInfo {
    name: string;
    iconID: number;
    /** This value + 1 is the first Spell Book Item slotIndex within this skill line */
    itemIndexOffset: number;
    numSpellBookItems: number;
    isGuild: boolean;
    shouldHide: boolean;
    /** Will be nil if this skill line is not associated with a specialization */
    specID?: number;
    /** Will be nil if this skill line is not associated with a non-active specialization */
    offSpecID?: number;
}

interface SpellChargeInfo {
    /** Number of charges currently available */
    currentCharges: number;
    /** Max number of charges that can be accumulated */
    maxCharges: number;
    /** If charge cooldown is active, time at which the most recent charge cooldown began; 0 if cooldown is not active */
    cooldownStartTime: number;
    /** Cooldown duration in seconds required to generate a charge */
    cooldownDuration: number;
    /** Rate at which cooldown UI should update */
    chargeModRate: number;
    /** False if recharging is not active (ex: at maximum available charges, start time or duration are zero); True otherwise */
    isActive: boolean;
}

interface SpellCooldownInfo {
    /** If cooldown is active, time started; 0 if no cooldown; Current time if isEnabled is false */
    startTime: number;
    /** Cooldown duration in seconds if active; 0 if cooldown is inactive */
    duration: number;
    /** False if cooldown is on hold (ex: some cooldowns only start after an active spell is cancelled); True otherwise */
    isEnabled: boolean;
    /** False if cooldown is not active (ex: not enabled, or startTime or duration are 0); True otherwise */
    isActive: boolean;
    /** Rate at which cooldown UI should update */
    modRate: number;
    /** Indicates which category is responsible for determining the duration. A nil value indicates the duration was determined through some other logic, e.g. the spell is on hold. */
    activeCategory?: number;
    /** When this is set it indicates that the spell is in recovery and this is how long it will be until that recovery period is finished */
    timeUntilEndOfStartRecovery?: number;
    /** Whether or not this spell is considered to be on the global cooldown, do not trust this field unless responding to a SPELL_UPDATE_COOLDOWN event */
    isOnGCD?: boolean;
}

interface SpellDiminishCategoryInfo {
    category: Enum.SpellDiminishCategory;
    name: string;
    icon?: number;
}

interface SpellDiminishTrackerInfo {
    category: Enum.SpellDiminishCategory;
    startTime: number;
    duration: number;
    showCountdown: boolean;
    isImmune: boolean;
}

interface SpellDisplayVisualizationInfo {
    spellInfo: UIWidgetSpellInfo;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface SpellInfo {
    name: string;
    /** Icon for this spell; If spell has been overriden, this may be the icon for the overriding spell; See originalIconID for spell's non-overriden icon */
    iconID: number;
    originalIconID: number;
    castTime: number;
    minRange: number;
    maxRange: number;
    spellID: number;
}

interface SpellLossOfControlInfo {
    /** If cooldown is active, time started; 0 if no cooldown */
    startTime: number;
    /** Cooldown duration in seconds if active; 0 if cooldown is inactive */
    duration: number;
    /** Rate at which cooldown UI should update */
    modRate: number;
    /** False if cooldown is not active (startTime or duration are 0); True otherwise */
    isActive: boolean;
    /** True if this cooldown should be displayed in-place of the normal action cooldown (ex: the LoC cooldown expires later than the normal cooldown); False otherwise */
    shouldReplaceNormalCooldown: boolean;
}

interface SpellPowerCostInfo {
    type: Enum.PowerType;
    /** The name or 'power token' for this power type (ex: MANA, FOCUS, etc) */
    name: string;
    /** Full cost including optional cost; Optional cost is cost the spell will use but isn't required (ex: Rogue spell might cost 1CP but have optional cost of up to 5 more) */
    cost: number;
    /** Cost excluding optional cost; This is min required to cast the spell */
    minCost: number;
    /** Cost as a percentage of base maximum resource; May be 0 if the cost is simply a flat cost */
    costPercent: number;
    /** Cost as a percentage of base maximum resource consumed per second, used by channel spells; May be 0 if cost is simply a flat cost */
    costPerSec: number;
    /** An aura the caster must have for the cost to apply; Usually based on things like active spec or shapeshift form */
    requiredAuraID: number;
    /** True if there is a requiredAuraID and the caster currently has that aura; Caster is either the current player or their pet, depending on spell type */
    hasRequiredAura: boolean;
}

interface SplashScreenInfo {
    textureKit: string;
    minDisplayCharLevel: number;
    minQuestDisplayLevel: number;
    soundKitID: number;
    allianceQuestID?: number;
    hordeQuestID?: number;
    header: string;
    topLeftFeatureTitle: string;
    topLeftFeatureDesc: string;
    bottomLeftFeatureTitle: string;
    bottomLeftFeatureDesc: string;
    rightFeatureTitle: string;
    rightFeatureDesc: string;
    shouldShowQuest: boolean;
    screenType: Enum.SplashScreenType;
    gameMenuRequest: boolean;
}

interface StackedResourceTrackerWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    resources: UIWidgetCurrencyInfo[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface StatusBarWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    barMin: number;
    barMax: number;
    barValue: number;
    text: string;
    tooltip: string;
    barValueTextType: Enum.StatusBarValueTextType;
    overrideBarText: string;
    overrideBarTextShownType: Enum.StatusBarOverrideBarTextShownType;
    colorTint: Enum.StatusBarColorTintValue;
    partitionValues: number[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    fillMotionType: Enum.UIWidgetMotionType;
    barTextEnabledState: Enum.WidgetEnabledState;
    barTextFontType: Enum.UIWidgetFontType;
    barTextSizeType: Enum.UIWidgetTextSizeType;
    textEnabledState: Enum.WidgetEnabledState;
    textFontType: Enum.UIWidgetFontType;
    textSizeType: Enum.UIWidgetTextSizeType;
    glowAnimType: Enum.WidgetGlowAnimType;
    showGlowState: Enum.WidgetShowGlowState;
    fillMinOpacity: Enum.WidgetOpacityType;
    fillMaxOpacity: Enum.WidgetOpacityType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface StripHyperlinkOptions {
    /** If true, preserve all '|c' and '|r' quoted code sequences. */
    maintainColor: boolean;
    /** If true, preserve all '[' and ']' characters. */
    maintainBrackets: boolean;
    /** If true, remove all '|n' quoted code sequences. */
    stripNewlines: boolean;
    /** If true, preserve all balanced '|A' and '|a' quoted code sequences. */
    maintainAtlases: boolean;
    /** If true, preserve all balanced '|T' and '|t' quoted code sequences. */
    maintainTextures: boolean;
}

interface TalentInfoQuery {
    groupIndex?: number;
    isInspect: boolean;
    tier?: number;
    column?: number;
    target?: UnitToken;
    specializationIndex?: number;
    talentIndex?: number;
    isPet: boolean;
}

interface TalentInfoResult {
    talentID: number;
    name: string;
    icon: number;
    tier: number;
    column: number;
    selected: boolean;
    available: boolean;
    spellID: number;
    isPVPTalentUnlocked: boolean;
    known: boolean;
    grantedByAura: boolean;
    rank: number;
    maxRank: number;
    meetsPrereq: boolean;
    previewRank: number;
    meetsPreviewPrereq: boolean;
    isExceptional: boolean;
    hasGoldBorder: boolean;
}

interface TaxiNodeInfo {
    nodeID: number;
    position: Vector2DMixin;
    name: string;
    state: Enum.FlightPathState;
    slotIndex: number;
    textureKit: string;
    useSpecialIcon: boolean;
    specialIconCostString?: string;
    isMapLayerTransition: boolean;
}

interface TeamPlayerRequestedCooldownInfo {
    teamIndex: number;
    playerIndex: number;
    cooldownsRequested: number;
}

interface TemporaryItemEnchantInfo {
    enchantID: number;
    remainingTimeMs: number;
    chargesRemaining: number;
    hasExpirationTime: boolean;
}

interface TextColumnRowEntryInfo {
    text: string;
    enabledState: Enum.WidgetEnabledState;
    hAlign: Enum.WidgetTextHorizontalAlignmentType;
    columnWidth: number;
}

interface TextColumnRowVisualizationInfo {
    shownState: Enum.WidgetShownState;
    entries: TextColumnRowEntryInfo[];
    textSizeType: Enum.UIWidgetTextSizeType;
    fontType: Enum.UIWidgetFontType;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    bottomPadding: number;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface TextureAndTextEntryInfo {
    text: string;
    tooltip: string;
}

interface TextureAndTextRowVisualizationInfo {
    shownState: Enum.WidgetShownState;
    entries: TextureAndTextEntryInfo[];
    textSizeType: Enum.UIWidgetTextureAndTextSizeType;
    groupAlignment: Enum.UIWidgetHorizontalDirection;
    fixedWidth?: number;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface TextureAndTextVisualizationInfo {
    shownState: Enum.WidgetShownState;
    text: string;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    textSizeType: Enum.UIWidgetTextureAndTextSizeType;
    textFormatType: Enum.UIWidgetTextFormatType;
    updateAnimType: Enum.UIWidgetUpdateAnimType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface TextureWithAnimationVisualizationInfo {
    shownState: Enum.WidgetShownState;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface TextWithStateWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    enabledState: Enum.WidgetEnabledState;
    text: string;
    tooltip: string;
    textSizeType: Enum.UIWidgetTextSizeType;
    fontType: Enum.UIWidgetFontType;
    bottomPadding: number;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    hAlign: Enum.WidgetTextHorizontalAlignmentType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface TextWithSubtextWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    enabledState: Enum.WidgetEnabledState;
    text: string;
    widgetWidth: number;
    tooltip: string;
    textSizeType: Enum.UIWidgetTextSizeType;
    fontType: Enum.UIWidgetFontType;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    hAlign: Enum.WidgetTextHorizontalAlignmentType;
    subText: string;
    subTextSizeType: Enum.UIWidgetTextSizeType;
    subTextFontType: Enum.UIWidgetFontType;
    subTextHAlign: Enum.WidgetTextHorizontalAlignmentType;
    subTextEnabledState: Enum.WidgetEnabledState;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
    spacing: number;
}

interface TieredEntranceRewardInfo {
    id: number;
    quantity: number;
    rewardType: Enum.TieredEntranceRewardType;
    context: ItemCreationContext;
}

interface TieredEntranceTierInfo {
    tier: number;
    suggestedILvl: number;
    overrideTooltipSpellID: number;
    unlocked: boolean;
    tierDescription: string;
    rewards: TieredEntranceRewardInfo[];
    modifierUIWidgetSetID: number;
    lockedReason?: string;
    queueAsLFG: boolean;
    difficultyID: number;
}

/** Structure associating a key with a scheduled time. */
interface TimedSignalMapEntry {
    /** The key that has been scheduled. */
    key: number;
    /** Absolute time, on the same clock as GetTime(), at which the key is scheduled to signal. */
    time: number;
}

interface TooltipComparisonLine {
    text: string;
    color: ColorMixin;
}

interface TooltipDataArg {
    field: string;
    stringVal?: string;
    intVal?: number;
    floatVal?: number;
    boolVal?: boolean;
    colorVal?: ColorMixin;
    guidVal?: string;
}

interface TooltipItemComparisonInfo {
    method: Enum.TooltipComparisonMethod;
    item: TooltipComparisonItem;
    additionalItems: TooltipComparisonItem[];
}

interface TotemInfoScript {
    haveTotem: boolean;
    totemName: string;
    startTime: number;
    duration: number;
    icon: number;
    modRate: number;
    spellID: number;
}

interface TradeSkillRecipeInfo {
    categoryID: number;
    name: string;
    relativeDifficulty?: Enum.TradeskillRelativeDifficulty;
    maxTrivialLevel: number;
    itemLevel: number;
    alternateVerb?: string;
    numSkillUps: number;
    canSkillUp: boolean;
    firstCraft: boolean;
    sourceType?: number;
    learned: boolean;
    disabled: boolean;
    favorite: boolean;
    supportsQualities: boolean;
    craftable: boolean;
    disabledReason?: string;
    recipeID: number;
    skillLineAbilityID: number;
    previousRecipeID?: number;
    nextRecipeID?: number;
    icon?: number;
    hyperlink?: string;
    currentRecipeExperience?: number;
    nextLevelRecipeExperience?: number;
    unlockedRecipeLevel?: number;
    earnedExperience?: number;
    supportsCraftingStats: boolean;
    hasSingleItemOutput: boolean;
    qualityItemIDs?: number[];
    qualityIlvlBonuses?: number[];
    alwaysUsesLowestQuality: boolean;
    maxQuality?: number;
    qualityIDs?: number[];
    canCreateMultiple: boolean;
    abilityVerb?: string;
    abilityAllVerb?: string;
    isRecraft: boolean;
    isDummyRecipe: boolean;
    isGatheringRecipe: boolean;
    isEnchantingRecipe: boolean;
    isSalvageRecipe: boolean;
}

interface TraitCondInfo {
    condID: number;
    ranksGranted?: number;
    isAlwaysMet: boolean;
    /** True if the source for the condition has been fulfilled. */
    isMet: boolean;
    isGate: boolean;
    /** True if meeting the requirements for the condition means any nodes using this condition are considered fulfilled if the condition is met. */
    isSufficient: boolean;
    /** The value from the TraitConditionType enum the condition uses. */
    type: number;
    questID?: number;
    achievementID?: number;
    specSetID?: number;
    playerLevel?: number;
    traitCurrencyID?: number;
    spentAmountRequired?: number;
    tooltipFormat?: string;
    traitCondAccountElementID?: number;
}

interface TraitConfigInfo {
    ID: number;
    type: Enum.TraitConfigType;
    name: string;
    treeIDs: number[];
    usesSharedActionBars: boolean;
}

interface TraitCurrencyCost {
    ID: number;
    amount: number;
}

interface TraitDefinitionInfo {
    spellID?: number;
    overrideName?: string;
    overrideSubtext?: string;
    overrideDescription?: string;
    overrideIcon?: number;
    overriddenSpellID?: number;
    subType?: Enum.TraitDefinitionSubType;
}

interface TraitEntryInfo {
    /** Nil on SubTreeSelection Node Entries */
    definitionID?: number;
    /** Populated only on SubTreeSelection Node Entries; This is the SubTree that is activated if this Entry is chosen */
    subTreeID?: number;
    type: Enum.TraitNodeEntryType;
    maxRanks: number;
    isAvailable: boolean;
    /** True if this entry fails the TRAIT_CONDITION_TYPE_DISPLAY_ERROR condition check. Used to communicate a problem with the node to the player (e.g. A prerequisite node has not been purchased.) but will not prevent the player from spending points on the node. */
    isDisplayError: boolean;
    conditionIDs: number[];
}

interface TraitEntryRankInfo {
    entryID: number;
    rank: number;
}

interface TraitGateInfo {
    topLeftNodeID: number;
    conditionID: number;
}

interface TraitGroupDisplayInfo {
    groupID: number;
    treeID: number;
    skillLineID: number;
    orderIndex: number;
    displayName: string;
    icon: number;
}

interface TraitNodeInfo {
    ID: number;
    posX: number;
    posY: number;
    flags: number;
    entryIDs: number[];
    entryIDsWithCommittedRanks: number[];
    canPurchaseRank: boolean;
    canRefundRank: boolean;
    isAvailable: boolean;
    isVisible: boolean;
    /** True if this node fails the TRAIT_CONDITION_TYPE_DISPLAY_ERROR condition check. Used to communicate a problem with the node to the player (e.g. A prerequisite node has not been purchased.) but will not prevent the player from spending points on the node. */
    isDisplayError: boolean;
    ranksPurchased: number;
    ranksIncreased: number;
    /** A map of the entry IDs on this node to the number of ranks increased. This covers all entries on the node, which is important in the case of selection nodes where we have more than one option that could be increased. */
    entryIDToRanksIncreased: any;
    activeRank: number;
    currentRank: number;
    activeEntry?: TraitEntryRankInfo;
    nextEntry?: TraitEntryRankInfo;
    maxRanks: number;
    totalMaxRanks: number;
    type: Enum.TraitNodeType;
    visibleEdges: TraitOutEdgeInfo[];
    meetsEdgeRequirements: boolean;
    groupIDs: number[];
    conditionIDs: number[];
    isCascadeRepurchasable: boolean;
    cascadeRepurchaseEntryID?: number;
    /** The SubTree this Node belongs to; Nil if it is not part of a SubTree */
    subTreeID?: number;
    /** True if this node has a SubTreeID, and the SubTree is chosen or staged; May be nil if not part of a SubTree at all */
    subTreeActive?: boolean;
}

interface TraitNodeInfoPartial {
    canPurchaseRank?: boolean;
    canRefundRank?: boolean;
    isAvailable?: boolean;
    isVisible?: boolean;
    ranksPurchased?: number;
    activeRank?: number;
    currentRank?: number;
    meetsEdgeRequirements?: boolean;
    isCascadeRepurchasable?: boolean;
    activeEntryID?: number;
    subTreeActive?: boolean;
}

interface TraitOutEdgeInfo {
    targetNode: number;
    type: number;
    visualStyle: number;
    isActive: boolean;
}

interface TraitSubTreeInfo {
    ID: number;
    name?: string;
    description?: string;
    iconElementID?: string;
    traitCurrencyID?: number;
    isActive: boolean;
    /** SubTreeSelectionNodes whose choice entries include this SubTree */
    subTreeSelectionNodeIDs: number[];
    /** Center X node position calculated from the posX values of all of this subTree's nodes */
    posX: number;
    /** Topmost Y node position taken from the posY values of all of this subTree's nodes */
    posY: number;
}

interface TraitTreeInfo {
    ID: number;
    gates: TraitGateInfo[];
    hideSingleRankNumbers: boolean;
    cannotRefund: boolean;
    rootNodeID?: number;
    uiTextureKit: string;
    titleText?: string;
}

interface TransmogAppearanceInfoBySourceData {
    appearanceID: number;
    appearanceIsCollected: boolean;
    sourceIsCollected: boolean;
    sourceIsCollectedPermanent: boolean;
    sourceIsCollectedConditional: boolean;
    meetsTransmogPlayerCondition: boolean;
    appearanceHasAnyNonLevelRequirements: boolean;
    appearanceMeetsNonLevelRequirements: boolean;
    appearanceIsUsable: boolean;
    appearanceNumSources: number;
    sourceIsKnown: boolean;
    canDisplayOnPlayer: boolean;
    isAnySourceValidForPlayer: boolean;
}

interface TransmogAppearanceJournalEncounterInfo {
    instance: string;
    instanceType: number;
    tiers: string[];
    encounter: string;
    difficulties: string[];
}

interface TransmogAppearanceSourceInfoData {
    category: Enum.TransmogCollectionType;
    itemAppearanceID: number;
    canHaveIllusion: boolean;
    icon: number;
    isCollected: boolean;
    itemLink: string;
    transmoglink: string;
    sourceType?: number;
    itemSubclass: number;
    ignoreModelAttachmentChecksForIllusion: boolean;
}

interface TransmogApplyWarningInfo {
    itemLink: string;
    text: string;
}

interface TransmogCategoryAppearanceInfo {
    visualID: number;
    isCollected: boolean;
    isFavorite: boolean;
    isHideVisual: boolean;
    canDisplayOnPlayer: boolean;
    uiOrder: number;
    exclusions: number;
    isUsable: boolean;
    hasRequiredHoliday: boolean;
    hasActiveRequiredHoliday: boolean;
    minIlvl: number;
    isValidForEquippedItem: boolean;
    /** For internal testing only */
    alwaysShowItem?: boolean;
}

interface TransmogCategoryInfo {
    name: string;
    isWeapon: boolean;
    canHaveIllusions: boolean;
    canMainHand: boolean;
    canOffHand: boolean;
    canRanged: boolean;
}

interface TransmogCustomSetInfo {
    name: string;
    icon: number;
}

interface TransmogIllusionInfo {
    visualID: number;
    sourceID: number;
    icon: number;
    isCollected: boolean;
    isUsable: boolean;
    isHideVisual: boolean;
}

interface TransmogOutfitCollectionInfo {
    name: string;
    isWeapon: boolean;
    canHaveIllusions: boolean;
}

interface TransmogOutfitEntryInfo {
    outfitID: number;
    name: string;
    situationCategories: string[];
    icon: number;
    isEventOutfit: boolean;
    isDisabled: boolean;
    playerFacingOutfitIndex: number;
}

interface TransmogOutfitLinkedSlotInfo {
    primarySlotInfo: TransmogOutfitSlotInfo;
    secondarySlotInfo: TransmogOutfitSlotInfo;
}

interface TransmogOutfitOptionInfo {
    type: Enum.TransmogOutfitSlotOption;
    name: string;
    enabled: boolean;
}

interface TransmogOutfitOptionSheatheCategoryInfo {
    sheatheCategory: Enum.TransmogOutfitSlotOptionSheatheCategory;
    categoryName: string;
}

interface TransmogOutfitSlotGroup {
    position: Enum.TransmogOutfitSlotPosition;
    appearanceSlotInfo: TransmogOutfitSlotInfo[];
    illusionSlotInfo: TransmogOutfitSlotInfo[];
}

interface TransmogOutfitSlotInfo {
    slot: Enum.TransmogOutfitSlot;
    type: Enum.TransmogType;
    collectionType: Enum.TransmogCollectionType;
    slotName: string;
    isSecondary: boolean;
}

interface TransmogSetInfo {
    setID: number;
    name: string;
    baseSetID?: number;
    description?: string;
    label?: string;
    expansionID: number;
    patchID: number;
    uiOrder: number;
    classMask: number;
    hiddenUntilCollected: boolean;
    requiredFaction?: string;
    collected: boolean;
    favorite: boolean;
    limitedTimeSet: boolean;
    validForCharacter: boolean;
    grantAsPrecedingVariant: boolean;
}

interface TransmogSetItemInfo {
    itemID: number;
    itemModifiedAppearanceID: number;
    invSlot: number;
    invType: string;
}

interface TransmogSetPrimaryAppearanceInfo {
    appearanceID: number;
    collected: boolean;
}

interface TransmogSituationCategory {
    triggerID: number;
    name: string;
    description: string;
    isRadioButton: boolean;
    groupData: TransmogSituationGroup[];
}

interface TransmogSituationGroup {
    groupID: number;
    secondaryID: number;
    optionData: TransmogSituationOptionData[];
}

interface TransmogSituationOption {
    situationID: number;
    specID: number;
    loadoutID: number;
    equipmentSetID: number;
}

interface TransmogSituationOptionData {
    name: string;
    value: boolean;
    option: TransmogSituationOption;
}

interface TransmogSlotInfo {
    isTransmogrified: boolean;
    hasPending: boolean;
    isPendingCollected: boolean;
    canTransmogrify: boolean;
    cannotTransmogrifyReason: number;
    hasUndo: boolean;
    isHideVisual: boolean;
    texture?: number;
}

interface TransmogSlotVisualInfo {
    baseSourceID: number;
    baseVisualID: number;
    appliedSourceID: number;
    appliedVisualID: number;
    pendingSourceID: number;
    pendingVisualID: number;
    hasUndo: boolean;
    isHideVisual: boolean;
    itemSubclass: number;
}

interface TreeCurrencyInfo {
    traitCurrencyID: number;
    quantity: number;
    maxQuantity?: number;
    spent: number;
    spentInTree?: number;
}

interface TugOfWarWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    minValue: number;
    maxValue: number;
    currentValue: number;
    neutralZoneCenter: number;
    neutralZoneSize: number;
    leftIconInfo: UIWidgetIconInfo;
    rightIconInfo: UIWidgetIconInfo;
    glowAnimType: Enum.WidgetGlowAnimType;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    neutralFillStyle: Enum.TugOfWarStyleValue;
    markerArrowShownState: Enum.TugOfWarMarkerArrowShownState;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface uiBoundsRect {
    left: number;
    bottom: number;
    width: number;
    height: number;
}

interface UIButtonInfo {
    normal: string;
    pressed: string;
    highlight: string;
    icon: string;
    useNormalAsHiglight: boolean;
}

interface UICinematic {
    expansion: number;
    movieIDs: number[];
    buttonUpAtlas: string;
    buttonDownAtlas: string;
    title?: string;
    disableAutoPlay: boolean;
    orderID: number;
}

interface UiMapDetails {
    mapID: number;
    name: string;
    mapType: Enum.UIMapType;
    parentMapID: number;
    flags: Enum.UIMapFlag;
}

interface UiMapExplorationHitRect {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface UiMapExplorationInfo {
    textureWidth: number;
    textureHeight: number;
    offsetX: number;
    offsetY: number;
    isShownByMouseOver: boolean;
    isDrawOnTopLayer: boolean;
    fileDataIDs: number[];
    hitRect: UiMapExplorationHitRect;
}

interface UiMapGroupMemberInfo {
    mapID: number;
    relativeHeightIndex: number;
    name: string;
}

interface UiMapHighlightInfo {
    fileDataID: number;
    atlasID: string;
    texturePercentageX: number;
    texturePercentageY: number;
    textureX: number;
    textureY: number;
    scrollChildX: number;
    scrollChildY: number;
}

interface UiMapLayerInfo {
    layerWidth: number;
    layerHeight: number;
    tileWidth: number;
    tileHeight: number;
    minScale: number;
    maxScale: number;
    additionalZoomSteps: number;
}

interface UIMapPinInfo {
    button: UIButtonInfo;
    buttonSelected: UIButtonInfo;
    underlay: string;
    outerGlow: string;
}

interface UIModelSceneActorDisplayInfo {
    animation: number;
    animationVariation: number;
    animSpeed: number;
    animationKitID?: number;
    spellVisualKitID?: number;
    alpha: number;
    scale: number;
}

interface UIModelSceneActorInfo {
    modelActorID: number;
    scriptTag: string;
    position: Vector3DMixin;
    yaw: number;
    pitch: number;
    roll: number;
    normalizeScaleAggressiveness?: number;
    useCenterForOriginX: boolean;
    useCenterForOriginY: boolean;
    useCenterForOriginZ: boolean;
    modelActorDisplayID?: number;
}

interface UIModelSceneCameraInfo {
    modelSceneCameraID: number;
    scriptTag: string;
    cameraType: string;
    target: Vector3DMixin;
    yaw: number;
    pitch: number;
    roll: number;
    zoomDistance: number;
    minZoomDistance: number;
    maxZoomDistance: number;
    zoomedTargetOffset: Vector3DMixin;
    zoomedYawOffset: number;
    zoomedPitchOffset: number;
    zoomedRollOffset: number;
    flags: Enum.ModelSceneSetting;
}

interface UITextureSliceData {
    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    sliceMode: Enum.UITextureSliceMode;
}

interface UITextureSliceMargins {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

interface UIWidgetCurrencyInfo {
    iconFileID: number;
    leadingText: string;
    text: string;
    tooltip: string;
    isCurrencyMaxed: boolean;
    textFontType: Enum.UIWidgetFontType;
    textSizeType: Enum.UIWidgetTextSizeType;
    textEnabledState: Enum.WidgetEnabledState;
    iconSizeType: Enum.WidgetIconSizeType;
    updateAnimType: Enum.UIWidgetUpdateAnimType;
}

interface UIWidgetIconInfo {
    sourceType: Enum.WidgetIconSourceType;
    sourceID: number;
    sizeType: Enum.WidgetIconSizeType;
    tooltip: string;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
}

interface UIWidgetInfo {
    widgetID: number;
    widgetSetID: number;
    widgetType: Enum.UIWidgetVisualizationType;
    unitToken?: string;
}

interface UIWidgetItemInfo {
    itemID: number;
    stackCount?: number;
    overrideItemName?: string;
    infoText?: string;
    overrideTooltip?: string;
    textDisplayStyle: Enum.ItemDisplayTextDisplayStyle;
    tooltipEnabled: boolean;
    iconSizeType: Enum.WidgetIconSizeType;
    infoTextEnabledState: Enum.WidgetEnabledState;
    showAsEarned: boolean;
    itemNameTextFontType: Enum.UIWidgetFontType;
    itemNameTextSizeType: Enum.UIWidgetTextSizeType;
    infoTextFontType: Enum.UIWidgetFontType;
    infoTextSizeType: Enum.UIWidgetTextSizeType;
    itemNameCustomColor: Enum.WidgetEnabledState;
    itemNameCustomColorOverrideState: Enum.UIWidgetOverrideState;
}

interface UIWidgetRewardInfo {
    shownState: Enum.UIWidgetRewardShownState;
    earnedTooltip: string;
    unearnedTooltip: string;
}

interface UIWidgetSetInfo {
    layoutDirection: Enum.UIWidgetSetLayoutDirection;
    verticalPadding: number;
}

interface UIWidgetSpellButtonInfo {
    spellID: number;
    tooltip: string;
    icon: Enum.UIWidgetButtonIconType;
    enabledState: Enum.UIWidgetButtonEnabledState;
    cooldownType: Enum.UIWidgetSpellButtonCooldownType;
}

interface UIWidgetSpellInfo {
    spellID: number;
    shownState: Enum.WidgetShownState;
    enabledState: Enum.WidgetEnabledState;
    tooltip: string;
    text: string;
    stackDisplay: number;
    iconSizeType: Enum.WidgetIconSizeType;
    iconDisplayType: Enum.SpellDisplayIconDisplayType;
    textShownState: Enum.SpellDisplayTextShownStateType;
    borderColor: Enum.SpellDisplayBorderColor;
    textFontType: Enum.UIWidgetFontType;
    textSizeType: Enum.UIWidgetTextSizeType;
    hAlignType: Enum.WidgetTextHorizontalAlignmentType;
    tint: Enum.SpellDisplayTint;
    showGlowState: Enum.WidgetShowGlowState;
    showAsEarned: boolean;
}

interface UIWidgetStateIconInfo {
    iconState: Enum.IconState;
    state1Tooltip: string;
    state2Tooltip: string;
}

interface UIWidgetTextTooltipPair {
    text: string;
    tooltip: string;
}

interface UnitAuraSoundInfo {
    unitToken: string;
    spellID: number;
    /** Sound file to play. Playback stops after five seconds. */
    soundFileName?: string;
    /** Sound file to play. Playback stops after five seconds. */
    soundFileID?: number;
    outputChannel?: string;
    /** Minimum time in seconds between plays. Must be between 0 and 5 seconds, inclusive. Invalid values reject registration. */
    throttleSeconds?: number;
}

interface UnitAuraUpdateInfo {
    isFullUpdate: boolean;
    removedAuraInstanceIDs?: number[];
    addedAuras?: AuraData[];
    updatedAuraInstanceIDs?: number[];
}

interface UnitCastingInfoResult {
    name: string;
    displayName: string;
    textureID: number;
    startTimeMs: number;
    endTimeMs: number;
    isTradeskill: boolean;
    castID: string;
    notInterruptible?: boolean;
    castingSpellID: number;
    castBarID?: UnitCastBarID;
    delayTimeMs: number;
}

interface UnitChannelInfoResult {
    name: string;
    displayName: string;
    textureID: number;
    startTimeMs: number;
    endTimeMs: number;
    isTradeskill: boolean;
    notInterruptible?: boolean;
    spellID: number;
    isEmpowered: boolean;
    numEmpowerStages: number;
    castBarID?: UnitCastBarID;
}

interface UnitCreatureFamilyResult {
    name: string;
    id: number;
}

interface UnitCreatureTypeResult {
    name: string;
    id: number;
}

interface UnitDamageAbsorbInfo {
    /** Amount of applied damage absorb affects with potential reductions from clamping included. */
    amount: number;
    /** If true, the value is in excess of the clamp boundary. */
    clamped: boolean;
}

interface UnitHealAbsorbInfo {
    /** Amount of applied heal absorb affects with potential reductions from incoming heals and clamping included. */
    amount: number;
    /** If true, the value is in excess of the clamp boundary. */
    clamped: boolean;
}

interface UnitHealPredictionValues {
    health: number;
    healthMax: number;
    totalIncomingHeals: number;
    totalIncomingHealsFromHealer: number;
    totalDamageAbsorbs: number;
    totalHealAbsorbs: number;
}

interface UnitIncomingHealInfo {
    /** Amount of incoming heals across all units with potential reductions from heal absorb effects included. */
    amount: number;
    /** Amount of incoming heals from the healer unit. Will never exceed the all-units value. */
    amountFromHealer: number;
    /** Amount of incoming heals from units other than theh healer. Calculated as the difference between amount and amount-from-healer. */
    amountFromOthers: number;
    /** If true, the value is in excess of the clamp boundary. */
    clamped: boolean;
}

interface UnitPowerBarInfo {
    ID: number;
    barType: number;
    minPower: number;
    startInset: number;
    endInset: number;
    smooth: boolean;
    hideFromOthers: boolean;
    showOnRaid: boolean;
    opaqueSpark: boolean;
    opaqueFlash: boolean;
    anchorTop: boolean;
    forcePercentage: boolean;
    sparkUnderFrame: boolean;
    flashAtMinPower: boolean;
    fractionalCounter: boolean;
    animateNumbers: boolean;
    attachTooltipToBar: boolean;
}

interface UnitPowerBarWidgetVisualizationInfo {
    shownState: Enum.WidgetShownState;
    barMin: number;
    barMax: number;
    barValue: number;
    tooltip: string;
    barValueTextType: Enum.StatusBarValueTextType;
    overrideBarText: string;
    overrideBarTextShownType: Enum.StatusBarOverrideBarTextShownType;
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    fillMotionType: Enum.UIWidgetMotionType;
    flashBlendModeType: Enum.UIWidgetBlendModeType;
    sparkBlendModeType: Enum.UIWidgetBlendModeType;
    flashMomentType: Enum.WidgetUnitPowerBarFlashMomentType;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface UnitPrivateAuraAnchorInfo {
    anchorID: number;
    unitToken: string;
    auraIndex: number;
    showCooldownFrame: boolean;
    showCooldownEdge: boolean;
    showCountdownNumbers: boolean;
    showDispelIcon: boolean;
    iconWidth?: number;
    iconHeight?: number;
    borderScale?: number;
    isContainer?: boolean;
    parent: Frame;
}

interface UnlockedAzeriteEmpoweredItems {
    unlockedItem: ItemLocationMixin;
    tierIndex: number;
}

interface VendorTrackingInfo {
    creatureName: string;
    zoneName?: string;
    currencyType?: number;
    cost?: number;
}

interface ViewedTransmogOutfitSlotInfo {
    transmogID: number;
    displayType: Enum.TransmogOutfitDisplayType;
    isTransmogrified: boolean;
    hasPending: boolean;
    isPendingCollected: boolean;
    canTransmogrify: boolean;
    warning: Enum.TransmogOutfitSlotWarning;
    warningText: string;
    error: Enum.TransmogOutfitSlotError;
    errorText: string;
    texture?: number;
    sheatheCategory: Enum.TransmogOutfitSlotOptionSheatheCategory;
}

interface VignetteInfo {
    vignetteGUID: string;
    objectGUID: string;
    name: string;
    isDead: boolean;
    onWorldMap: boolean;
    zoneInfiniteAOI: boolean;
    onMinimap: boolean;
    isUnique: boolean;
    inFogOfWar: boolean;
    atlasName: string;
    hasTooltip: boolean;
    vignetteID: number;
    type: Enum.VignetteType;
    rewardQuestID: number;
    tooltipWidgetSet?: number;
    iconWidgetSet?: number;
    addPaddingAboveTooltipWidgets?: boolean;
    mapPin?: UIMapPinInfo;
    objectiveType?: Enum.VignetteObjectiveType;
}

interface VoiceAudioDevice {
    deviceID: string;
    displayName: string;
    isActive: boolean;
    isSystemDefault: boolean;
    isCommsDefault: boolean;
}

interface VoiceChatChannel {
    name: string;
    channelID: VoiceChatID;
    channelType: Enum.ChatChannelType;
    clubId: string;
    streamId: string;
    volume: number;
    isActive: boolean;
    isMuted: boolean;
    isTransmitting: boolean;
    isTranscribing: boolean;
    members: VoiceChatMember[];
}

interface VoiceChatMember {
    energy: number;
    memberID: VoiceChatID;
    isActive: boolean;
    isSpeaking: boolean;
    isMutedForAll: boolean;
    isSilenced: boolean;
}

interface VoiceChatProcess {
    name: string;
    channels: VoiceChatChannel[];
}

interface VoiceTtsVoiceType {
    voiceID: number;
    name: string;
}

interface WarbandSceneEntry {
    warbandSceneID: number;
    name: string;
    description: string;
    source: string;
    quality: number;
    textureKit: string;
    isFavorite: boolean;
    hasFanfare: boolean;
    sourceType: number;
}

interface WarbandSceneSearchInfo {
    ownedOnly: boolean;
    favoritesOnly: boolean;
}

interface WeaponEnchantInfo {
    hasEnchant: boolean;
    enchantType: Enum.ItemEnchantType;
    timeLeft: number;
    charges: number;
    enchantID: number;
    enchantIconID: number;
}

interface WeatherInfo {
    type: Enum.WeatherType;
    intensity: number;
}

interface WeeklyRewardActivityEncounterInfo {
    encounterID: number;
    bestDifficulty: number;
    uiOrder: number;
    instanceID: number;
}

interface WeeklyRewardActivityInfo {
    type: WeeklyRewardChestThresholdType;
    index: number;
    threshold: number;
    progress: number;
    id: number;
    activityTierID: number;
    level: number;
    claimID?: number;
    raidString?: string;
    rewards: WeeklyRewardActivityRewardInfo[];
}

interface WeeklyRewardActivityRewardInfo {
    type: CachedRewardType;
    id: number;
    quantity: number;
    itemDBID?: WeeklyRewardItemDBID;
}

interface WeeklyRewardActivityTierProgress {
    activityTierID: number;
    difficulty: number;
    numPoints: number;
}

interface WhoFilter {
    name: string;
    ID: number;
}

interface WhoInfo {
    fullName: string;
    fullGuildName: string;
    level: number;
    raceStr: string;
    classStr: string;
    area: string;
    filename?: string;
    gender: number;
    timerunningSeasonID?: number;
}

interface WorldLootObjectInfo {
    inventoryType: Enum.InventoryType;
    atMaxQuality: boolean;
    isUpgrade: boolean;
}

interface WorldPVPBattlegroundInfo {
    bgID: number;
    name: string;
    isActive: boolean;
    canQueue: boolean;
    canEnter: boolean;
    startTime: number;
    minLevel: number;
    maxLevel: number;
}

interface WorldSafeLocInfo {
    name: string;
    continent: number;
    loc: Vector3DMixin;
    facing: number;
}

interface WowLocale {
    enUS: boolean;
    koKR: boolean;
    frFR: boolean;
    deDE: boolean;
    zhCN: boolean;
    zhTW: boolean;
    esES: boolean;
    esMX: boolean;
    ruRU: boolean;
    ptBR: boolean;
    itIT: boolean;
}

interface XMLTemplateInfo {
    type: string;
    width: number;
    height: number;
    keyValues: XMLTemplateKeyValue[];
    inherits?: string;
    sourceLocation: string;
}

interface XMLTemplateKeyValue {
    key: string;
    keyType: string;
    type: string;
    value: string;
}

interface XMLTemplateListInfo {
    name: string;
    type: string;
}

interface ZoneAbilityInfo {
    zoneAbilityID: number;
    uiPriority: number;
    spellID: number;
    textureKit: string;
    tutorialText?: string;
}

interface ZoneControlVisualizationInfo {
    shownState: Enum.WidgetShownState;
    mode: Enum.ZoneControlMode;
    leadingEdgeType: Enum.ZoneControlLeadingEdgeType;
    dangerFlashType: Enum.ZoneControlDangerFlashType;
    zoneEntries: ZoneEntry[];
    tooltipLoc: Enum.UIWidgetTooltipLocation;
    widgetSizeSetting: number;
    textureKit: string;
    frameTextureKit: string;
    hasTimer: boolean;
    orderIndex: number;
    widgetTag: string;
    inAnimType: Enum.WidgetAnimationType;
    outAnimType: Enum.WidgetAnimationType;
    widgetScale: Enum.UIWidgetScale;
    layoutDirection: Enum.UIWidgetLayoutDirection;
    modelSceneLayer: Enum.UIWidgetModelSceneLayer;
    scriptedAnimationEffectID: number;
}

interface ZoneEntry {
    state: Enum.ZoneControlState;
    activeState: Enum.ZoneControlActiveState;
    fillType: Enum.ZoneControlFillType;
    min: number;
    max: number;
    current: number;
    capturePoint: number;
    tooltip: string;
}

type CraftingOrderRequestCallback = (this: void, result: Enum.CraftingOrderResult, orderType: Enum.CraftingOrderType, displayBuckets: boolean, expectMoreRows: boolean, offset: number, isSorted: boolean) => void;
type CraftingOrderRequestMyOrdersCallback = (this: void, result: Enum.CraftingOrderResult, expectMoreRows: boolean, offset: number, isSorted: boolean) => void;
type EventCallbackType = (this: void) => void;
type FixturePointUpdatedCallback = (this: void) => void;
type FrameEventCallbackType = (this: void) => void;
type GetTitleIconTextureCallback = (this: void, success: boolean, texture: number) => void;
type HousingCatalogSearchResultsUpdatedCallback = (this: void) => void;
type InputCommandCallback = (this: void, keystate: string) => void;
type MacroExecuteLineCallback = (this: void, macroLine: string) => void;
type PendingPingOffScreenCallback = (this: void) => void;
type PingCooldownStartedCallback = (this: void, info: PingCooldownInfo) => void;
type PingPinFrameAddedCallback = (this: void, region: ScriptRegion, uiTextureKit: string, isWorldPoint: boolean, actionInfo?: PingActionUIInfo) => void;
type PingPinFrameRemovedCallback = (this: void, region: ScriptRegion) => void;
type PingPinFrameScreenClampStateUpdatedCallback = (this: void, region: ScriptRegion, state: boolean) => void;
type PingRadialWheelCreatedCallback = (this: void, region: ScriptRegion) => void;
type PinUpdatedCallback = (this: void) => void;
type SendMacroPingCallback = (this: void, macroInfo: PingMacroInfo) => void;
type TickerCallback = (this: void, cb: TimerCallback) => void;
/** Invoked by a timed signal map when a scheduled time has arrived. */
type TimedSignalMapCallback = (this: void, key: number) => void;
type TimerCallback = (this: void) => void;
type TogglePingListenerCallback = (this: void, down: boolean) => void;
