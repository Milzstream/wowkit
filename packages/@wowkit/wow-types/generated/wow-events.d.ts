// GENERATED FILE - do not edit. Regenerate with "pnpm gen:types".
// Event payloads, keyed by event name.
// Source: https://github.com/Gethe/wow-ui-source.git (forever @ 17ed2c3e84), game version 1.60.1.70755

interface WowEventPayloads {
    /** @remarks Synchronous event. */
    ACCOUNT_CHARACTER_CURRENCY_DATA_RECEIVED: [];
    /** @remarks Synchronous event. */
    ACCOUNT_CVARS_LOADED: [];
    /** @remarks Synchronous event. */
    ACCOUNT_MONEY: [];
    /** @remarks Synchronous event. */
    ACCOUNT_STORE_CURRENCY_AVAILABLE_UPDATED: [currencyID: number];
    /** @remarks Synchronous event. */
    ACCOUNT_STORE_FRONT_UPDATED: [storeFrontID: number];
    /** @remarks Synchronous event. */
    ACCOUNT_STORE_ITEM_INFO_UPDATED: [itemID: number];
    /** @remarks Synchronous event. */
    ACCOUNT_STORE_TRANSACTION_ERROR: [result: AccountStoreTransactionResult];
    /** @remarks Synchronous event. */
    ACHIEVEMENT_EARNED: [achievementID: number, alreadyEarned: boolean | undefined];
    /** @remarks Synchronous event. */
    ACHIEVEMENT_PLAYER_NAME: [achievementID: number];
    /** @remarks Synchronous event. */
    ACHIEVEMENT_SEARCH_UPDATED: [];
    /**
     * Used in conjunction with EnableActionRangeCheck to inform the UI when an action goes in or out of range with its current target.
     * @remarks Synchronous event.
     */
    ACTION_RANGE_CHECK_UPDATE: [slot: number, isInRange: boolean, checksRange: boolean];
    /** @remarks Synchronous event. */
    ACTION_USABLE_CHANGED: [changes: ActionUsableState[]];
    /** @remarks Synchronous event. */
    ACTION_WILL_BIND_ITEM: [];
    /** @remarks Synchronous event. */
    ACTIONBAR_HIDEGRID: [];
    /** @remarks Synchronous event. */
    ACTIONBAR_PAGE_CHANGED: [];
    /** @remarks Synchronous event. */
    ACTIONBAR_SHOW_BOTTOMLEFT: [];
    /** @remarks Synchronous event. */
    ACTIONBAR_SHOWGRID: [];
    /** @remarks Synchronous event. */
    ACTIONBAR_SLOT_CHANGED: [slot: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ACTIONBAR_UPDATE_COOLDOWN: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ACTIONBAR_UPDATE_STATE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ACTIONBAR_UPDATE_USABLE: [];
    /** @remarks Synchronous event. */
    ACTIVATE_GLYPH: [spellID: number];
    /** @remarks Synchronous event. */
    ACTIVE_COMBAT_CONFIG_CHANGED: [configID: number];
    /**
     * Signaled when SpellScript calls change the data for players/parties owning a delve or when the delve is shut down.
     * @remarks Synchronous event.
     */
    ACTIVE_DELVE_DATA_UPDATE: [];
    /** @remarks Synchronous event. */
    ACTIVE_GAME_MODE_UPDATED: [gameMode: GameMode];
    /** @remarks Synchronous event. */
    ACTIVE_PLAYER_SPECIALIZATION_CHANGED: [];
    /** @remarks Synchronous event. */
    ACTIVE_TALENT_GROUP_CHANGED: [curr: number, prev: number];
    /** @remarks Synchronous event. */
    ADAPTER_LIST_CHANGED: [];
    /** @remarks Synchronous event. */
    ADD_NEIGHBORHOOD_CHARTER_SIGNATURE: [signature: string];
    /** @remarks Synchronous event. */
    ADDON_ACTION_BLOCKED: [isTainted: string, function_: string];
    /** @remarks Synchronous event. */
    ADDON_ACTION_FORBIDDEN: [isTainted: string, function_: string];
    /** @remarks Synchronous event. */
    ADDON_LOADED: [addOnName: string, containsBindings: boolean];
    /**
     * Fired when the state of an addon restriction type is changing. This event is sequenced such that it will always be fired before a restriction becomes active, or after it is deactivated.
     * @remarks Synchronous event.
     */
    ADDON_RESTRICTION_STATE_CHANGED: [type: Enum.AddOnRestrictionType, state: Enum.AddOnRestrictionState];
    /** @remarks Synchronous event. */
    ADDONS_UNLOADING: [closingClient: boolean];
    /** @remarks Synchronous event. */
    ADVENTURE_MAP_CLOSE: [];
    /** @remarks Synchronous event. */
    ADVENTURE_MAP_OPEN: [followerTypeID: number];
    /** @remarks Synchronous event. */
    ADVENTURE_MAP_QUEST_UPDATE: [questID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ADVENTURE_MAP_UPDATE_INSETS: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ADVENTURE_MAP_UPDATE_POIS: [];
    /** @remarks Synchronous event. */
    AJ_DUNGEON_ACTION: [lfgDungeonID: number];
    /** @remarks Synchronous event. */
    AJ_OPEN: [];
    /** @remarks Synchronous event. */
    AJ_OPEN_COLLECTIONS_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVE_LFG_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVP_ACTION: [battleMasterListID: number];
    /** @remarks Synchronous event. */
    AJ_PVP_LFG_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVP_RBG_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVP_SKIRMISH_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVP_SPECIAL_BG_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_PVP_TRAINING_GROUNDS_ACTION: [];
    /** @remarks Synchronous event. */
    AJ_QUEST_LOG_OPEN: [questID: number, uiMapID: number];
    /** @remarks Synchronous event. */
    AJ_RAID_ACTION: [lfgDungeonID: number];
    /** @remarks Synchronous event. */
    AJ_REFRESH_DISPLAY: [newAdventureNotice: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    AJ_REWARD_DATA_RECEIVED: [];
    /** @remarks Synchronous event. */
    ALERT_AGE_VERIFICATION_RESTRICTED: [];
    /** @remarks Synchronous event. */
    ALERT_REGIONAL_CHAT_DISABLED: [];
    /** @remarks Synchronous event. */
    ALLIED_RACE_CLOSE: [];
    /** @remarks Synchronous event. */
    ALLIED_RACE_OPEN: [raceID: number];
    /** @remarks Synchronous event. */
    ALTERNATIVE_DEFAULT_LANGUAGE_CHANGED: [];
    /** @remarks Synchronous event. */
    ANIMA_DIVERSION_CLOSE: [];
    /** @remarks Synchronous event. */
    ANIMA_DIVERSION_OPEN: [info: AnimaDiversionFrameInfo];
    /** @remarks Synchronous event. */
    ANIMA_DIVERSION_TALENT_UPDATED: [];
    /** @remarks Synchronous event. */
    ARCHAEOLOGY_CLOSED: [];
    /** @remarks Synchronous event. */
    ARCHAEOLOGY_FIND_COMPLETE: [numFindsCompleted: number, totalFinds: number, researchBranchID: number];
    /** @remarks Synchronous event. */
    ARCHAEOLOGY_SURVEY_CAST: [numFindsCompleted: number, totalFinds: number, researchBranchID: number, successfulFind: number];
    /** @remarks Synchronous event. */
    ARCHAEOLOGY_TOGGLE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    AREA_POIS_UPDATED: [];
    /** @remarks Synchronous event. */
    AREA_SPIRIT_HEALER_IN_RANGE: [];
    /** @remarks Synchronous event. */
    AREA_SPIRIT_HEALER_OUT_OF_RANGE: [];
    /** @remarks Synchronous event. */
    ARENA_COOLDOWNS_UPDATE: [];
    /** @remarks Synchronous event. */
    ARENA_CROWD_CONTROL_SPELL_UPDATE: [unitTarget: UnitToken, spellID: number];
    /** @remarks Synchronous event. */
    ARENA_OPPONENT_UPDATE: [unitToken: string, updateReason: string];
    /** @remarks Synchronous event. */
    ARENA_PREP_OPPONENT_SPECIALIZATIONS: [];
    /** @remarks Synchronous event. */
    ARENA_SEASON_WORLD_STATE: [];
    /** @remarks Synchronous event. */
    ARTIFACT_CLOSE: [];
    /** @remarks Synchronous event. */
    ARTIFACT_DIGSITE_COMPLETE: [researchBranchID: number];
    /** @remarks Synchronous event. */
    ARTIFACT_ENDGAME_REFUND: [numRefundedPowers: number, refundedTier: ArtifactTiers, bagOrSlotIndex: number, slotIndex: number | undefined];
    /** @remarks Synchronous event. */
    ARTIFACT_RELIC_FORGE_CLOSE: [];
    /** @remarks Synchronous event. */
    ARTIFACT_RELIC_FORGE_PREVIEW_RELIC_CHANGED: [];
    /** @remarks Synchronous event. */
    ARTIFACT_RELIC_FORGE_UPDATE: [];
    /** @remarks Synchronous event. */
    ARTIFACT_RELIC_INFO_RECEIVED: [];
    /** @remarks Synchronous event. */
    ARTIFACT_RESPEC_PROMPT: [];
    /** @remarks Synchronous event. */
    ARTIFACT_TIER_CHANGED: [newTier: number, bagOrSlotIndex: number, slotIndex: number | undefined];
    /** @remarks Synchronous event. */
    ARTIFACT_UPDATE: [newItem: boolean];
    /** @remarks Synchronous event. */
    ARTIFACT_XP_UPDATE: [];
    /** @remarks Synchronous event. */
    ASSISTED_COMBAT_ACTION_SPELL_CAST: [];
    /** @remarks Synchronous event. */
    AUCTION_CANCELED: [auctionID: number];
    /**
     * This signal is not used in the base UI but is included for AddOn ease-of-use.
     * @remarks Synchronous event.
     */
    AUCTION_HOUSE_AUCTION_CREATED: [auctionID: number];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_AUCTIONS_EXPIRED: [auctionID: number];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_BROWSE_FAILURE: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_BROWSE_RESULTS_ADDED: [addedBrowseResults: BrowseResultInfo[]];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_BROWSE_RESULTS_UPDATED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_CLOSED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_DISABLED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_FAVORITES_UPDATED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_ITEM_DELIVERY_DELAY_UPDATE: [purchasedItemDeliveryDelay: number, cancelledItemDeliveryDelay: number];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_NEW_BID_RECEIVED: [auctionID: number];
    /**
     * This signal is not used in the base UI but is included for AddOn ease-of-use. Payload is nil for browse queries.
     * @remarks Synchronous event.
     */
    AUCTION_HOUSE_NEW_RESULTS_RECEIVED: [itemKey: ItemKey | undefined];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_POST_ERROR: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_POST_WARNING: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_PURCHASE_COMPLETED: [auctionID: number];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SCRIPT_DEPRECATED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SHOW: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SHOW_COMMODITY_WON_NOTIFICATION: [commodityName: string, commodityQuantity: number];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SHOW_ERROR: [error: Enum.AuctionHouseError];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SHOW_FORMATTED_NOTIFICATION: [notification: Enum.AuctionHouseNotification, text: string, auctionID: number | undefined];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_SHOW_NOTIFICATION: [notification: Enum.AuctionHouseNotification];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_THROTTLED_MESSAGE_DROPPED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_THROTTLED_MESSAGE_QUEUED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_THROTTLED_MESSAGE_RESPONSE_RECEIVED: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_THROTTLED_MESSAGE_SENT: [];
    /** @remarks Synchronous event. */
    AUCTION_HOUSE_THROTTLED_SYSTEM_READY: [];
    /** @remarks Synchronous event. */
    AUCTION_MULTISELL_FAILURE: [];
    /** @remarks Synchronous event. */
    AUCTION_MULTISELL_START: [numRepetitions: number];
    /** @remarks Synchronous event. */
    AUCTION_MULTISELL_UPDATE: [createdCount: number, totalToCreate: number];
    /** @remarks Synchronous event. */
    AURA_DATA_PROVIDER_SWITCH: [useRealDataProvider: boolean];
    /** @remarks Synchronous event. */
    AUTOFOLLOW_BEGIN: [name: string];
    /** @remarks Synchronous event. */
    AUTOFOLLOW_END: [];
    /** @remarks Synchronous event. */
    AVAILABLE_GAME_MODES_UPDATED: [];
    /** @remarks Synchronous event. */
    AVATAR_LIST_UPDATED: [clubType: Enum.ClubType];
    /** @remarks Synchronous event. */
    AVOIDANCE_UPDATE: [];
    /** @remarks Synchronous event. */
    AZERITE_EMPOWERED_ITEM_EQUIPPED_STATUS_CHANGED: [isHeartEquipped: boolean];
    /** @remarks Synchronous event. */
    AZERITE_EMPOWERED_ITEM_LOOTED: [itemLink: string];
    /** @remarks Synchronous event. */
    AZERITE_EMPOWERED_ITEM_SELECTION_UPDATED: [azeriteEmpoweredItemLocation: ItemLocationMixin];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_ACTIVATED: [slot: Enum.AzeriteEssenceSlot, essenceID: number];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_ACTIVATION_FAILED: [slot: Enum.AzeriteEssenceSlot, essenceID: number];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_CHANGED: [essenceID: number, newRank: number];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_FORGE_CLOSE: [];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_FORGE_OPEN: [];
    /** @remarks Synchronous event. */
    AZERITE_ESSENCE_MILESTONE_UNLOCKED: [milestoneID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    AZERITE_ESSENCE_UPDATE: [];
    /** @remarks Synchronous event. */
    AZERITE_ITEM_ENABLED_STATE_CHANGED: [enabled: boolean];
    /** @remarks Synchronous event. */
    AZERITE_ITEM_EXPERIENCE_CHANGED: [azeriteItemLocation: ItemLocationMixin, oldExperienceAmount: number, newExperienceAmount: number];
    /** @remarks Synchronous event. */
    AZERITE_ITEM_POWER_LEVEL_CHANGED: [azeriteItemLocation: ItemLocationMixin, oldPowerLevel: number, newPowerLevel: number, unlockedEmpoweredItemsInfo: UnlockedAzeriteEmpoweredItems[], azeriteItemID: number];
    /** @remarks Synchronous event. */
    B_NET_NEIGHBORHOOD_LIST_UPDATED: [result: Enum.HousingResult, neighborhoodInfos: NeighborhoodInfo[] | undefined];
    /** @remarks Synchronous event. */
    BAG_CLOSED: [bagID: Enum.BagIndex];
    /** @remarks Synchronous event. */
    BAG_CONTAINER_UPDATE: [];
    /** @remarks Synchronous event. */
    BAG_NEW_ITEMS_UPDATED: [];
    /** @remarks Synchronous event. */
    BAG_OPEN: [bagID: number];
    /** @remarks Synchronous event. */
    BAG_OVERFLOW_WITH_FULL_INVENTORY: [];
    /** @remarks Synchronous event. */
    BAG_SLOT_FLAGS_UPDATED: [slot: number];
    /** @remarks Synchronous event. */
    BAG_UPDATE: [bagID: Enum.BagIndex];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    BAG_UPDATE_COOLDOWN: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    BAG_UPDATE_DELAYED: [];
    /** @remarks Synchronous event. */
    BANK_BAG_SLOT_FLAGS_UPDATED: [slot: number];
    /** @remarks Synchronous event. */
    BANK_TAB_SETTINGS_UPDATED: [bankType: Enum.BankType];
    /** @remarks Synchronous event. */
    BANK_TABS_CHANGED: [bankType: Enum.BankType];
    /** @remarks Synchronous event. */
    BANKFRAME_CLOSED: [];
    /** @remarks Synchronous event. */
    BANKFRAME_OPENED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    BARBER_SHOP_APPEARANCE_APPLIED: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_CAMERA_VALUES_UPDATED: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_CLOSE: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_COST_UPDATE: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_FORCE_CUSTOMIZATIONS_UPDATE: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_OPEN: [];
    /** @remarks Synchronous event. */
    BARBER_SHOP_RESULT: [success: boolean];
    /** @remarks Synchronous event. */
    BATTLE_NET_FRIEND_TAG_ENABLED_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    BATTLE_NET_TITLE_FRIEND_CUSTOM_NAME_ENABLED_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    BATTLE_PET_CURSOR_CLEAR: [];
    /** @remarks Synchronous event. */
    BATTLEFIELD_AUTO_QUEUE: [];
    /** @remarks Synchronous event. */
    BATTLEFIELD_AUTO_QUEUE_EJECT: [];
    /** @remarks Synchronous event. */
    BATTLEFIELD_QUEUE_TIMEOUT: [];
    /** @remarks Synchronous event. */
    BATTLEFIELDS_CLOSED: [];
    /** @remarks Synchronous event. */
    BATTLEFIELDS_SHOW: [isArena: boolean | undefined, battleMasterListID: number | undefined];
    /** @remarks Synchronous event. */
    BATTLEGROUND_OBJECTIVES_UPDATE: [];
    /** @remarks Synchronous event. */
    BATTLEGROUND_POINTS_UPDATE: [];
    /** @remarks Synchronous event. */
    BATTLEPET_FORCE_NAME_DECLENSION: [name: string, battlePetGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    BC_26_COLD_SWAP_FEATURE_ENABLED_CHANGED: [newEnabled: boolean, oldEnabled: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    BC_26_EXPERIENCE_CHANGED: [newExperience: Enum.Bc26Experience, oldExperience: Enum.Bc26Experience];
    /** @remarks Synchronous event. */
    BEHAVIORAL_NOTIFICATION: [notificationType: string, dbId: NotificationDbId];
    /** @remarks Synchronous event. */
    BID_ADDED: [bidID: number];
    /** @remarks Synchronous event. */
    BIDS_UPDATED: [];
    /** @remarks Synchronous event. */
    BIND_ENCHANT: [];
    /** @remarks Synchronous event. */
    BINDINGS_LOADED: [];
    /** @remarks Synchronous event. */
    BLACK_MARKET_BID_RESULT: [marketID: number, resultCode: number];
    /** @remarks Synchronous event. */
    BLACK_MARKET_CLOSE: [];
    /** @remarks Synchronous event. */
    BLACK_MARKET_ITEM_UPDATE: [];
    /** @remarks Synchronous event. */
    BLACK_MARKET_OPEN: [];
    /** @remarks Synchronous event. */
    BLACK_MARKET_OUTBID: [marketID: number, itemID: number];
    /** @remarks Synchronous event. */
    BLACK_MARKET_UNAVAILABLE: [];
    /** @remarks Synchronous event. */
    BLACK_MARKET_WON: [marketID: number, itemID: number];
    /** @remarks Synchronous event. */
    BN_BLOCK_FAILED_TOO_MANY: [blockType: string];
    /** @remarks Synchronous event. */
    BN_BLOCK_LIST_UPDATED: [];
    /** @remarks Synchronous event. */
    BN_CHAT_MSG_ADDON: [prefix: string, text: string, channel: string, senderID: number];
    /** @remarks Synchronous event. */
    BN_CHAT_WHISPER_UNDELIVERABLE: [senderID: number];
    /** @remarks Synchronous event. */
    BN_CONNECTED: [suppressNotification: boolean];
    /** @remarks Synchronous event. */
    BN_CUSTOM_MESSAGE_CHANGED: [id: number | undefined];
    /** @remarks Synchronous event. */
    BN_CUSTOM_MESSAGE_LOADED: [];
    /** @remarks Synchronous event. */
    BN_DISCONNECTED: [result: boolean, suppressNotification: boolean];
    /** @remarks Synchronous event. */
    BN_FRIEND_ACCOUNT_OFFLINE: [friendId: number, isCompanionApp: boolean];
    /** @remarks Synchronous event. */
    BN_FRIEND_ACCOUNT_ONLINE: [friendId: number, isCompanionApp: boolean];
    /** @remarks Synchronous event. */
    BN_FRIEND_INFO_CHANGED: [friendIndex: number | undefined];
    /** @remarks Synchronous event. */
    BN_FRIEND_INVITE_ADDED: [accountID: number];
    /** @remarks Synchronous event. */
    BN_FRIEND_INVITE_LIST_INITIALIZED: [listSize: number];
    /** @remarks Synchronous event. */
    BN_FRIEND_INVITE_REMOVED: [];
    /** @remarks Synchronous event. */
    BN_FRIEND_LIST_SIZE_CHANGED: [accountID: number | undefined];
    /** @remarks Synchronous event. */
    BN_INFO_CHANGED: [];
    /** @remarks Synchronous event. */
    BN_REQUEST_FOF_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    BNET_REQUEST_INVITE_CONFIRMATION: [gameAccountID: number, questSessionActive: boolean, tank: boolean, healer: boolean, dps: boolean];
    /** @remarks Synchronous event. */
    BONUS_ROLL_ACTIVATE: [];
    /** @remarks Synchronous event. */
    BONUS_ROLL_DEACTIVATE: [];
    /** @remarks Synchronous event. */
    BONUS_ROLL_FAILED: [];
    /** @remarks Synchronous event. */
    BONUS_ROLL_RESULT: [typeIdentifier: string, itemLink: string, quantity: number, specID: number, sex: number, personalLootToast: boolean, currencyID: number | undefined, isSecondaryResult: boolean, corrupted: boolean];
    /** @remarks Synchronous event. */
    BONUS_ROLL_STARTED: [];
    /** @remarks Synchronous event. */
    BOSS_KILL: [encounterID: number, encounterName: string];
    /** @remarks Synchronous event. */
    BULK_PURCHASE_RESULT_RECEIVED: [result: Enum.BulkPurchaseResult, productResults: BulkPurchaseIndividualProductResult[], bestTopUpProductID: number | undefined, totalCost: number | undefined];
    /** @remarks Synchronous event. */
    BULK_REFUND_RESULT_RECEIVED: [result: Enum.BulkRefundResult];
    /** @remarks Synchronous event. */
    CALENDAR_ACTION_PENDING: [pending: boolean];
    /** @remarks Synchronous event. */
    CALENDAR_CLOSE_EVENT: [];
    /** @remarks Synchronous event. */
    CALENDAR_EVENT_ALARM: [title: string, hour: number, minute: number];
    /** @remarks Synchronous event. */
    CALENDAR_NEW_EVENT: [isCopy: boolean];
    /** @remarks Synchronous event. */
    CALENDAR_OPEN_EVENT: [calendarType: string];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_ERROR: [errorReason: string];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_ERROR_WITH_COUNT: [errorReason: string, count: number];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_ERROR_WITH_PLAYER_NAME: [errorReason: string, playerName: string];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_EVENT: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    CALENDAR_UPDATE_EVENT_LIST: [];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_GUILD_EVENTS: [];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_INVITE_LIST: [hasCompleteList: boolean | undefined];
    /** @remarks Synchronous event. */
    CALENDAR_UPDATE_PENDING_INVITES: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CAN_LOCAL_WHISPER_TARGET_RESPONSE: [whisperTarget: string, status: Enum.ChatWhisperTargetStatus];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CAN_PLAYER_SPEAK_LANGUAGE_CHANGED: [languageId: number, canSpeakLanguage: boolean];
    /** @remarks Synchronous event. */
    CANCEL_ALL_LOOT_ROLLS: [];
    /** @remarks Synchronous event. */
    CANCEL_GLYPH_CAST: [];
    /** @remarks Synchronous event. */
    CANCEL_LOOT_ROLL: [rollID: number];
    /** @remarks Synchronous event. */
    CANCEL_NEIGHBORHOOD_INVITE_RESPONSE: [result: Enum.NeighborhoodInviteResult, playerName: string | undefined];
    /** @remarks Synchronous event. */
    CANCEL_PLAYER_COUNTDOWN: [initiatedBy: string, informChat: boolean, initiatedByName: string | undefined];
    /** @remarks Synchronous event. */
    CANCEL_SUMMON: [];
    /** @remarks Synchronous event. */
    CAPTUREFRAMES_FAILED: [];
    /** @remarks Synchronous event. */
    CAPTUREFRAMES_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_ADD_PENDING_PRODUCT: [productID: number];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_DATA_REFRESH: [shoppingSessionUUIDStr: string | undefined];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_DISABLED: [];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_FETCH_FAILURE: [shoppingSessionUUIDStr: string | undefined];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_FETCH_SUCCESS: [shoppingSessionUUIDStr: string | undefined];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_OPEN_SIMPLE_CHECKOUT: [checkoutID: number];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_PURCHASE_SUCCESS: [productID: number];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_REBUILD_SCROLL_BOX: [];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_REFUNDABLE_DECORS_UPDATED: [];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_REMOVE_PENDING_PRODUCT: [productID: number];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_RESULT_ERROR: [];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_SPECIFIC_PRODUCT_REFRESH: [productID: number];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_VIRTUAL_CURRENCY_BALANCE_UPDATE: [currencyCode: string, balance: string];
    /** @remarks Synchronous event. */
    CATALOG_SHOP_VIRTUAL_CURRENCY_BALANCE_UPDATE_FAILURE: [currencyCode: string];
    /** @remarks Synchronous event. */
    CAUTIONARY_CHANNEL_MESSAGE: [confirmNumber: number];
    /** @remarks Synchronous event. */
    CAUTIONARY_CHAT_MESSAGE: [chatLineID: number, confirmNumber: number];
    /** @remarks Synchronous event. */
    CEMETERY_PREFERENCE_UPDATED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_COMPLETED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_COMPLETED_REWARDS: [mapID: number, medal: number, timeMS: number, money: number, rewards: ChallengeModeReward[]];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_DEATH_COUNT_UPDATED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_KEYSTONE_RECEPTABLE_OPEN: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_KEYSTONE_SLOTTED: [keystoneID: number];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_LEADERBOARD_RESULT: [mapID: number, challengeModeID: number, page: number, results: MythicPlusLeaderboardResult[]];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_LEADERS_UPDATE: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_LEAVER_TIMER_ENDED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_LEAVER_TIMER_STARTED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_MAPS_UPDATE: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_MEMBER_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_NEW_RECORD: [mapID: number, timeMS: number, medal: number];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_RESET: [mapID: number];
    /** @remarks Synchronous event. */
    CHALLENGE_MODE_START: [mapID: number];
    /** @remarks Synchronous event. */
    CHANNEL_COUNT_UPDATE: [displayIndex: number, count: number];
    /** @remarks Synchronous event. */
    CHANNEL_FLAGS_UPDATED: [displayIndex: number];
    /** @remarks Synchronous event. */
    CHANNEL_INVITE_REQUEST: [channelID: string, name: string];
    /** @remarks Synchronous event. */
    CHANNEL_LEFT: [chatChannelID: number, name: string];
    /** @remarks Synchronous event. */
    CHANNEL_PASSWORD_REQUEST: [channelID: string];
    /** @remarks Synchronous event. */
    CHANNEL_ROSTER_UPDATE: [displayIndex: number, count: number];
    /** @remarks Synchronous event. */
    CHANNEL_UI_UPDATE: [];
    /** @remarks Synchronous event. */
    CHARACTER_ITEM_FIXUP_NOTIFICATION: [fixupVersion: number];
    /** @remarks Synchronous event. */
    CHARACTER_POINTS_CHANGED: [change: number];
    /** @remarks Synchronous event. */
    CHARACTER_UPGRADE_SPELL_TIER_SET: [tierIndex: number];
    /** @remarks Synchronous event. */
    CHAT_COMBAT_MSG_ARENA_POINTS_GAIN: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_DISABLED_CHANGE_FAILED: [disabled: boolean];
    /** @remarks Synchronous event. */
    CHAT_DISABLED_CHANGED: [disabled: boolean];
    /** @remarks Synchronous event. */
    CHAT_LOGGING_CHANGED: [whichLog: number, isEnabled: boolean];
    /** @remarks Synchronous event. */
    CHAT_MSG_ACHIEVEMENT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_ADDON: [prefix: string, text: string, channel: string, sender: string, target: string, zoneChannelID: number, localID: number, name: string, instanceID: number];
    /** @remarks Synchronous event. */
    CHAT_MSG_ADDON_LOGGED: [prefix: string, text: string, channel: string, sender: string, target: string, zoneChannelID: number, localID: number, name: string, instanceID: number];
    /** @remarks Synchronous event. */
    CHAT_MSG_AFK: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BG_SYSTEM_ALLIANCE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BG_SYSTEM_HORDE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BG_SYSTEM_NEUTRAL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_INLINE_TOAST_ALERT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_INLINE_TOAST_BROADCAST: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_INLINE_TOAST_BROADCAST_INFORM: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_INLINE_TOAST_CONVERSATION: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_WHISPER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_WHISPER_INFORM: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_BN_WHISPER_PLAYER_OFFLINE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_JOIN: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_LEAVE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_LEAVE_PREVENTED: [channelName: string];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_LIST: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_NOTICE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CHANNEL_NOTICE_USER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COLLECTED_APPEARANCE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COMBAT_FACTION_CHANGE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COMBAT_HONOR_GAIN: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COMBAT_MISC_INFO: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COMBAT_XP_GAIN: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_COMMUNITIES_CHANNEL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_CURRENCY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_DND: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_EMOTE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_FILTERED: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_GUILD: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_GUILD_ACHIEVEMENT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_GUILD_DISCORD: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_GUILD_ITEM_LOOTED: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_IGNORED: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_INSTANCE_CHAT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_INSTANCE_CHAT_LEADER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_LOOT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONEY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONSTER_EMOTE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONSTER_PARTY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONSTER_SAY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONSTER_WHISPER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_MONSTER_YELL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_OFFICER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_OPENING: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PARTY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PARTY_LEADER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PET_BATTLE_COMBAT_LOG: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PET_BATTLE_INFO: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PET_INFO: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_PING: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RAID: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RAID_BOSS_EMOTE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RAID_BOSS_WHISPER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RAID_LEADER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RAID_WARNING: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_RESTRICTED: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_SAY: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_SKILL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_SYSTEM: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_TARGETICONS: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_TEXT_EMOTE: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_TRADESKILLS: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_VOICE_TEXT: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_WHISPER: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_WHISPER_INFORM: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_MSG_YELL: [text: string, playerName: string, languageName: string, channelName: string, playerName2: string, specialFlags: string, zoneChannelID: number, channelIndex: number, channelBaseName: string, languageID: number, lineID: number, guid: string, bnSenderID: number, isMobile: boolean, isSubtitle: boolean, hideSenderInLetterbox: boolean, suppressRaidIcons: boolean, discordInfo: DiscordChatInfo];
    /** @remarks Synchronous event. */
    CHAT_REGIONAL_SEND_FAILED: [];
    /** @remarks Synchronous event. */
    CHAT_REGIONAL_STATUS_CHANGED: [isServiceAvailable: boolean];
    /** @remarks Synchronous event. */
    CHAT_SERVER_DISCONNECTED: [isInitialMessage: boolean | undefined];
    /** @remarks Synchronous event. */
    CHAT_SERVER_RECONNECTED: [];
    /** @remarks Synchronous event. */
    CHEST_REWARDS_UPDATED_FROM_SERVER: [];
    /** @remarks Synchronous event. */
    CINEMATIC_START: [canBeCancelled: boolean, forcedAspectRatio: Enum.CameraModeAspectRatio];
    /** @remarks Synchronous event. */
    CINEMATIC_STOP: [];
    CLASS_TALENTS_SWITCH_TO_LOADOUT_BY_INDEX: [loadoutIndex: number];
    CLASS_TALENTS_SWITCH_TO_LOADOUT_BY_NAME: [loadoutName: string];
    CLASS_TALENTS_SWITCH_TO_SPECIALIZATION_BY_INDEX: [specIndex: number];
    CLASS_TALENTS_SWITCH_TO_SPECIALIZATION_BY_NAME: [specName: string];
    /** @remarks Synchronous event. */
    CLASS_TRIAL_TIMER_START: [];
    /** @remarks Synchronous event. */
    CLASS_TRIAL_UPGRADE_COMPLETE: [];
    /** @remarks Synchronous event. */
    CLEAR_BOSS_EMOTES: [];
    /** @remarks Synchronous event. */
    CLICKBINDINGS_SET_HIGHLIGHTS_SHOWN: [showHighlights: boolean];
    /** @remarks Synchronous event. */
    CLIENT_SCENE_CLOSED: [];
    /** @remarks Synchronous event. */
    CLIENT_SCENE_OPENED: [sceneType: Enum.ClientSceneType];
    /** @remarks Synchronous event. */
    CLOSE_CHARTER_CONFIRMATION_UI: [];
    /** @remarks Synchronous event. */
    CLOSE_CREATE_CHARTER_NEIGHBORHOOD_UI: [];
    /** @remarks Synchronous event. */
    CLOSE_CREATE_GUILD_NEIGHBORHOOD_UI: [];
    /** @remarks Synchronous event. */
    CLOSE_INBOX_ITEM: [mailIndex: number];
    /** @remarks Synchronous event. */
    CLOSE_PLOT_CORNERSTONE: [];
    /** @remarks Synchronous event. */
    CLOSE_TABARD_FRAME: [];
    /** @remarks Synchronous event. */
    CLUB_ADDED: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_ERROR: [action: Enum.ClubActionType, error: Enum.ClubErrorType, clubType: Enum.ClubType];
    /** @remarks Synchronous event. */
    CLUB_FINDER_APPLICANT_INVITE_RECIEVED: [clubFinderGUIDs: string[]];
    /** @remarks Synchronous event. */
    CLUB_FINDER_APPLICATIONS_UPDATED: [type: Enum.ClubFinderRequestType, clubFinderGUIDs: string[]];
    /** @remarks Synchronous event. */
    CLUB_FINDER_CAN_WHISPER_APPLICANT: [applicant: string];
    /**
     * Signals when we recieve club data that can be used
     * @remarks Synchronous event.
     */
    CLUB_FINDER_CLUB_LIST_RETURNED: [type: Enum.ClubFinderRequestType];
    /**
     * Sends an update to the UI about a reported guild or community.
     * @remarks Synchronous event.
     */
    CLUB_FINDER_CLUB_REPORTED: [type: Enum.ClubFinderRequestType, clubFinderGUID: string];
    /**
     * Signals to the UI that you (the player) have joined a community offline.
     * @remarks Synchronous event.
     */
    CLUB_FINDER_COMMUNITY_OFFLINE_JOIN: [clubId: string];
    /**
     * Sends an update to the UI that the club finder feature has been enabled or disabled.
     * @remarks Synchronous event.
     */
    CLUB_FINDER_ENABLED_OR_DISABLED: [];
    /**
     * Sends an update to the UI if the realm name of a guild was found asynchronously.
     * @remarks Synchronous event.
     */
    CLUB_FINDER_GUILD_REALM_NAME_UPDATED: [clubFinderGUID: string, realmName: string];
    /**
     * When a player clicks a club link, this returns that information back about the club they clicked on
     * @remarks Synchronous event.
     */
    CLUB_FINDER_LINKED_CLUB_RETURNED: [clubInfo: RecruitingClubInfo];
    /** @remarks Synchronous event. */
    CLUB_FINDER_MEMBERSHIP_LIST_CHANGED: [];
    /** @remarks Synchronous event. */
    CLUB_FINDER_PLAYER_PENDING_LIST_RECIEVED: [type: Enum.ClubFinderRequestType];
    /** @remarks Synchronous event. */
    CLUB_FINDER_POST_UPDATED: [clubFinderGUIDs: string[]];
    /** @remarks Synchronous event. */
    CLUB_FINDER_RECRUIT_LIST_CHANGED: [];
    /**
     * Signals when our recruitment post we just requested is returned back to us
     * @remarks Synchronous event.
     */
    CLUB_FINDER_RECRUITMENT_POST_RETURNED: [type: Enum.ClubFinderRequestType];
    /**
     * Signals when we recieve the recruits list
     * @remarks Synchronous event.
     */
    CLUB_FINDER_RECRUITS_UPDATED: [type: Enum.ClubFinderRequestType];
    /** @remarks Synchronous event. */
    CLUB_INVITATION_ADDED_FOR_SELF: [invitation: ClubSelfInvitationInfo];
    /** @remarks Synchronous event. */
    CLUB_INVITATION_REMOVED_FOR_SELF: [invitationId: string];
    /** @remarks Synchronous event. */
    CLUB_INVITATIONS_RECEIVED_FOR_CLUB: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_MEMBER_ADDED: [clubId: string, memberId: string];
    /** @remarks Synchronous event. */
    CLUB_MEMBER_PRESENCE_UPDATED: [clubId: string, memberId: string, presence: Enum.ClubMemberPresence];
    /** @remarks Synchronous event. */
    CLUB_MEMBER_REMOVED: [clubId: string, memberId: string];
    /** @remarks Synchronous event. */
    CLUB_MEMBER_ROLE_UPDATED: [clubId: string, memberId: string, roleId: number];
    /** @remarks Synchronous event. */
    CLUB_MEMBER_UPDATED: [clubId: string, memberId: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CLUB_MEMBERS_UPDATED: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_MESSAGE_ADDED: [clubId: string, streamId: string, messageId: ClubMessageIdentifier];
    /** @remarks Synchronous event. */
    CLUB_MESSAGE_HISTORY_RECEIVED: [clubId: string, streamId: string, downloadedRange: ClubMessageRange, contiguousRange: ClubMessageRange];
    /** @remarks Synchronous event. */
    CLUB_MESSAGE_UPDATED: [clubId: string, streamId: string, messageId: ClubMessageIdentifier];
    /** @remarks Synchronous event. */
    CLUB_REMOVED: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_REMOVED_MESSAGE: [clubName: string, clubRemovedReason: Enum.ClubRemovedReason];
    /** @remarks Synchronous event. */
    CLUB_SELF_MEMBER_ROLE_UPDATED: [clubId: string, roleId: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    CLUB_STREAM_ADDED: [clubId: string, streamId: string];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    CLUB_STREAM_REMOVED: [clubId: string, streamId: string];
    /** @remarks Synchronous event. */
    CLUB_STREAM_SUBSCRIBED: [clubId: string, streamId: string];
    /** @remarks Synchronous event. */
    CLUB_STREAM_UNSUBSCRIBED: [clubId: string, streamId: string];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    CLUB_STREAM_UPDATED: [clubId: string, streamId: string];
    /** @remarks Synchronous event. */
    CLUB_STREAMS_LOADED: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_TICKET_CREATED: [clubId: string, ticketInfo: ClubTicketInfo];
    /** @remarks Synchronous event. */
    CLUB_TICKET_RECEIVED: [ticket: string];
    /** @remarks Synchronous event. */
    CLUB_TICKETS_RECEIVED: [clubId: string];
    /** @remarks Synchronous event. */
    CLUB_UPDATED: [clubId: string];
    /** @remarks Synchronous event. */
    COLOR_OVERRIDE_UPDATED: [overrideType: Enum.ColorOverride];
    /** @remarks Synchronous event. */
    COLOR_OVERRIDES_RESET: [];
    COMBAT_LOG_APPLY_FILTER_SETTINGS: [filterSettings: any];
    /** @remarks Synchronous event. */
    COMBAT_LOG_ENTRIES_CLEARED: [];
    /** @remarks Synchronous event. */
    COMBAT_LOG_EVENT: [];
    /** @remarks Synchronous event. */
    COMBAT_LOG_EVENT_INTERNAL_UNFILTERED: [];
    /** @remarks Synchronous event. */
    COMBAT_LOG_EVENT_UNFILTERED: [];
    /** @remarks Synchronous event. */
    COMBAT_LOG_MESSAGE: [message: string, colorR: number, colorG: number, colorB: number, order: Enum.CombatLogMessageOrder];
    /** @remarks Synchronous event. */
    COMBAT_LOG_MESSAGE_LIMIT_CHANGED: [messageLimit: number];
    COMBAT_LOG_REFILTER_ENTRIES: [];
    /** @remarks Synchronous event. */
    COMBAT_RATING_UPDATE: [];
    /** @remarks Synchronous event. */
    COMBAT_TEXT_UPDATE: [combatTextType: string];
    /** @remarks Synchronous event. */
    COMBO_TARGET_CHANGED: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_COMBAT_EVENT: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_ENTER_WORLD: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_HISTORY_FLUSHED: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_IMMEDIATE_FOV_UPDATE: [fov: number];
    /** @remarks Synchronous event. */
    COMMENTATOR_MAP_UPDATE: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_PLAYER_NAME_OVERRIDE_UPDATE: [nameToOverride: string, overrideName: string | undefined];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    COMMENTATOR_PLAYER_UPDATE: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_RESET_SETTINGS: [];
    /** @remarks Synchronous event. */
    COMMENTATOR_TEAM_NAME_UPDATE: [teamName: string];
    /** @remarks Synchronous event. */
    COMMENTATOR_TEAMS_SWAPPED: [swapped: boolean];
    /** @remarks Synchronous event. */
    COMMODITY_PRICE_UNAVAILABLE: [];
    /** @remarks Synchronous event. */
    COMMODITY_PRICE_UPDATED: [updatedUnitPrice: number, updatedTotalPrice: number];
    /** @remarks Synchronous event. */
    COMMODITY_PURCHASE_FAILED: [];
    /** @remarks Synchronous event. */
    COMMODITY_PURCHASE_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    COMMODITY_PURCHASED: [itemID: number, quantity: number];
    /** @remarks Synchronous event. */
    COMMODITY_SEARCH_RESULTS_ADDED: [itemID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    COMMODITY_SEARCH_RESULTS_RECEIVED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    COMMODITY_SEARCH_RESULTS_UPDATED: [itemID: number];
    /** @remarks Synchronous event. */
    COMPACT_UNIT_FRAME_PROFILES_LOADED: [];
    /** @remarks Synchronous event. */
    COMPANION_LEARNED: [];
    /** @remarks Synchronous event. */
    COMPANION_UNLEARNED: [];
    /** @remarks Synchronous event. */
    COMPANION_UPDATE: [companionType: string | undefined];
    /** @remarks Synchronous event. */
    CONFIG_COMMIT_FAILED: [configID: number];
    /** @remarks Synchronous event. */
    CONFIRM_BATTLE_NET_FRIEND_INVITE_SHOW: [name: string, friendLevel: Enum.BattleNetFriendLevel];
    /** @remarks Synchronous event. */
    CONFIRM_BEFORE_USE: [];
    /** @remarks Synchronous event. */
    CONFIRM_BINDER: [areaName: string];
    /** @remarks Synchronous event. */
    CONFIRM_DISENCHANT_ROLL: [rollID: number, rollType: number];
    /** @remarks Synchronous event. */
    CONFIRM_LOOT_ROLL: [rollID: number, rollType: number, confirmReason: string];
    /** @remarks Synchronous event. */
    CONFIRM_PET_UNLEARN: [cost: number];
    /** @remarks Synchronous event. */
    CONFIRM_SUMMON: [summonReason: number, skippingStartExperience: boolean];
    /** @remarks Synchronous event. */
    CONFIRM_TALENT_WIPE: [cost: number, respecType: number];
    /** @remarks Synchronous event. */
    CONFIRM_XP_LOSS: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CONSOLE_CLEAR: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CONSOLE_COLORS_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CONSOLE_FONT_SIZE_CHANGED: [];
    /** @remarks Synchronous event. */
    CONSOLE_LOG: [message: string];
    /** @remarks Synchronous event. */
    CONSOLE_MESSAGE: [message: string, colorType: number];
    /** @remarks Synchronous event. */
    CONTENT_TRACKING_IS_ENABLED_UPDATE: [isEnabled: boolean];
    /** @remarks Synchronous event. */
    CONTENT_TRACKING_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    CONTENT_TRACKING_UPDATE: [type: Enum.ContentTrackingType, id: number, isTracked: boolean];
    /** @remarks Synchronous event. */
    CONTRIBUTION_CHANGED: [state: Enum.ContributionState, result: Enum.ContributionResult, name: string, contributionID: number];
    /** @remarks Synchronous event. */
    CONTRIBUTION_COLLECTOR_PENDING: [contributionID: number, isPending: boolean, result: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    CONTRIBUTION_COLLECTOR_UPDATE: [];
    /** @remarks Synchronous event. */
    CONTRIBUTION_COLLECTOR_UPDATE_SINGLE: [contributionID: number];
    /** @remarks Synchronous event. */
    CONVERT_TO_BIND_TO_ACCOUNT_CONFIRM: [];
    /** @remarks Synchronous event. */
    CONVERT_TO_RAID_CONFIRMATION: [];
    /** @remarks Synchronous event. */
    COOLDOWN_VIEWER_DATA_LOADED: [];
    /** @remarks Synchronous event. */
    COOLDOWN_VIEWER_SPELL_OVERRIDE_UPDATED: [baseSpellID: number, overrideSpellID: number | undefined];
    /** @remarks Synchronous event. */
    COOLDOWN_VIEWER_TABLE_HOTFIXED: [];
    /** @remarks Synchronous event. */
    CORPSE_IN_INSTANCE: [];
    /** @remarks Synchronous event. */
    CORPSE_IN_RANGE: [];
    /** @remarks Synchronous event. */
    CORPSE_OUT_OF_RANGE: [];
    /** @remarks Synchronous event. */
    COVENANT_CALLINGS_UPDATED: [callings: BountyInfo[]];
    /** @remarks Synchronous event. */
    COVENANT_CHOSEN: [covenantID: number];
    /** @remarks Synchronous event. */
    COVENANT_PREVIEW_CLOSE: [];
    /** @remarks Synchronous event. */
    COVENANT_PREVIEW_OPEN: [previewInfo: CovenantPreviewInfo];
    /** @remarks Synchronous event. */
    COVENANT_RENOWN_CATCH_UP_STATE_UPDATE: [];
    /** @remarks Synchronous event. */
    COVENANT_SANCTUM_RENOWN_LEVEL_CHANGED: [newRenownLevel: number, oldRenownLevel: number];
    /** @remarks Synchronous event. */
    CRAFTING_DETAILS_UPDATE: [];
    /** @remarks Synchronous event. */
    CRAFTING_HOUSE_DISABLED: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CAN_REQUEST: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CLAIM_ORDER_RESPONSE: [result: Enum.CraftingOrderResult, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CLAIMED_ORDER_ADDED: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CLAIMED_ORDER_REMOVED: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CLAIMED_ORDER_UPDATED: [orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CRAFT_ORDER_RESPONSE: [result: Enum.CraftingOrderResult, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CUSTOMER_FAVORITES_CHANGED: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_CUSTOMER_OPTIONS_PARSED: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_DISPLAY_CRAFTER_FULFILLED_MSG: [orderTypeString: string, itemNameString: string, playerNameString: string, tipAmount: number, quantityCrafted: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_FULFILL_ORDER_RESPONSE: [result: Enum.CraftingOrderResult, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_HIDE_CRAFTER: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_HIDE_CUSTOMER: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_ORDER_CANCEL_RESPONSE: [result: Enum.CraftingOrderResult];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_ORDER_PLACEMENT_RESPONSE: [result: Enum.CraftingOrderResult];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_REJECT_ORDER_RESPONSE: [result: Enum.CraftingOrderResult, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_RELEASE_ORDER_RESPONSE: [result: Enum.CraftingOrderResult, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_SHOW_CRAFTER: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_SHOW_CUSTOMER: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_UNEXPECTED_ERROR: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_UPDATE_CUSTOMER_NAME: [customerName: string, orderID: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_UPDATE_ORDER_COUNT: [orderType: Enum.CraftingOrderType, numOrders: number];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_UPDATE_PERSONAL_ORDER_COUNTS: [];
    /** @remarks Synchronous event. */
    CRAFTINGORDERS_UPDATE_REWARDS: [npcOrderRewards: CraftingOrderRewardInfo[], orderID: number];
    /** @remarks Synchronous event. */
    CREATE_NEIGHBORHOOD_RESULT: [result: Enum.HousingResult, neighborhoodName: string | undefined];
    /** @remarks Synchronous event. */
    CRITERIA_COMPLETE: [criteriaID: number];
    /** @remarks Synchronous event. */
    CRITERIA_EARNED: [achievementID: number, description: string, achievementAlreadyEarnedOnAccount: boolean];
    /** @remarks Synchronous event. */
    CRITERIA_UPDATE: [];
    /** @remarks Synchronous event. */
    CURRENCY_DISPLAY_UPDATE: [currencyType: number | undefined, quantity: number | undefined, quantityChange: number | undefined, quantityGainSource: number | undefined, destroyReason: number | undefined];
    /** @remarks Synchronous event. */
    CURRENCY_TRANSFER_FAILED: [failureReason: Enum.AccountCurrencyTransferResult];
    /** @remarks Synchronous event. */
    CURRENCY_TRANSFER_INITIATED: [];
    /** @remarks Synchronous event. */
    CURRENCY_TRANSFER_LOG_UPDATE: [];
    /** @remarks Synchronous event. */
    CURRENCY_TRANSFER_SUCCESS: [];
    /** @remarks Synchronous event. */
    CURRENT_HOUSE_INFO_RECIEVED: [houseInfo: HouseInfo];
    /** @remarks Synchronous event. */
    CURRENT_HOUSE_INFO_UPDATED: [houseInfo: HouseInfo];
    /** @remarks Synchronous event. */
    CURRENT_SPELL_CAST_CHANGED: [cancelledCast: boolean];
    /** @remarks Synchronous event. */
    CURSOR_CHANGED: [isDefault: boolean, newCursorType: Enum.UICursorType, oldCursorType: Enum.UICursorType, oldCursorVirtualID: number];
    /** @remarks Synchronous event. */
    CVAR_UPDATE: [eventName: string, value: string];
    /** @remarks Synchronous event. */
    DAILY_RESET_INSTANCE_WELCOME: [mapname: string, timeLeft: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    DAMAGE_METER_COMBAT_SESSION_UPDATED: [type: Enum.DamageMeterType, sessionID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    DAMAGE_METER_CURRENT_SESSION_UPDATED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    DAMAGE_METER_RESET: [];
    /** @remarks Synchronous event. */
    DECLINE_NEIGHBORHOOD_INVITATION_RESPONSE: [success: boolean];
    /** @remarks Synchronous event. */
    DELETE_ITEM_CONFIRM: [itemName: string, qualityID: number, bonding: number, questWarn: number, itemGUID: string | undefined];
    /**
     * Signaled when an assist action occurs in a delve.
     * @remarks Synchronous event.
     */
    DELVE_ASSIST_ACTION: [data: DelveAssistActionData];
    /**
     * Signaled when player account data element(s) have changed. This drives curio ranks, and the UI should update when this is sent.
     * @remarks Synchronous event.
     */
    DELVES_ACCOUNT_DATA_ELEMENT_CHANGED: [];
    /**
     * Signaled when the game time transitions between day and night.
     * @remarks Synchronous event.
     */
    DIEL_CYCLE_CHANGED: [isDayTime: boolean];
    /** @remarks Synchronous event. */
    DISABLE_DECLINE_GUILD_INVITE: [];
    /** @remarks Synchronous event. */
    DISABLE_LOW_LEVEL_RAID: [];
    /** @remarks Synchronous event. */
    DISABLE_TAXI_BENCHMARK: [];
    /** @remarks Synchronous event. */
    DISABLE_XP_GAIN: [];
    /** @remarks Synchronous event. */
    DISCORD_GUILD_ACHIEVEMENT: [achievementID: number];
    /** @remarks Synchronous event. */
    DISCORD_GUILD_LOBBY_UPDATE: [];
    /** @remarks Synchronous event. */
    DISCORD_GUILD_SETTINGS_UPDATE: [];
    /** @remarks Synchronous event. */
    DISCORD_LINK_UPDATE: [];
    /** @remarks Synchronous event. */
    DISCORD_SERVER_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    DISCORD_STATUS_UPDATE: [];
    /** @remarks Synchronous event. */
    DISPLAY_EVENT_TOAST_LINK: [link: string];
    /** @remarks Synchronous event. */
    DISPLAY_EVENT_TOASTS: [];
    /** @remarks Synchronous event. */
    DISPLAY_SIZE_CHANGED: [];
    /** @remarks Synchronous event. */
    DUEL_FINISHED: [];
    /** @remarks Synchronous event. */
    DUEL_INBOUNDS: [];
    /** @remarks Synchronous event. */
    DUEL_OUTOFBOUNDS: [];
    /** @remarks Synchronous event. */
    DUEL_REQUESTED: [playerName: string];
    /** @remarks Synchronous event. */
    DUEL_TO_THE_DEATH_REQUESTED: [playerName: string];
    /** @remarks Synchronous event. */
    DYE_COLOR_CATEGORY_UPDATED: [dyeColorCategoryID: number];
    /** @remarks Synchronous event. */
    DYE_COLOR_UPDATED: [dyeColorID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    DYNAMIC_GOSSIP_POI_UPDATED: [];
    /** @remarks Synchronous event. */
    ECLIPSE_DIRECTION_CHANGE: [direction: string];
    /** @remarks Synchronous event. */
    EDIT_MODE_LAYOUTS_UPDATED: [layoutInfo: EditModeLayouts, reconcileLayouts: boolean];
    /** @remarks Synchronous event. */
    EJ_DIFFICULTY_UPDATE: [difficultyID: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    EJ_LOOT_DATA_RECIEVED: [itemID: number | undefined];
    /** @remarks Synchronous event. */
    ENABLE_DECLINE_GUILD_INVITE: [];
    /** @remarks Synchronous event. */
    ENABLE_LOW_LEVEL_RAID: [];
    /** @remarks Synchronous event. */
    ENABLE_TAXI_BENCHMARK: [];
    /** @remarks Synchronous event. */
    ENABLE_XP_GAIN: [];
    /** @remarks Synchronous event. */
    ENCHANT_SPELL_COMPLETED: [successful: boolean, enchantedItem: ItemLocationMixin | undefined];
    /** @remarks Synchronous event. */
    ENCHANT_SPELL_SELECTED: [];
    /** @remarks Synchronous event. */
    ENCOUNTER_END: [encounterID: number, encounterName: string, difficultyID: number, groupSize: number, success: number, encounterUnitStatus: EncounterUnitStatus[]];
    /** @remarks Synchronous event. */
    ENCOUNTER_LOOT_RECEIVED: [encounterID: number, itemID: number, itemLink: string, quantity: number, itemName: string, fileName: string];
    /** @remarks Synchronous event. */
    ENCOUNTER_START: [encounterID: number, encounterName: string, difficultyID: number, groupSize: number];
    /**
     * Signaled when the in-progress state of an encounter changes.
     * @remarks Synchronous event.
     */
    ENCOUNTER_STATE_CHANGED: [isInProgress: boolean];
    /**
     * Fired when an event has been added to the timeline.
     * @remarks Synchronous event.
     */
    ENCOUNTER_TIMELINE_EVENT_ADDED: [eventInfo: EncounterTimelineEventInfo];
    /**
     * Fired when an event has transitioned into or out of a 'blocked' status.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_BLOCK_STATE_CHANGED: [eventID: EncounterTimelineEventID];
    /**
     * Fired when an event has met a condition that should trigger a color change.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_COLOR_CHANGED: [eventID: EncounterTimelineEventID];
    /**
     * Fired when an event has met a condition that should trigger its highlight glow animation.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_HIGHLIGHT: [eventID: EncounterTimelineEventID];
    /**
     * Fired when an event has been removed from the timeline. This is guaranteed to fire after an event has transitioned to a 'final' state such as Canceled or Finished, and will be delayed at least one game tick to allow for API queries to still access event data in OnUpdate scripts. This is fired post-removal of the event, and so queries using the supplied event ID will return nil.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_REMOVED: [eventID: EncounterTimelineEventID];
    /**
     * Fired when an event has changed state.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_STATE_CHANGED: [eventID: EncounterTimelineEventID];
    /**
     * Fired when an event has changed track, or has been re-ordered within its existing track.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_EVENT_TRACK_CHANGED: [eventID: EncounterTimelineEventID];
    /**
     * Fired when the layout of tracks on the timeline has been updated. This can include changes to the minimum or maximum durations of tracks.
     * @remarks Synchronous event.
     */
    ENCOUNTER_TIMELINE_LAYOUT_UPDATED: [];
    /**
     * Signaled when conditions controlling the visibility of the encounter timeline are updated.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    ENCOUNTER_TIMELINE_STATE_UPDATED: [];
    /**
     * Fired when a new timeline view is being activated. This is fired after a full layout and timeline data update, allowing the UI to immediately query the API and get usable results.
     * @remarks Synchronous event.
     */
    ENCOUNTER_TIMELINE_VIEW_ACTIVATED: [viewType: Enum.EncounterTimelineViewType];
    /**
     * Fired when the current timeline view is being deactivated. The UI should clear all stored timeline event data and release all frames back to pools during this event.
     * @remarks Synchronous event.
     */
    ENCOUNTER_TIMELINE_VIEW_DEACTIVATED: [viewType: Enum.EncounterTimelineViewType];
    /** @remarks Synchronous event. */
    ENCOUNTER_WARNING: [encounterWarningInfo: EncounterWarningInfo];
    /** @remarks Synchronous event. */
    END_BOUND_TRADEABLE: [reason: string];
    /** @remarks Synchronous event. */
    ENTERED_DIFFERENT_INSTANCE_FROM_PARTY: [];
    /** @remarks Synchronous event. */
    ENTITLEMENT_DELIVERED: [entitlementType: Enum.WoWEntitlementType, textureID: number, name: string, payloadID: number | undefined, showFancyToast: boolean];
    /** @remarks Synchronous event. */
    EQUIP_BIND_CONFIRM: [slot: number, itemLocation: ItemLocationMixin];
    /** @remarks Synchronous event. */
    EQUIP_BIND_REFUNDABLE_CONFIRM: [slot: number, itemLocation: ItemLocationMixin];
    /** @remarks Synchronous event. */
    EQUIP_BIND_TRADEABLE_CONFIRM: [slot: number, itemLocation: ItemLocationMixin];
    /** @remarks Synchronous event. */
    EQUIPMENT_SETS_CHANGED: [];
    /** @remarks Synchronous event. */
    EQUIPMENT_SWAP_FINISHED: [result: boolean, setID: number | undefined];
    /** @remarks Synchronous event. */
    EQUIPMENT_SWAP_PENDING: [];
    /** @remarks Synchronous event. */
    EVENT_REALM_QUEUES_UPDATED: [eventRealmQueues: Enum.EventRealmQueues];
    /** @remarks Synchronous event. */
    EVENT_SCHEDULER_UPDATE: [];
    /** @remarks Synchronous event. */
    EXPAND_BAG_BAR_CHANGED: [expandBagBar: boolean];
    /** @remarks Synchronous event. */
    EXTERNAL_EVENT_LAUNCH_URL_RESULT: [result: boolean];
    /** @remarks Synchronous event. */
    EXTERNAL_EVENT_URL_CHANGED: [];
    /** @remarks Synchronous event. */
    EXTRA_BROWSE_INFO_RECEIVED: [itemID: number];
    /** @remarks Synchronous event. */
    FACTION_STANDING_CHANGED: [factionID: number, updatedStanding: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    FIRST_FRAME_RENDERED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    FOG_OF_WAR_UPDATED: [];
    /** @remarks Synchronous event. */
    FORBIDDEN_NAME_PLATE_CREATED: [namePlateFrame: NamePlate];
    /** @remarks Synchronous event. */
    FORBIDDEN_NAME_PLATE_UNIT_ADDED: [unitToken: Enum.UnitTokenType];
    /** @remarks Synchronous event. */
    FORBIDDEN_NAME_PLATE_UNIT_REMOVED: [unitToken: Enum.UnitTokenType];
    /** @remarks Synchronous event. */
    FORCE_REFRESH_HOUSE_FINDER: [];
    /** @remarks Synchronous event. */
    FRAME_MANAGER_UPDATE_ALL: [];
    /** @remarks Synchronous event. */
    FRAME_MANAGER_UPDATE_FRAME: [type: Enum.UIFrameType, show: boolean];
    /** @remarks Synchronous event. */
    FRIENDLIST_UPDATE: [];
    /** @remarks Synchronous event. */
    FULLSCREEN_BROWSER_SPINNER_HIDE: [];
    /** @remarks Synchronous event. */
    FULLSCREEN_BROWSER_SPINNER_SHOW: [];
    /** @remarks Synchronous event. */
    GAME_MODE_DISPLAY_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    GAME_MODE_DISPLAY_MODE_TOGGLE_DISABLED: [gameModeRecordID: number, disabled: boolean];
    /** @remarks Synchronous event. */
    GAME_PAD_ACTIVE_CHANGED: [isActive: boolean];
    /** @remarks Synchronous event. */
    GAME_PAD_ALLOW_HOVER_EVENTS_WITH_FREE_LOOK_CHANGED: [enabled: boolean];
    /** @remarks Synchronous event. */
    GAME_PAD_CONFIGS_CHANGED: [];
    /** @remarks Synchronous event. */
    GAME_PAD_CONNECTED: [];
    /** @remarks Synchronous event. */
    GAME_PAD_DISCONNECTED: [];
    /** @remarks Synchronous event. */
    GAME_PAD_POWER_CHANGED: [powerLevel: Enum.GamePadPowerLevel];
    /** @remarks Synchronous event. */
    GAME_RULES_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GAMEPAD_POSSESS_BAR_OVERRIDE_CHANGED: [oldOverride: Enum.GamepadPossessBarOverride, newOverride: Enum.GamepadPossessBarOverride];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GAMEPAD_STANCE_BAR_OVERRIDE_CHANGED: [oldOverride: Enum.GamepadStanceBarOverride, newOverride: Enum.GamepadStanceBarOverride];
    /** @remarks Synchronous event. */
    GARRISON_ARCHITECT_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_ARCHITECT_OPENED: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_ACTIVATABLE: [buildingName: string, garrisonType: number];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_ACTIVATED: [garrisonPlotInstanceID: number, garrisonBuildingID: number];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_ERROR: [];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_LIST_UPDATE: [categoryID: number];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_PLACED: [garrisonPlotInstanceID: number, newPlacement: boolean];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_REMOVED: [garrPlotInstanceID: number, garrBuildingID: number];
    /** @remarks Synchronous event. */
    GARRISON_BUILDING_UPDATE: [garrisonBuildingID: number, garrPlotInstanceID: number | undefined];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_ADDED: [followerDbID: GarrisonFollower, followerName: string, followerClassName: string, followerLevel: number, followerQuality: number, isUpgraded: boolean, textureKit: string, followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_CATEGORIES_UPDATED: [];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_DURABILITY_CHANGED: [garrFollowerTypeID: number, followerDbID: GarrisonFollower, followerDurability: number];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_HEALED: [followerID: GarrisonFollower];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_LIST_UPDATE: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_REMOVED: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_UPGRADED: [followerDbID: GarrisonFollower];
    /** @remarks Synchronous event. */
    GARRISON_FOLLOWER_XP_CHANGED: [garrFollowerTypeID: number, followerDbID: GarrisonFollower, xpChange: number, oldFollowerXp: number, oldFollowerLevel: number, oldFollowerQuality: number];
    /** @remarks Synchronous event. */
    GARRISON_HIDE_LANDING_PAGE: [];
    /** @remarks Synchronous event. */
    GARRISON_INVASION_AVAILABLE: [];
    /** @remarks Synchronous event. */
    GARRISON_INVASION_UNAVAILABLE: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    GARRISON_LANDINGPAGE_SHIPMENTS: [];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_AREA_BONUS_ADDED: [garrisonMissonBonusAbilityID: number];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_BONUS_ROLL_COMPLETE: [missionID: number, success: boolean];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_BONUS_ROLL_LOOT: [itemID: number, quantity: number];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_COMPLETE_RESPONSE: [missionID: number, canComplete: boolean, success: boolean, bonusRollSuccess: boolean, followerDeaths: GarrisonFollowerDeathInfo[], autoCombatResult: AutoCombatResult | undefined];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_FINISHED: [followerTypeID: number, missionID: number];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_LIST_UPDATE: [garrFollowerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_NPC_OPENED: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_REWARD_INFO: [missionID: number, followerDbID: GarrisonFollower];
    /** @remarks Synchronous event. */
    GARRISON_MISSION_STARTED: [garrFollowerTypeID: number, missionID: number];
    /** @remarks Synchronous event. */
    GARRISON_MONUMENT_CLOSE_UI: [];
    /** @remarks Synchronous event. */
    GARRISON_MONUMENT_LIST_LOADED: [success: boolean];
    /** @remarks Synchronous event. */
    GARRISON_MONUMENT_REPLACED: [success: boolean];
    /** @remarks Synchronous event. */
    GARRISON_MONUMENT_SELECTED_TROPHY_ID_LOADED: [success: boolean];
    /** @remarks Synchronous event. */
    GARRISON_MONUMENT_SHOW_UI: [];
    /** @remarks Synchronous event. */
    GARRISON_RANDOM_MISSION_ADDED: [followerTypeID: number, missionID: number];
    /** @remarks Synchronous event. */
    GARRISON_RECALL_PORTAL_LAST_USED_TIME: [success: boolean, recallPortalLastUsedTime: number];
    /** @remarks Synchronous event. */
    GARRISON_RECALL_PORTAL_USED: [success: boolean];
    /** @remarks Synchronous event. */
    GARRISON_RECRUIT_FOLLOWER_RESULT: [];
    /** @remarks Synchronous event. */
    GARRISON_RECRUITMENT_FOLLOWERS_GENERATED: [];
    /** @remarks Synchronous event. */
    GARRISON_RECRUITMENT_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_RECRUITMENT_NPC_OPENED: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_RECRUITMENT_READY: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GARRISON_SHIPMENT_RECEIVED: [];
    /** @remarks Synchronous event. */
    GARRISON_SHIPYARD_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_SHIPYARD_NPC_OPENED: [followerTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_SHOW_LANDING_PAGE: [];
    /** @remarks Synchronous event. */
    GARRISON_SPEC_GROUP_UPDATED: [garrTypeID: number, specID: number];
    /** @remarks Synchronous event. */
    GARRISON_SPEC_GROUPS_CLEARED: [garrTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_COMPLETE: [garrTypeID: number, doAlert: boolean];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_EVENT_UPDATE: [eventType: number, eventID: number];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_NPC_OPENED: [garrisonTypeID: number, garrisonTalentTreeID: number];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_RESEARCH_STARTED: [garrTypeID: number, garrisonTalentTreeID: number, garrTalentID: number];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_UNLOCKS_RESULT: [];
    /** @remarks Synchronous event. */
    GARRISON_TALENT_UPDATE: [garrTypeID: number];
    /** @remarks Synchronous event. */
    GARRISON_TRADESKILL_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    GARRISON_UPDATE: [];
    /** @remarks Synchronous event. */
    GARRISON_UPGRADEABLE_RESULT: [garrisonUpgradeable: boolean];
    /** @remarks Synchronous event. */
    GARRISON_USE_PARTY_GARRISON_CHANGED: [];
    /** @remarks Synchronous event. */
    GDF_SIM_COMPLETE: [];
    /** @remarks Synchronous event. */
    GENERIC_ERROR: [errorMessage: string];
    /** @remarks Synchronous event. */
    GENERIC_WIDGET_DISPLAY_SHOW: [info: GenericWidgetDisplayFrameInfo];
    /** @remarks Synchronous event. */
    GET_ITEM_INFO_RECEIVED: [itemID: number, success: boolean];
    /** @remarks Synchronous event. */
    GLOBAL_MOUSE_DOWN: [button: string];
    /** @remarks Synchronous event. */
    GLOBAL_MOUSE_UP: [button: string];
    /** @remarks Synchronous event. */
    GLOBAL_REGION_MOUSE_DOWN: [region: ScriptRegion, button: string];
    /** @remarks Synchronous event. */
    GLOBAL_REGION_MOUSE_UP: [region: ScriptRegion, button: string];
    /** @remarks Synchronous event. */
    GLUE_SCREENSHOT_FAILED: [];
    /** @remarks Synchronous event. */
    GLUE_SCREENSHOT_STARTED: [];
    /** @remarks Synchronous event. */
    GLUE_SCREENSHOT_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    GM_PLAYER_INFO: [name: string, info: string];
    /** @remarks Synchronous event. */
    GOSSIP_CLOSED: [interactionIsContinuing: boolean];
    /** @remarks Synchronous event. */
    GOSSIP_CONFIRM: [gossipID: number, text: string, cost: number];
    /** @remarks Synchronous event. */
    GOSSIP_CONFIRM_CANCEL: [];
    /** @remarks Synchronous event. */
    GOSSIP_ENTER_CODE: [gossipID: number];
    /** @remarks Synchronous event. */
    GOSSIP_OPTIONS_REFRESHED: [];
    /** @remarks Synchronous event. */
    GOSSIP_SHOW: [uiTextureKit: string | undefined];
    /**
     * The payload matches GetGroupBuffVisualAlerts, including linked rank spells.
     * @remarks Synchronous event.
     */
    GROUP_BUFF_VISUAL_ALERTS_CHANGED: [visualAlerts: GroupBuffVisualAlertInfo[]];
    /** @remarks Synchronous event. */
    GROUP_FORMED: [category: number, partyGUID: string];
    /** @remarks Synchronous event. */
    GROUP_INVITE_CONFIRMATION: [];
    /** @remarks Synchronous event. */
    GROUP_JOINED: [category: number, partyGUID: string];
    /** @remarks Synchronous event. */
    GROUP_LEFT: [category: number, partyGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GROUP_ROSTER_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILD_CHALLENGE_COMPLETED: [challengeType: number, currentCount: number, maxCount: number, goldAwarded: number];
    /** @remarks Synchronous event. */
    GUILD_CHALLENGE_UPDATED: [];
    /** @remarks Synchronous event. */
    GUILD_EVENT_LOG_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILD_INVITE_CANCEL: [];
    /** @remarks Synchronous event. */
    GUILD_INVITE_REQUEST: [inviter: string, guildName: string, guildAchievementPoints: number, oldGuildName: string, isNewGuild: boolean | undefined, tabardInfo: GuildTabardInfo | undefined];
    /** @remarks Synchronous event. */
    GUILD_MOTD: [motdText: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GUILD_NEWS_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILD_PARTY_STATE_UPDATED: [inGuildParty: boolean];
    /** @remarks Synchronous event. */
    GUILD_PREFERRED_PLAY_SETTINGS_UPDATED: [status: PreferredPlaySettingsStatus, preferredLocaleID: number, preferredDatacenterLocalityID: number, lastPreferredLocaleChangeDate: number, lastPreferredDatacenterLocalityChangeDate: number];
    /** @remarks Synchronous event. */
    GUILD_RANKS_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILD_RANKS_UPDATE_ACTIVE_PLAYER: [];
    /** @remarks Synchronous event. */
    GUILD_RECIPE_KNOWN_BY_MEMBERS: [];
    /** @remarks Synchronous event. */
    GUILD_REGISTRAR_CLOSED: [];
    /** @remarks Synchronous event. */
    GUILD_REGISTRAR_SHOW: [];
    /** @remarks Synchronous event. */
    GUILD_RENAME_NAME_CHECK: [desiredName: string, status: Enum.GuildErrorType, nameErrorToken: string | undefined];
    /** @remarks Synchronous event. */
    GUILD_RENAME_REFUND_RESULT: [guildName: string, status: Enum.GuildErrorType];
    /** @remarks Synchronous event. */
    GUILD_RENAME_REQUIRED: [flagSet: boolean];
    /** @remarks Synchronous event. */
    GUILD_RENAME_STATUS_UPDATE: [status: GuildRenameStatus];
    /** @remarks Synchronous event. */
    GUILD_REWARDS_LIST: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    GUILD_REWARDS_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILD_ROSTER_UPDATE: [canRequestRosterUpdate: boolean];
    /** @remarks Synchronous event. */
    GUILD_TRADESKILL_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILDBANK_ITEM_LOCK_CHANGED: [];
    /** @remarks Synchronous event. */
    GUILDBANK_TEXT_CHANGED: [guildBankTab: number];
    /** @remarks Synchronous event. */
    GUILDBANK_UPDATE_MONEY: [];
    /** @remarks Synchronous event. */
    GUILDBANK_UPDATE_TABS: [];
    /** @remarks Synchronous event. */
    GUILDBANK_UPDATE_TEXT: [guildBankTab: number];
    /** @remarks Synchronous event. */
    GUILDBANK_UPDATE_WITHDRAWMONEY: [];
    /** @remarks Synchronous event. */
    GUILDBANKBAGSLOTS_CHANGED: [];
    /** @remarks Synchronous event. */
    GUILDBANKFRAME_CLOSED: [];
    /** @remarks Synchronous event. */
    GUILDBANKFRAME_OPENED: [];
    /** @remarks Synchronous event. */
    GUILDBANKLOG_UPDATE: [];
    /** @remarks Synchronous event. */
    GUILDTABARD_UPDATE: [];
    /** @remarks Synchronous event. */
    GX_RESTARTED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HANDLE_UI_ACTION: [actionType: Enum.UIActionType];
    /** @remarks Synchronous event. */
    HARDCORE_DEATHS: [memberName: string];
    /** @remarks Synchronous event. */
    HEARTHSTONE_BOUND: [];
    /** @remarks Synchronous event. */
    HEIRLOOM_UPGRADE_TARGETING_CHANGED: [pendingHeirloomUpgradeSpellcast: boolean];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    HEIRLOOMS_UPDATED: [itemID: number | undefined, updateReason: string | undefined, hideUntilLearned: boolean | undefined];
    /**
     * The payload matches GetHiddenGroupBuffs, including linked rank spells.
     * @remarks Synchronous event.
     */
    HIDDEN_GROUP_BUFFS_CHANGED: [spellIDs: number[]];
    /** @remarks Synchronous event. */
    HIDE_HYPERLINK_TOOLTIP: [];
    /** @remarks Synchronous event. */
    HIDE_SUBTITLE: [];
    /** @remarks Synchronous event. */
    HONOR_LEVEL_UPDATE: [isHigherLevel: boolean];
    /** @remarks Synchronous event. */
    HONOR_XP_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    HOUSE_DECOR_ADDED_TO_CHEST: [decorGUID: string, decorID: number];
    /** @remarks Synchronous event. */
    HOUSE_EDITOR_AVAILABILITY_CHANGED: [];
    /** @remarks Synchronous event. */
    HOUSE_EDITOR_MODE_CHANGE_FAILURE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSE_EDITOR_MODE_CHANGED: [currentEditMode: Enum.HouseEditorMode];
    /** @remarks Synchronous event. */
    HOUSE_EXTERIOR_DECOR_HIDDEN_CHANGED: [isDecorHidden: boolean];
    /** @remarks Synchronous event. */
    HOUSE_EXTERIOR_POSITION_FAILURE: [housingResult: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSE_EXTERIOR_POSITION_SUCCESS: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSE_EXTERIOR_TYPE_UNLOCKED: [fixtureID: number];
    /** @remarks Synchronous event. */
    HOUSE_FINDER_NEIGHBORHOOD_DATA_RECIEVED: [neighborhoodPlots: NeighborhoodPlotMapInfo[]];
    /** @remarks Synchronous event. */
    HOUSE_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    HOUSE_LEVEL_CHANGED: [newHouseLevelInfo: HouseLevelInfo | undefined];
    /** @remarks Synchronous event. */
    HOUSE_LEVEL_FAVOR_UPDATED: [houseLevelFavor: HouseLevelFavor];
    /** @remarks Synchronous event. */
    HOUSE_PLOT_ENTERED: [];
    /** @remarks Synchronous event. */
    HOUSE_PLOT_EXITED: [];
    /** @remarks Synchronous event. */
    HOUSE_RESERVATION_RESPONSE_RECIEVED: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSE_RESET_COMPLETED: [];
    /** @remarks Synchronous event. */
    HOUSE_RESET_FAILED: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BASIC_MODE_HOVERED_TARGET_CHANGED: [hasHoveredTarget: boolean, targetType: Enum.HousingBasicModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_BASIC_MODE_PLACEMENT_FLAGS_UPDATED: [targetType: Enum.HousingBasicModeTargetType, activeFlags: Enum.HousingDecorPlacementRestriction];
    /** @remarks Synchronous event. */
    HOUSING_BASIC_MODE_SELECTED_TARGET_CHANGED: [hasSelectedTarget: boolean, targetType: Enum.HousingBasicModeTargetType, isPreview: boolean];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_COLLECTION_FAILURE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_COLLECTION_RECEIVED: [collection: HousingBlueprintCollection];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_CONTENTS_FAILURE: [blueprintShareCode: string, result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_CONTENTS_RECEIVED: [contentInfo: HousingBlueprintContentInfo];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_DELETE_FAILURE: [blueprintID: number, result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_DELETE_SUCCESS: [blueprintID: number];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_EXPORT_FAILURE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_EXPORT_SUCCESS: [blueprintShareCode: string];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_IMPORT_FAILURE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_IMPORT_STARTED: [];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_IMPORT_SUCCESS: [];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_RENAME_FAILURE: [blueprintID: number, result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINT_RENAME_SUCCESS: [blueprintID: number, name: string];
    /** @remarks Synchronous event. */
    HOUSING_BLUEPRINTS_AVAILABILITY_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_CATALOG_CATEGORY_UPDATED: [categoryID: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_CATALOG_SUBCATEGORY_UPDATED: [subcategoryID: number];
    /** @remarks Synchronous event. */
    HOUSING_CLEANUP_MODE_HOVERED_TARGET_CHANGED: [hasHoveredTarget: boolean, targetType: Enum.HousingCleanupModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_CLEANUP_MODE_TARGET_SELECTED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_CORE_FIXTURE_CHANGED: [coreFixtureType: Enum.HousingFixtureType];
    /** @remarks Synchronous event. */
    HOUSING_CUSTOMIZE_MODE_HOVERED_TARGET_CHANGED: [hasHoveredTarget: boolean, targetType: Enum.HousingCustomizeModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_CUSTOMIZE_MODE_SELECTED_TARGET_CHANGED: [hasSelectedTarget: boolean, targetType: Enum.HousingCustomizeModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_ADD_TO_PREVIEW_LIST: [previewItemData: HousingPreviewItemData];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_CUSTOMIZATION_CHANGED: [decorGUID: string];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_DYE_FAILURE: [decorGUID: string, housingResult: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_FREE_PLACE_STATUS_CHANGED: [isFreePlaceEnabled: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_GRID_SNAP_OCCURRED: [];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_GRID_SNAP_STATUS_CHANGED: [isGridSnapEnabled: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_GRID_VISIBILITY_STATUS_CHANGED: [isGridVisible: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PLACE_FAILURE: [housingResult: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PLACE_SUCCESS: [decorGUID: string, size: Enum.HousingCatalogEntrySize, isNew: boolean, isPreview: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PRECISION_MANIPULATION_EVENT: [event: Enum.TransformManipulatorEvent];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PRECISION_MANIPULATION_STATUS_CHANGED: [isManipulatingSelection: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PRECISION_SUBMODE_CHANGED: [activeSubmode: Enum.HousingPrecisionSubmode | undefined];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PREVIEW_LIST_REMOVE_FROM_WORLD: [decorGUID: string];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PREVIEW_LIST_UPDATED: [];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_PREVIEW_STATE_CHANGED: [isPreviewState: boolean];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_REMOVED: [decorGUID: string];
    /** @remarks Synchronous event. */
    HOUSING_DECOR_SELECT_RESPONSE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_EXPERT_MODE_HOVERED_TARGET_CHANGED: [hasHoveredTarget: boolean, targetType: Enum.HousingExpertModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_EXPERT_MODE_PLACEMENT_FLAGS_UPDATED: [targetType: Enum.HousingExpertModeTargetType, activeFlags: Enum.HousingDecorPlacementRestriction];
    /** @remarks Synchronous event. */
    HOUSING_EXPERT_MODE_SELECTED_TARGET_CHANGED: [hasSelectedTarget: boolean, targetType: Enum.HousingExpertModeTargetType];
    /** @remarks Synchronous event. */
    HOUSING_FIXTURE_HOVER_CHANGED: [anyHovered: boolean];
    /** @remarks Synchronous event. */
    HOUSING_FIXTURE_POINT_FRAME_ADDED: [pointFrame: HousingFixturePointFrame];
    /** @remarks Synchronous event. */
    HOUSING_FIXTURE_POINT_FRAME_RELEASED: [pointFrame: HousingFixturePointFrame];
    /** @remarks Synchronous event. */
    HOUSING_FIXTURE_POINT_FRAMES_RELEASED: [];
    /** @remarks Synchronous event. */
    HOUSING_FIXTURE_POINT_SELECTION_CHANGED: [hasSelection: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_FIXTURE_UNLOCKED: [fixtureID: number];
    /** @remarks Synchronous event. */
    HOUSING_INSPECT_MODE_DECOR_HOVERED_CHANGED: [];
    /** @remarks Synchronous event. */
    HOUSING_INSPECT_MODE_STATE_UPDATED: [];
    /**
     * Fired when one of the door nodes of an already placed room has been selected
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_DOOR_SELECTED: [roomGUID: string, componentID: number];
    /**
     * Fired when one of the door nodes of an already placed room has been selected or deselected
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_DOOR_SELECTION_CHANGED: [hasSelection: boolean];
    /**
     * Fired when an already placed room has either started or stopped being dragged
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_DRAG_TARGET_CHANGED: [isDraggingRoom: boolean];
    /**
     * Fired when a room option in the House Chest has been selected or deselected
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_FLOORPLAN_SELECTION_CHANGED: [hasSelection: boolean, roomID: number, blueprintShareCode: string | undefined];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_OCCUPIED_FLOOR_RANGE_CHANGED: [lowestFloor: number, highestFloor: number];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_PIN_FRAME_ADDED: [pinFrame: HousingLayoutPinFrame];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_PIN_FRAME_RELEASED: [pinFrame: HousingLayoutPinFrame];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_PIN_FRAMES_RELEASED: [];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_ROOM_COMPONENT_THEME_SET_CHANGED: [roomGUID: string, componentID: number, newThemeSet: number, result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_ROOM_MOVE_INVALID: [];
    /**
     * Fired when a previously placed room has been moved to a different position or rotation
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_MOVED: [];
    /**
     * Fired when info for a newly placed room has been recieved while in Layout Mode
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_RECEIVED: [playAddedSound: boolean];
    /**
     * Fired when a previously placed room has been removed while in Layout Mode
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_REMOVED: [];
    /**
     * Fired when a room that was being dragged is let go of without being placed, and is returned to the House Chest
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_RETURNED: [];
    /**
     * Fired when an already placed room has been selected or deselected
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_SELECTION_CHANGED: [hasSelection: boolean];
    /**
     * Fired when a room being dragged has been snapped to a particular door connection
     * @remarks Synchronous event.
     */
    HOUSING_LAYOUT_ROOM_SNAPPED: [];
    /** @remarks Synchronous event. */
    HOUSING_LAYOUT_VIEWED_FLOOR_CHANGED: [floor: number];
    /** @remarks Synchronous event. */
    HOUSING_MARKET_AVAILABILITY_UPDATED: [];
    /** @remarks Synchronous event. */
    HOUSING_NEW_DECOR_PLACE_COMPLETE: [decorGUID: string];
    /** @remarks Synchronous event. */
    HOUSING_NUM_DECOR_PLACED_CHANGED: [];
    /** @remarks Synchronous event. */
    HOUSING_REFUND_LIST_UPDATED: [];
    /** @remarks Synchronous event. */
    HOUSING_ROOM_COMPONENT_CUSTOMIZATION_CHANGE_FAILED: [roomGUID: string, componentID: number, housingResult: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_ROOM_COMPONENT_CUSTOMIZATION_CHANGED: [roomGUID: string, componentID: number];
    /** @remarks Synchronous event. */
    HOUSING_SERVICES_AVAILABILITY_UPDATED: [];
    /** @remarks Synchronous event. */
    HOUSING_SET_EXTERIOR_HOUSE_SIZE_RESPONSE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_SET_EXTERIOR_HOUSE_TYPE_RESPONSE: [result: Enum.HousingResult];
    /** @remarks Synchronous event. */
    HOUSING_SET_FIXTURE_RESPONSE: [result: Enum.HousingResult];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_STORAGE_ENTRY_UPDATED: [entryVariantID: HousingCatalogEntryVariantID];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    HOUSING_STORAGE_UPDATED: [];
    /** @remarks Synchronous event. */
    IGNORE_NEIGHBORHOOD_RESPONSE: [success: boolean, neighborhoodGuid: string];
    /** @remarks Synchronous event. */
    IGNORELIST_UPDATE: [];
    /** @remarks Synchronous event. */
    IMMERSIVE_INTERACTION_BEGIN: [];
    /** @remarks Synchronous event. */
    IMMERSIVE_INTERACTION_END: [];
    /** @remarks Synchronous event. */
    INCOMING_RESURRECT_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    INCOMING_SUMMON_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    INITIAL_CLUBS_LOADED: [];
    /** @remarks Synchronous event. */
    INITIAL_HOTFIXES_APPLIED: [];
    /** @remarks Synchronous event. */
    INITIATIVE_ACTIVITY_LOG_UPDATED: [];
    /** @remarks Synchronous event. */
    INITIATIVE_COMPLETED: [initiativeTitle: string];
    /** @remarks Synchronous event. */
    INITIATIVE_TASK_COMPLETED: [taskName: string];
    /** @remarks Synchronous event. */
    INITIATIVE_TASKS_TRACKED_LIST_CHANGED: [initiativeTaskID: number, added: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    INITIATIVE_TASKS_TRACKED_UPDATED: [];
    /** @remarks Synchronous event. */
    INPUT_DEVICE_INTERFACE_TRANSITION: [newMode: Enum.InputDeviceInterfaceType, oldMode: Enum.InputDeviceInterfaceType];
    /** @remarks Synchronous event. */
    INSPECT_ACHIEVEMENT_READY: [guid: string];
    /** @remarks Synchronous event. */
    INSPECT_HONOR_UPDATE: [];
    /** @remarks Synchronous event. */
    INSPECT_READY: [inspecteeGUID: string];
    /** @remarks Synchronous event. */
    INSTANCE_ABANDON_VOTE_FINISHED: [votePassed: boolean];
    /** @remarks Synchronous event. */
    INSTANCE_ABANDON_VOTE_STARTED: [];
    /** @remarks Synchronous event. */
    INSTANCE_ABANDON_VOTE_UPDATED: [];
    /** @remarks Synchronous event. */
    INSTANCE_BOOT_START: [];
    /** @remarks Synchronous event. */
    INSTANCE_BOOT_STOP: [];
    /** @remarks Synchronous event. */
    INSTANCE_ENCOUNTER_ADD_TIMER: [timeRemaining: number];
    /** @remarks Synchronous event. */
    INSTANCE_ENCOUNTER_ENGAGE_UNIT: [];
    /** @remarks Synchronous event. */
    INSTANCE_ENCOUNTER_OBJECTIVE_COMPLETE: [objectiveID: number];
    /** @remarks Synchronous event. */
    INSTANCE_ENCOUNTER_OBJECTIVE_START: [objectiveID: number, objectiveProgress: number];
    /** @remarks Synchronous event. */
    INSTANCE_ENCOUNTER_OBJECTIVE_UPDATE: [objectiveID: number, objectiveProgress: number];
    /** @remarks Synchronous event. */
    INSTANCE_GROUP_SIZE_CHANGED: [];
    /** @remarks Synchronous event. */
    INSTANCE_LEAVER_STATUS_CHANGED: [isLeaver: boolean];
    /** @remarks Synchronous event. */
    INSTANCE_LOCK_START: [];
    /** @remarks Synchronous event. */
    INSTANCE_LOCK_STOP: [];
    /** @remarks Synchronous event. */
    INSTANCE_LOCK_WARNING: [];
    /** @remarks Synchronous event. */
    INSTANCE_RESET_WARNING: [warningMessage: string, timeLeft: number];
    /** @remarks Synchronous event. */
    INVENTORY_SEARCH_UPDATE: [];
    /** @remarks Synchronous event. */
    INVITE_TO_PARTY_CONFIRMATION: [targetName: string, willConvertToRaid: boolean, questSessionActive: boolean];
    /** @remarks Synchronous event. */
    INVITE_TRAVEL_PASS_CONFIRMATION: [targetName: string, targetGUID: string, willConvertToRaid: boolean, questSessionActive: boolean];
    /** @remarks Synchronous event. */
    ISLAND_AZERITE_GAIN: [amount: number, gainedByPlayer: boolean, factionIndex: number, gainedBy: string, gainedFrom: string];
    /** @remarks Synchronous event. */
    ISLAND_COMPLETED: [mapID: number, winner: number];
    /** @remarks Synchronous event. */
    ISLANDS_QUEUE_CLOSE: [];
    /** @remarks Synchronous event. */
    ISLANDS_QUEUE_OPEN: [];
    /** @remarks Synchronous event. */
    ITEM_CHANGED: [previousHyperlink: string, newHyperlink: string];
    /** @remarks Synchronous event. */
    ITEM_CONVERSION_DATA_READY: [itemGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ITEM_COUNT_CHANGED: [itemID: number];
    /** @remarks Synchronous event. */
    ITEM_DATA_LOAD_RESULT: [itemID: number, success: boolean];
    /** @remarks Synchronous event. */
    ITEM_INTERACTION_CHARGE_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    ITEM_INTERACTION_ITEM_SELECTION_UPDATED: [itemLocation: ItemLocationMixin | undefined];
    /** @remarks Synchronous event. */
    ITEM_KEY_ITEM_INFO_RECEIVED: [itemID: number];
    /** @remarks Synchronous event. */
    ITEM_LOCK_CHANGED: [bagOrSlotIndex: Enum.BagIndex, slotIndex: number | undefined];
    /** @remarks Synchronous event. */
    ITEM_LOCKED: [bagOrSlotIndex: Enum.BagIndex, slotIndex: number | undefined];
    /** @remarks Synchronous event. */
    ITEM_PURCHASED: [itemID: number];
    /** @remarks Synchronous event. */
    ITEM_PUSH: [bagSlot: number, iconFileID: number];
    /** @remarks Synchronous event. */
    ITEM_RESTORATION_BUTTON_STATUS: [];
    /** @remarks Synchronous event. */
    ITEM_SEARCH_RESULTS_ADDED: [itemKey: ItemKey];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    ITEM_SEARCH_RESULTS_UPDATED: [itemKey: ItemKey, newAuctionID: number | undefined];
    /** @remarks Synchronous event. */
    ITEM_TEXT_BEGIN: [];
    /** @remarks Synchronous event. */
    ITEM_TEXT_CLOSED: [];
    /** @remarks Synchronous event. */
    ITEM_TEXT_READY: [];
    /** @remarks Synchronous event. */
    ITEM_TEXT_TRANSLATION: [delay: number];
    /** @remarks Synchronous event. */
    ITEM_UNLOCKED: [bagOrSlotIndex: Enum.BagIndex, slotIndex: number | undefined];
    /** @remarks Synchronous event. */
    ITEM_UPGRADE_FAILED: [];
    /** @remarks Synchronous event. */
    ITEM_UPGRADE_MASTER_SET_ITEM: [];
    /** @remarks Synchronous event. */
    ITEM_UPGRADE_MASTER_UPDATE: [];
    /** @remarks Synchronous event. */
    JAILERS_TOWER_LEVEL_UPDATE: [level: number, type: Enum.JailersTowerType];
    /** @remarks Synchronous event. */
    KNOWN_TITLES_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    LANGUAGE_LIST_CHANGED: [];
    /** @remarks Synchronous event. */
    LEARNED_SPELL_IN_SKILL_LINE: [spellID: number, skillLineIndex: number, isGuildPerkSpell: boolean];
    /** @remarks Synchronous event. */
    LEAVE_PARTY_CONFIRMATION: [reason: Enum.LeavePartyConfirmReason];
    /** @remarks Synchronous event. */
    LEAVING_TUTORIAL_AREA: [];
    /** @remarks Synchronous event. */
    LEGACY_FRIEND_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    LEGACY_LOOT_RULES_CHANGED: [isLegacyLootModeEnabled: boolean];
    /** @remarks Synchronous event. */
    LET_RECENT_ALLIES_SEE_LOCATION_SETTING_UPDATED: [];
    /** @remarks Synchronous event. */
    LFG_BOOT_PROPOSAL_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_COMPLETION_REWARD: [];
    /** @remarks Synchronous event. */
    LFG_COOLDOWNS_UPDATED: [];
    /** @remarks Synchronous event. */
    LFG_ENABLED_STATE_CHANGED: [];
    /** @remarks Synchronous event. */
    LFG_GROUP_DELISTED_LEADERSHIP_CHANGE: [listingName: string, automaticDelistTimeRemaining: number];
    /** @remarks Synchronous event. */
    LFG_INVALID_ERROR_MESSAGE: [reason: number, subReason1: number, subReason2: number];
    /** @remarks Synchronous event. */
    LFG_LIST_ACTIVE_ENTRY_UPDATE: [created: boolean | undefined];
    /** @remarks Synchronous event. */
    LFG_LIST_APPLICANT_LIST_UPDATED: [newPendingEntry: boolean | undefined, newPendingEntryWithData: boolean | undefined];
    /** @remarks Synchronous event. */
    LFG_LIST_APPLICANT_UPDATED: [applicantID: number];
    /** @remarks Synchronous event. */
    LFG_LIST_APPLICATION_STATUS_UPDATED: [searchResultID: number, newStatus: string, oldStatus: string, groupName: string];
    /** @remarks Synchronous event. */
    LFG_LIST_AVAILABILITY_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_LIST_CENSORED_ACTIVE_ENTRY_UPDATE: [isCensored: boolean];
    /** @remarks Synchronous event. */
    LFG_LIST_ENTRY_CREATION_FAILED: [];
    /** @remarks Synchronous event. */
    LFG_LIST_ENTRY_EXPIRED_TIMEOUT: [];
    /** @remarks Synchronous event. */
    LFG_LIST_ENTRY_EXPIRED_TOO_MANY_PLAYERS: [];
    /** @remarks Synchronous event. */
    LFG_LIST_JOINED_GROUP: [searchResultID: number, groupName: string];
    /** @remarks Synchronous event. */
    LFG_LIST_REVEALED_CENSORED_ACTIVE_ENTRY: [];
    /** @remarks Synchronous event. */
    LFG_LIST_ROLE_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_LIST_SEARCH_FAILED: [reason: string | undefined];
    /** @remarks Synchronous event. */
    LFG_LIST_SEARCH_RESULT_UPDATED: [searchResultID: number];
    /** @remarks Synchronous event. */
    LFG_LIST_SEARCH_RESULTS_RECEIVED: [];
    /** @remarks Synchronous event. */
    LFG_LIST_SHOW_SEARCH: [activityIDsFilter: number[] | undefined, showAllLevelRanges: boolean];
    /** @remarks Synchronous event. */
    LFG_LIST_UPDATE_SEARCH_RESULTS: [];
    /** @remarks Synchronous event. */
    LFG_LOCK_INFO_RECEIVED: [];
    /** @remarks Synchronous event. */
    LFG_OFFER_CONTINUE: [name: string, lfgDungeonsID: number, typeID: number];
    /** @remarks Synchronous event. */
    LFG_OPEN_FROM_GOSSIP: [dungeonID: number];
    /** @remarks Synchronous event. */
    LFG_PROPOSAL_DONE: [];
    /** @remarks Synchronous event. */
    LFG_PROPOSAL_FAILED: [];
    /** @remarks Synchronous event. */
    LFG_PROPOSAL_SHOW: [];
    /** @remarks Synchronous event. */
    LFG_PROPOSAL_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    LFG_PROPOSAL_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_QUEUE_STATUS_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_READY_CHECK_DECLINED: [name: string];
    /** @remarks Synchronous event. */
    LFG_READY_CHECK_HIDE: [];
    /** @remarks Synchronous event. */
    LFG_READY_CHECK_PLAYER_IS_READY: [name: string];
    /** @remarks Synchronous event. */
    LFG_READY_CHECK_SHOW: [isRequeue: boolean];
    /** @remarks Synchronous event. */
    LFG_READY_CHECK_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_ROLE_CHECK_DECLINED: [];
    /** @remarks Synchronous event. */
    LFG_ROLE_CHECK_HIDE: [];
    /** @remarks Synchronous event. */
    LFG_ROLE_CHECK_ROLE_CHOSEN: [name: string, isTank: boolean, isHealer: boolean, isDamage: boolean];
    /** @remarks Synchronous event. */
    LFG_ROLE_CHECK_SHOW: [isRequeue: boolean];
    /** @remarks Synchronous event. */
    LFG_ROLE_CHECK_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_ROLE_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_UPDATE: [];
    /** @remarks Synchronous event. */
    LFG_UPDATE_RANDOM_INFO: [];
    /** @remarks Synchronous event. */
    LIFESTEAL_UPDATE: [];
    /** @remarks Synchronous event. */
    LOADING_SCREEN_DISABLED: [];
    /** @remarks Synchronous event. */
    LOADING_SCREEN_ENABLED: [];
    /** @remarks Synchronous event. */
    LOBBY_MATCHMAKER_QUEUE_ABANDONED: [];
    /** @remarks Synchronous event. */
    LOBBY_MATCHMAKER_QUEUE_ERROR: [];
    /** @remarks Synchronous event. */
    LOBBY_MATCHMAKER_QUEUE_EXPIRED: [];
    /** @remarks Synchronous event. */
    LOBBY_MATCHMAKER_QUEUE_POPPED: [];
    /** @remarks Synchronous event. */
    LOBBY_MATCHMAKER_QUEUE_STATUS_UPDATE: [];
    /** @remarks Synchronous event. */
    LOC_RESULT: [result: string];
    /** @remarks Synchronous event. */
    LOCALPLAYER_PET_RENAMED: [];
    /** @remarks Synchronous event. */
    LOGOUT_CANCEL: [];
    /** @remarks Synchronous event. */
    LOOT_BIND_CONFIRM: [lootSlot: number];
    /** @remarks Synchronous event. */
    LOOT_CLOSED: [];
    /** @remarks Synchronous event. */
    LOOT_HISTORY_CLEAR_HISTORY: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    LOOT_HISTORY_GO_TO_ENCOUNTER: [encounterID: number];
    /** @remarks Synchronous event. */
    LOOT_HISTORY_ONE_HUNDRED_ROLL: [encounterID: number, lootListKey: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    LOOT_HISTORY_UPDATE_DROP: [encounterID: number, lootListKey: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    LOOT_HISTORY_UPDATE_ENCOUNTER: [encounterID: number];
    /** @remarks Synchronous event. */
    LOOT_ITEM_AVAILABLE: [itemTooltip: string, lootHandle: number];
    /** @remarks Synchronous event. */
    LOOT_ITEM_ROLL_WON: [itemLink: string, rollQuantity: number, rollType: number, roll: number, upgraded: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    LOOT_JOURNAL_ITEM_UPDATE: [];
    /** @remarks Synchronous event. */
    LOOT_OPENED: [autoLoot: boolean, isFromItem: boolean];
    /** @remarks Synchronous event. */
    LOOT_READY: [autoloot: boolean];
    /** @remarks Synchronous event. */
    LOOT_ROLLS_COMPLETE: [lootHandle: number];
    /** @remarks Synchronous event. */
    LOOT_SLOT_CHANGED: [lootSlot: number];
    /** @remarks Synchronous event. */
    LOOT_SLOT_CLEARED: [lootSlot: number];
    /** @remarks Synchronous event. */
    LORE_TEXT_UPDATED_CAMPAIGN: [campaignID: number, textEntries: LoreTextEntry[]];
    /** @remarks Synchronous event. */
    LOSS_OF_CONTROL_ADDED: [unitTarget: UnitToken, effectIndex: number];
    /** @remarks Synchronous event. */
    LOSS_OF_CONTROL_COMMENTATOR_ADDED: [victim: string, effectIndex: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    LOSS_OF_CONTROL_COMMENTATOR_UPDATE: [victim: string];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    LOSS_OF_CONTROL_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    LUA_WARNING: [warningText: string];
    /** @remarks Synchronous event. */
    MACRO_ACTION_BLOCKED: [function_: string];
    /** @remarks Synchronous event. */
    MACRO_ACTION_FORBIDDEN: [function_: string];
    /** @remarks Synchronous event. */
    MAIL_CLOSED: [];
    /** @remarks Synchronous event. */
    MAIL_FAILED: [itemID: number | undefined];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    MAIL_INBOX_UPDATE: [];
    /** @remarks Synchronous event. */
    MAIL_LOCK_SEND_ITEMS: [attachSlot: number, itemLink: string];
    /** @remarks Synchronous event. */
    MAIL_OPEN_ALL_CANCELED: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    MAIL_SEND_INFO_UPDATE: [];
    /** @remarks Synchronous event. */
    MAIL_SEND_SUCCESS: [];
    /** @remarks Synchronous event. */
    MAIL_SHOW: [];
    /** @remarks Synchronous event. */
    MAIL_SUCCESS: [itemID: number | undefined];
    /** @remarks Synchronous event. */
    MAIL_UNLOCK_SEND_ITEMS: [];
    /** @remarks Synchronous event. */
    MAIN_SPEC_NEED_ROLL: [rollID: number, roll: number, isWinning: boolean];
    /** @remarks Synchronous event. */
    MAJOR_FACTION_INTERACTION_ENDED: [];
    /** @remarks Synchronous event. */
    MAJOR_FACTION_INTERACTION_STARTED: [];
    /** @remarks Synchronous event. */
    MAJOR_FACTION_RENOWN_LEVEL_CHANGED: [majorFactionID: number, newRenownLevel: number, oldRenownLevel: number];
    /** @remarks Synchronous event. */
    MAJOR_FACTION_UNLOCKED: [majorFactionID: number];
    /** @remarks Synchronous event. */
    MAP_EXPLORATION_UPDATED: [];
    /** @remarks Synchronous event. */
    MASTERY_UPDATE: [];
    /** @remarks Synchronous event. */
    MAX_EXPANSION_LEVEL_UPDATED: [];
    /** @remarks Synchronous event. */
    MAX_SPELL_START_RECOVERY_OFFSET_CHANGED: [clampedNewQueueWindowMs: number];
    /** @remarks Synchronous event. */
    MENTORSHIP_STATUS_CHANGED: [];
    /** @remarks Synchronous event. */
    MERCHANT_CLOSED: [];
    /** @remarks Synchronous event. */
    MERCHANT_CONFIRM_TRADE_TIMER_REMOVAL: [itemLink: string];
    /** @remarks Synchronous event. */
    MERCHANT_FILTER_ITEM_UPDATE: [itemID: number];
    /** @remarks Synchronous event. */
    MERCHANT_SHOW: [];
    /** @remarks Synchronous event. */
    MERCHANT_UPDATE: [];
    /** @remarks Synchronous event. */
    MIN_EXPANSION_LEVEL_UPDATED: [];
    MINIMAP_PING: [unitTarget: UnitToken, y: number, x: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    MINIMAP_UPDATE_TRACKING: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    MINIMAP_UPDATE_ZOOM: [];
    /** @remarks Synchronous event. */
    MIRROR_TIMER_PAUSE: [timerName: string, paused: number];
    /** @remarks Synchronous event. */
    MIRROR_TIMER_START: [timerName: string, value: number, maxValue: number, scale: number, paused: number, timerLabel: string];
    /** @remarks Synchronous event. */
    MIRROR_TIMER_STOP: [timerName: string];
    /** @remarks Synchronous event. */
    MODIFIER_STATE_CHANGED: [key: string, down: number];
    /** @remarks Synchronous event. */
    MOUNT_CURSOR_CLEAR: [];
    /** @remarks Synchronous event. */
    MOUNT_EQUIPMENT_APPLY_RESULT: [success: boolean];
    /** @remarks Synchronous event. */
    MOUNT_JOURNAL_SEARCH_UPDATED: [];
    /** @remarks Synchronous event. */
    MOUNT_JOURNAL_USABILITY_CHANGED: [];
    /** @remarks Synchronous event. */
    MOVE_OUT_RESERVATION_UPDATED: [];
    /** @remarks Synchronous event. */
    MUTELIST_UPDATE: [];
    /** @remarks Synchronous event. */
    MYTHIC_PLUS_CURRENT_AFFIX_UPDATE: [];
    /** @remarks Synchronous event. */
    MYTHIC_PLUS_NEW_WEEKLY_RECORD: [mapChallengeModeID: number, completionMilliseconds: number, level: number];
    /** @remarks Synchronous event. */
    NAME_PLATE_CREATED: [namePlateFrame: NamePlate];
    /** @remarks Synchronous event. */
    NAME_PLATE_UNIT_ADDED: [unitToken: Enum.UnitTokenType];
    /** @remarks Synchronous event. */
    NAME_PLATE_UNIT_BEHIND_CAMERA_CHANGED: [unitTarget: UnitToken, isBehindCamera: boolean];
    /** @remarks Synchronous event. */
    NAME_PLATE_UNIT_REMOVED: [unitToken: Enum.UnitTokenType];
    /** @remarks Synchronous event. */
    NAVIGATION_DESTINATION_REACHED: [isWaypoint: boolean];
    /** @remarks Synchronous event. */
    NAVIGATION_FRAME_CREATED: [region: ScriptRegion];
    /** @remarks Synchronous event. */
    NAVIGATION_FRAME_DESTROYED: [];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_GUILD_SIZE_VALIDATED: [approved: boolean];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_INFO_UPDATED: [neighborhoodInfo: NeighborhoodInfo];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_INITIATIVE_UPDATED: [];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_INVITE_RESPONSE: [result: Enum.NeighborhoodInviteResult];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_LIST_UPDATED: [result: Enum.HousingResult, neighborhoodInfos: NeighborhoodInfo[] | undefined];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    NEIGHBORHOOD_MAP_DATA_UPDATED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    NEIGHBORHOOD_NAME_UPDATED: [neighborhoodGuid: string, neighborhoodName: string];
    /** @remarks Synchronous event. */
    NEIGHBORHOOD_NAME_VALIDATED: [approved: boolean];
    /** @remarks Synchronous event. */
    NEUTRAL_FACTION_SELECT_RESULT: [success: boolean];
    /** @remarks Synchronous event. */
    NEW_HOUSING_ITEM_ACQUIRED: [itemType: Enum.HousingItemToastType, itemName: string, icon: number | undefined];
    /** @remarks Synchronous event. */
    NEW_MATCHMAKING_PARTY_INVITE: [];
    /** @remarks Synchronous event. */
    NEW_MOUNT_ADDED: [mountID: number];
    /** @remarks Synchronous event. */
    NEW_PET_ADDED: [battlePetGUID: string];
    /** @remarks Synchronous event. */
    NEW_RECIPE_LEARNED: [recipeID: number, recipeLevel: number | undefined, baseRecipeID: number | undefined];
    /** @remarks Synchronous event. */
    NEW_RUNEFORGE_POWER_ADDED: [powerID: number];
    /** @remarks Synchronous event. */
    NEW_TOY_ADDED: [itemID: number];
    /** @remarks Synchronous event. */
    NEW_WARBAND_SCENE_ADDED: [warbandScenID: number];
    /** @remarks Synchronous event. */
    NEW_WMO_CHUNK: [];
    /** @remarks Synchronous event. */
    NEWCOMER_GRADUATION: [];
    /** @remarks Synchronous event. */
    NOTCHED_DISPLAY_MODE_CHANGED: [];
    /** @remarks Synchronous event. */
    NOTIFY_CHAT_SUPPRESSED: [];
    /** @remarks Synchronous event. */
    NOTIFY_PVP_AFK_RESULT: [offender: string, numBlackMarksOnOffender: number, numPlayersIHaveReported: number];
    /** @remarks Synchronous event. */
    NOTIFY_TURN_STRAFE_CHANGE: [];
    /** @remarks Synchronous event. */
    NPE_TUTORIAL_UPDATE: [];
    /** @remarks Synchronous event. */
    OBJECT_ENTERED_AOI: [guid: string];
    /** @remarks Synchronous event. */
    OBJECT_LEFT_AOI: [guid: string];
    /** @remarks Synchronous event. */
    OBLITERUM_FORGE_PENDING_ITEM_CHANGED: [];
    /** @remarks Synchronous event. */
    OPEN_CHARTER_CONFIRMATION_UI: [neighborhoodName: string, locationName: string];
    /** @remarks Synchronous event. */
    OPEN_CREATE_CHARTER_NEIGHBORHOOD_UI: [locationName: string];
    /** @remarks Synchronous event. */
    OPEN_CREATE_GUILD_NEIGHBORHOOD_UI: [locationName: string];
    /** @remarks Synchronous event. */
    OPEN_MASTER_LOOT_LIST: [];
    /** @remarks Synchronous event. */
    OPEN_NEIGHBORHOOD_CHARTER: [neighborhoodInfo: NeighborhoodInfo, signatures: string[], requiredSignatures: number];
    /** @remarks Synchronous event. */
    OPEN_NEIGHBORHOOD_CHARTER_SIGNATURE_REQUEST: [neighborhoodInfo: NeighborhoodInfo];
    /** @remarks Synchronous event. */
    OPEN_PLOT_CORNERSTONE: [];
    /** @remarks Synchronous event. */
    OPEN_RECIPE_RESPONSE: [recipeID: number, skillLineID: number, expansionSkillLineID: number];
    /** @remarks Synchronous event. */
    OPEN_SPLASH_SCREEN: [info: SplashScreenInfo | undefined];
    /** @remarks Synchronous event. */
    OPEN_TABARD_FRAME: [];
    /** @remarks Synchronous event. */
    OWNED_AUCTION_BIDDER_INFO_RECEIVED: [auctionID: number, bidderName: string];
    /** @remarks Synchronous event. */
    OWNED_AUCTIONS_UPDATED: [];
    /**
     * Signaled when responses come in from RequestPartyEligibilityForDelveTiers.
     * @remarks Synchronous event.
     */
    PARTY_ELIGIBILITY_FOR_DELVE_TIERS_CHANGED: [playerName: string, maxEligibleLevel: number];
    /** @remarks Synchronous event. */
    PARTY_INVITE_CANCEL: [];
    /** @remarks Synchronous event. */
    PARTY_INVITE_REQUEST: [name: string, isTank: boolean, isHealer: boolean, isDamage: boolean, isNativeRealm: boolean, allowMultipleRoles: boolean, inviterGUID: string, questSessionActive: boolean];
    /** @remarks Synchronous event. */
    PARTY_KILL: [attackerGUID: string, targetGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PARTY_LEADER_CHANGED: [];
    /** @remarks Synchronous event. */
    PARTY_LFG_RESTRICTED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PARTY_LOOT_METHOD_CHANGED: [];
    /** @remarks Synchronous event. */
    PARTY_MEMBER_DISABLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PARTY_MEMBER_ENABLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PENDING_AZERITE_ESSENCE_CHANGED: [essenceID: number | undefined];
    /** @remarks Synchronous event. */
    PENDING_NEIGHBORHOOD_INVITES_RECIEVED: [result: Enum.NeighborhoodInviteResult, pendingInviteList: string[] | undefined];
    /** @remarks Synchronous event. */
    PERKS_ACTIVITIES_TRACKED_LIST_CHANGED: [perksActivityID: number, added: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PERKS_ACTIVITIES_TRACKED_UPDATED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PERKS_ACTIVITIES_UPDATED: [];
    /** @remarks Synchronous event. */
    PERKS_ACTIVITY_COMPLETED: [perksActivityID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_ADD_PENDING_SHOP_ITEM: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_CLOSE: [];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_CURRENCY_AWARDED: [value: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_CURRENCY_REFRESH: [oldValue: number, newValue: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_DATA_REFRESH: [];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_DATA_SPECIFIC_ITEM_REFRESH: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_DISABLED: [];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_OPEN: [];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_PURCHASE_CART_SUCCESS: [vendorItemIDs: number[]];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_PURCHASE_SUCCESS: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_REFUND_SUCCESS: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_REMOVE_PENDING_SHOP_ITEM: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_RESULT_ERROR: [];
    /** @remarks Synchronous event. */
    PERKS_PROGRAM_SET_FROZEN_ITEM: [vendorItemID: number];
    /** @remarks Synchronous event. */
    PET_ATTACK_START: [];
    /** @remarks Synchronous event. */
    PET_ATTACK_STOP: [];
    /** @remarks Synchronous event. */
    PET_BAR_HIDEGRID: [];
    /** @remarks Synchronous event. */
    PET_BAR_SHOWGRID: [];
    /** @remarks Synchronous event. */
    PET_BAR_UPDATE: [];
    /** @remarks Synchronous event. */
    PET_BAR_UPDATE_COOLDOWN: [];
    /** @remarks Synchronous event. */
    PET_BAR_UPDATE_USABLE: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_ABILITY_CHANGED: [owner: number, petIndex: number, abilityID: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_ACTION_SELECTED: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_AURA_APPLIED: [owner: number, petIndex: number, auraInstanceID: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_AURA_CANCELED: [owner: number, petIndex: number, auraInstanceID: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_AURA_CHANGED: [owner: number, petIndex: number, auraInstanceID: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_CAPTURED: [owner: number, petIndex: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_CLOSE: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_FINAL_ROUND: [owner: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_HEALTH_CHANGED: [owner: number, petIndex: number, healthChange: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_LEVEL_CHANGED: [owner: number, petIndex: number, newLevel: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_LOOT_RECEIVED: [typeIdentifier: string, itemLink: string, quantity: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_MAX_HEALTH_CHANGED: [owner: number, petIndex: number, healthChange: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_OPENING_DONE: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_OPENING_START: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_OVER: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_OVERRIDE_ABILITY: [abilityIndex: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_PET_CHANGED: [owner: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_PET_ROUND_PLAYBACK_COMPLETE: [roundNumber: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_PET_ROUND_RESULTS: [roundNumber: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_PET_TYPE_CHANGED: [owner: number, petIndex: number, stateValue: number];
    /** @remarks Synchronous event. */
    PET_BATTLE_PVP_DUEL_REQUEST_CANCEL: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_PVP_DUEL_REQUESTED: [fullName: string];
    /** @remarks Synchronous event. */
    PET_BATTLE_QUEUE_PROPOSAL_ACCEPTED: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_QUEUE_PROPOSAL_DECLINED: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_QUEUE_PROPOSE_MATCH: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_QUEUE_STATUS: [];
    /** @remarks Synchronous event. */
    PET_BATTLE_XP_CHANGED: [owner: number, petIndex: number, xpChange: number];
    /** @remarks Synchronous event. */
    PET_DISMISS_START: [delay: number];
    /** @remarks Synchronous event. */
    PET_FORCE_NAME_DECLENSION: [name: string, petNumber: number | undefined, declinedName1: string | undefined, declinedName2: string | undefined, declinedName3: string | undefined, declinedName4: string | undefined, declinedName5: string | undefined];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PET_INFO_UPDATE: [];
    /** @remarks Synchronous event. */
    PET_JOURNAL_AUTO_SLOTTED_PET: [slotIndex: number, battlePetGUID: string];
    /** @remarks Synchronous event. */
    PET_JOURNAL_CAGE_FAILED: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    PET_JOURNAL_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    PET_JOURNAL_NEW_BATTLE_SLOT: [];
    /** @remarks Synchronous event. */
    PET_JOURNAL_PET_DELETED: [battlePetGUID: string];
    /** @remarks Synchronous event. */
    PET_JOURNAL_PET_RESTORED: [battlePetGUID: string];
    /** @remarks Synchronous event. */
    PET_JOURNAL_PET_REVOKED: [battlePetGUID: string];
    /** @remarks Synchronous event. */
    PET_JOURNAL_PETS_HEALED: [];
    /** @remarks Synchronous event. */
    PET_JOURNAL_TRAP_LEVEL_SET: [trapLevel: number];
    /** @remarks Synchronous event. */
    PET_ORDER_MOVE_TO_PENDING_CHANGED: [isPetOrderMoveToPending: boolean];
    /** @remarks Synchronous event. */
    PET_SPECIALIZATION_CHANGED: [];
    /** @remarks Synchronous event. */
    PET_STABLE_CLOSED: [];
    /** @remarks Synchronous event. */
    PET_STABLE_FAVORITES_UPDATED: [];
    /** @remarks Synchronous event. */
    PET_STABLE_SHOW: [];
    /** @remarks Synchronous event. */
    PET_STABLE_UPDATE: [];
    /** @remarks Synchronous event. */
    PET_STATS_UPDATE: [];
    /** @remarks Synchronous event. */
    PET_UI_CLOSE: [];
    /** @remarks Synchronous event. */
    PET_UI_UPDATE: [];
    /** @remarks Synchronous event. */
    PETITION_CLOSED: [];
    /** @remarks Synchronous event. */
    PETITION_SHOW: [];
    /** @remarks Synchronous event. */
    PHOTO_SHARING_AUTHORIZATION_NEEDED: [];
    /** @remarks Synchronous event. */
    PHOTO_SHARING_AUTHORIZATION_UPDATED: [showNotification: boolean];
    /** @remarks Synchronous event. */
    PHOTO_SHARING_PHOTO_UPLOAD_STATUS: [uploadStatus: Enum.PhotoSharingUploadStatus];
    /** @remarks Synchronous event. */
    PHOTO_SHARING_SCREENSHOT_READY: [];
    /** @remarks Synchronous event. */
    PHOTO_SHARING_THIRD_PARTY_AUTHORIZATION_NEEDED: [authUrl: string];
    /** @remarks Synchronous event. */
    PING_SYSTEM_ERROR: [error: string];
    /** @remarks Synchronous event. */
    PLAY_MOVIE: [movieID: number];
    /** @remarks Synchronous event. */
    PLAYER_ACCOUNT_BANK_TAB_SLOTS_CHANGED: [slot: number];
    /** @remarks Synchronous event. */
    PLAYER_ALIVE: [];
    /** @remarks Synchronous event. */
    PLAYER_AVG_ITEM_LEVEL_UPDATE: [];
    /** @remarks Synchronous event. */
    PLAYER_CAMPING: [];
    /** @remarks Synchronous event. */
    PLAYER_CAN_GLIDE_CHANGED: [canGlide: boolean];
    /** @remarks Synchronous event. */
    PLAYER_CHARACTER_LIST_UPDATED: [characterInfos: HouseOwnerCharacterInfo[], ownerListIndex: number];
    /** @remarks Synchronous event. */
    PLAYER_CHOICE_CLOSE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PLAYER_CHOICE_UPDATE: [];
    /** @remarks Synchronous event. */
    PLAYER_CONTROL_GAINED: [];
    /** @remarks Synchronous event. */
    PLAYER_CONTROL_LOST: [];
    /** @remarks Synchronous event. */
    PLAYER_DAMAGE_DONE_MODS: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_DEAD: [];
    /** @remarks Synchronous event. */
    PLAYER_DIFFICULTY_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_ENTER_COMBAT: [];
    /** @remarks Synchronous event. */
    PLAYER_ENTERING_BATTLEGROUND: [];
    /** @remarks Synchronous event. */
    PLAYER_ENTERING_WORLD: [isInitialLogin: boolean, isReloadingUi: boolean];
    /** @remarks Synchronous event. */
    PLAYER_EQUIPMENT_CHANGED: [equipmentSlot: number, hasCurrent: boolean];
    /** @remarks Synchronous event. */
    PLAYER_FARSIGHT_FOCUS_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_FLAGS_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_FOCUS_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_GAINS_VEHICLE_DATA: [unitTarget: UnitToken, vehicleUIIndicatorID: number];
    /** @remarks Synchronous event. */
    PLAYER_GUILD_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_HOUSE_LIST_UPDATED: [houseInfos: HouseInfo[]];
    /** @remarks Synchronous event. */
    PLAYER_IMPULSE_APPLIED: [];
    /** @remarks Synchronous event. */
    PLAYER_IN_COMBAT_CHANGED: [inCombat: boolean];
    /** @remarks Synchronous event. */
    PLAYER_INSIDE_QUEST_BLOB_STATE_CHANGED: [questID: number, isInside: boolean];
    /** @remarks Synchronous event. */
    PLAYER_INTERACTION_MANAGER_FRAME_HIDE: [type: Enum.PlayerInteractionType];
    /** @remarks Synchronous event. */
    PLAYER_INTERACTION_MANAGER_FRAME_SHOW: [type: Enum.PlayerInteractionType];
    /** @remarks Synchronous event. */
    PLAYER_IS_GLIDING_CHANGED: [isGliding: boolean];
    /** @remarks Synchronous event. */
    PLAYER_JOINED_PVP_MATCH: [];
    /** @remarks Synchronous event. */
    PLAYER_LEARN_PVP_TALENT_FAILED: [];
    /** @remarks Synchronous event. */
    PLAYER_LEARN_TALENT_FAILED: [];
    /** @remarks Synchronous event. */
    PLAYER_LEAVE_COMBAT: [];
    /** @remarks Synchronous event. */
    PLAYER_LEAVING_WORLD: [];
    /** @remarks Synchronous event. */
    PLAYER_LEVEL_CHANGED: [oldLevel: number, newLevel: number, real: boolean];
    /** @remarks Synchronous event. */
    PLAYER_LEVEL_UP: [level: number, healthDelta: number, powerDelta: number, numNewTalents: number, numNewPvpTalentSlots: number, strengthDelta: number, agilityDelta: number, staminaDelta: number, intellectDelta: number, spiritDelta: number];
    /** @remarks Synchronous event. */
    PLAYER_LOGIN: [];
    /** @remarks Synchronous event. */
    PLAYER_LOGOUT: [];
    /** @remarks Synchronous event. */
    PLAYER_LOOT_SPEC_UPDATED: [];
    /** @remarks Synchronous event. */
    PLAYER_LOSES_VEHICLE_DATA: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_MAP_CHANGED: [oldMapID: number, newMapID: number];
    /** @remarks Synchronous event. */
    PLAYER_MAX_LEVEL_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_MONEY: [];
    /** @remarks Synchronous event. */
    PLAYER_MOUNT_DISPLAY_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_PVP_FLAG_CHANGED: [isPvpFlagged: boolean];
    /** @remarks Synchronous event. */
    PLAYER_PVP_KILLS_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_PVP_RANK_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_PVP_TALENT_UPDATE: [];
    /** @remarks Synchronous event. */
    PLAYER_QUITING: [];
    /** @remarks Synchronous event. */
    PLAYER_REGEN_DISABLED: [];
    /** @remarks Synchronous event. */
    PLAYER_REGEN_ENABLED: [];
    /** @remarks Synchronous event. */
    PLAYER_REPORT_SUBMITTED: [invitedByGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PLAYER_ROLES_ASSIGNED: [];
    /** @remarks Synchronous event. */
    PLAYER_SKINNED: [hasFreeRepop: number];
    /** @remarks Synchronous event. */
    PLAYER_SOFT_ENEMY_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_SOFT_FRIEND_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_SOFT_INTERACT_CHANGED: [oldTarget: string, newTarget: string];
    /** @remarks Synchronous event. */
    PLAYER_SOFT_TARGET_INTERACTION: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    PLAYER_SPECIALIZATION_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_STARTED_LOOKING: [];
    /** @remarks Synchronous event. */
    PLAYER_STARTED_MOVING: [];
    /** @remarks Synchronous event. */
    PLAYER_STARTED_TURNING: [];
    /** @remarks Synchronous event. */
    PLAYER_STOPPED_LOOKING: [];
    /** @remarks Synchronous event. */
    PLAYER_STOPPED_MOVING: [];
    /** @remarks Synchronous event. */
    PLAYER_STOPPED_TURNING: [];
    /** @remarks Synchronous event. */
    PLAYER_SWING: [swingDuration: number, swingType: Enum.PlayerSwingType];
    /**
     * Only signaled for swing types that have an active range check. See C_SwingTimer.EnableRangeCheck.
     * @remarks Synchronous event.
     */
    PLAYER_SWING_RANGE_UPDATE: [swingType: Enum.PlayerSwingType, isInRange: boolean, checksRange: boolean];
    /** @remarks Synchronous event. */
    PLAYER_TALENT_UPDATE: [];
    /** @remarks Synchronous event. */
    PLAYER_TARGET_CHANGED: [];
    /** @remarks Synchronous event. */
    PLAYER_TARGET_DIED: [];
    /** @remarks Synchronous event. */
    PLAYER_TOTEM_UPDATE: [totemSlot: number];
    /** @remarks Synchronous event. */
    PLAYER_TRADE_CURRENCY: [];
    /** @remarks Synchronous event. */
    PLAYER_TRADE_MONEY: [];
    /** @remarks Synchronous event. */
    PLAYER_TRIAL_XP_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYER_UNGHOST: [];
    /** @remarks Synchronous event. */
    PLAYER_UPDATE_RESTING: [];
    /** @remarks Synchronous event. */
    PLAYER_XP_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PLAYERBANKSLOTS_CHANGED: [slot: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PORTRAITS_UPDATED: [];
    /** @remarks Synchronous event. */
    POST_MATCH_CURRENCY_REWARD_UPDATE: [reward: PVPPostMatchCurrencyReward];
    /** @remarks Synchronous event. */
    POST_MATCH_ITEM_REWARD_UPDATE: [];
    /** @remarks Synchronous event. */
    PROFESSION_EQUIPMENT_CHANGED: [skillLineID: number, isTool: boolean];
    /** @remarks Synchronous event. */
    PROFESSION_RESPEC_CONFIRMATION: [skillName: string];
    /** @remarks Synchronous event. */
    PROVING_GROUNDS_SCORE_UPDATE: [points: number];
    /** @remarks Synchronous event. */
    PURCHASE_PLOT_RESULT: [result: number];
    /** @remarks Synchronous event. */
    PVP_BRAWL_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    PVP_MATCH_ACTIVE: [];
    /** @remarks Synchronous event. */
    PVP_MATCH_COMPLETE: [winner: number, duration: number];
    /** @remarks Synchronous event. */
    PVP_MATCH_INACTIVE: [];
    /** @remarks Synchronous event. */
    PVP_MATCH_STATE_CHANGED: [];
    /** @remarks Synchronous event. */
    PVP_POWER_UPDATE: [];
    /** @remarks Synchronous event. */
    PVP_RATED_STATS_UPDATE: [];
    /** @remarks Synchronous event. */
    PVP_REWARDS_UPDATE: [];
    /** @remarks Synchronous event. */
    PVP_ROLE_POPUP_HIDE: [readyCheckInfo: PvpReadyCheckInfo | undefined];
    /** @remarks Synchronous event. */
    PVP_ROLE_POPUP_SHOW: [readyCheckInfo: PvpReadyCheckInfo];
    /** @remarks Synchronous event. */
    PVP_ROLE_UPDATE: [];
    /** @remarks Synchronous event. */
    PVP_SPECIAL_EVENT_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    PVP_TIMER_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    PVP_TYPES_ENABLED: [wargameBattlegrounds: boolean, ratedBattlegrounds: boolean, ratedArenas: boolean, ratedSoloShuffle: boolean, ratedBGBlitz: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    PVP_VEHICLE_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    PVP_WORLDSTATE_UPDATE: [];
    /** @remarks Synchronous event. */
    PVPQUEUE_ANYWHERE_SHOW: [];
    /** @remarks Synchronous event. */
    PVPQUEUE_ANYWHERE_UPDATE_AVAILABLE: [];
    /** @remarks Synchronous event. */
    QUEST_ACCEPT_CONFIRM: [name: string, questTitle: string, questID: number];
    /** @remarks Synchronous event. */
    QUEST_ACCEPTED: [questId: number];
    /** @remarks Synchronous event. */
    QUEST_AUTOCOMPLETE: [questId: number];
    /** @remarks Synchronous event. */
    QUEST_BOSS_EMOTE: [text: string, playerName: string, displayTime: number, enableBossEmoteWarningSound: boolean];
    /** @remarks Synchronous event. */
    QUEST_COMPLETE: [];
    /** @remarks Synchronous event. */
    QUEST_CURRENCY_LOOT_RECEIVED: [questID: number, currencyId: number, quantity: number];
    /** @remarks Synchronous event. */
    QUEST_DATA_LOAD_RESULT: [questID: number, success: boolean];
    /** @remarks Synchronous event. */
    QUEST_DETAIL: [questStartItemID: number | undefined];
    /** @remarks Synchronous event. */
    QUEST_FINISHED: [];
    /** @remarks Synchronous event. */
    QUEST_GREETING: [];
    /** @remarks Synchronous event. */
    QUEST_ITEM_UPDATE: [];
    /** @remarks Synchronous event. */
    QUEST_LOG_CRITERIA_UPDATE: [questID: number, specificTreeID: number, description: string, numFulfilled: number, numRequired: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_LOG_UPDATE: [];
    /** @remarks Synchronous event. */
    QUEST_LOOT_RECEIVED: [questID: number, itemLink: string, quantity: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_POI_UPDATE: [];
    /** @remarks Synchronous event. */
    QUEST_PROGRESS: [];
    /** @remarks Synchronous event. */
    QUEST_REMOVED: [questID: number, wasReplayQuest: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_SESSION_CREATED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_SESSION_DESTROYED: [];
    /** @remarks Synchronous event. */
    QUEST_SESSION_ENABLED_STATE_CHANGED: [enabled: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_SESSION_JOINED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    QUEST_SESSION_LEFT: [];
    /** @remarks Synchronous event. */
    QUEST_SESSION_MEMBER_CONFIRM: [];
    /** @remarks Synchronous event. */
    QUEST_SESSION_MEMBER_START_RESPONSE: [guid: string, response: boolean];
    /** @remarks Synchronous event. */
    QUEST_SESSION_NOTIFICATION: [result: Enum.QuestSessionResult, guid: string];
    /** @remarks Synchronous event. */
    QUEST_TURNED_IN: [questID: number, xpReward: number, moneyReward: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    QUEST_WATCH_LIST_CHANGED: [questID: number | undefined, added: boolean | undefined];
    /** @remarks Synchronous event. */
    QUEST_WATCH_UPDATE: [questID: number];
    /** @remarks Synchronous event. */
    QUESTLINE_UPDATE: [requestRequired: boolean];
    /** @remarks Synchronous event. */
    QUICK_TICKET_SYSTEM_STATUS: [];
    /** @remarks Synchronous event. */
    QUICK_TICKET_THROTTLE_CHANGED: [];
    /** @remarks Synchronous event. */
    RAF_ENTITLEMENT_DELIVERED: [entitlementType: Enum.WoWEntitlementType, textureID: number, name: string, payloadID: number | undefined, showFancyToast: boolean, rafVersion: Enum.RecruitAFriendRewardsVersion];
    /** @remarks Synchronous event. */
    RAF_INFO_UPDATED: [info: RafInfo];
    /** @remarks Synchronous event. */
    RAF_RECRUITING_ENABLED_STATUS: [enabled: boolean];
    /** @remarks Synchronous event. */
    RAF_REWARD_CLAIM_FAILED: [];
    /** @remarks Synchronous event. */
    RAF_SYSTEM_ENABLED_STATUS: [enabled: boolean];
    /** @remarks Synchronous event. */
    RAF_SYSTEM_INFO_UPDATED: [systemInfo: RafSystemInfo];
    /** @remarks Synchronous event. */
    RAID_BOSS_EMOTE: [text: string, playerName: string, displayTime: number, enableBossEmoteWarningSound: boolean];
    /** @remarks Synchronous event. */
    RAID_BOSS_WHISPER: [text: string, playerName: string, displayTime: number, enableBossEmoteWarningSound: boolean];
    /** @remarks Synchronous event. */
    RAID_INSTANCE_WELCOME: [mapname: string, timeLeft: number, locked: number, extended: number];
    /** @remarks Synchronous event. */
    RAID_ROSTER_UPDATE: [];
    /** @remarks Synchronous event. */
    RAID_TARGET_UPDATE: [];
    /** @remarks Synchronous event. */
    RAISED_AS_GHOUL: [];
    /** @remarks Synchronous event. */
    READY_CHECK: [initiatorName: string, readyCheckTimeLeft: number];
    /** @remarks Synchronous event. */
    READY_CHECK_CONFIRM: [unitTarget: UnitToken, isReady: boolean];
    /** @remarks Synchronous event. */
    READY_CHECK_FINISHED: [preempted: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    RECEIVED_ACHIEVEMENT_LIST: [];
    /** @remarks Synchronous event. */
    RECEIVED_ACHIEVEMENT_MEMBER_LIST: [achievementID: number];
    /** @remarks Synchronous event. */
    RECEIVED_HOUSE_LEVEL_REWARDS: [level: number, rewards: HouseLevelReward[]];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    RECENT_ALLIES_CACHE_UPDATE: [];
    /** @remarks Synchronous event. */
    RECENT_ALLIES_DATA_READY: [];
    /** @remarks Synchronous event. */
    RECENT_ALLIES_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    RECENT_ALLY_DATA_UPDATED: [characterGUID: string];
    /** @remarks Synchronous event. */
    REJECTED_MATCHMAKING_PARTY_INVITE: [name: string];
    /** @remarks Synchronous event. */
    REMIX_ARTIFACT_ITEM_SPECS_LOADED: [success: boolean];
    /** @remarks Synchronous event. */
    REMIX_ARTIFACT_UPDATE: [];
    /** @remarks Synchronous event. */
    REMIX_END_OF_EVENT: [];
    /** @remarks Synchronous event. */
    REMOVE_NEIGHBORHOOD_CHARTER_SIGNATURE: [signature: string];
    /** @remarks Synchronous event. */
    REPLACE_ENCHANT: [existingStr: string, replacementStr: string];
    /** @remarks Synchronous event. */
    REPLACE_TRADESKILL_ENCHANT: [existing: string, replacement: string];
    /** @remarks Synchronous event. */
    REPLICATE_ITEM_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    REPORT_PLAYER_RESULT: [result: Enum.SendReportResult, reportType: Enum.ReportType];
    /** @remarks Synchronous event. */
    REPORT_SCREENSHOT_READY: [];
    /** @remarks Synchronous event. */
    REQUEST_CEMETERY_LIST_RESPONSE: [isGossipTriggered: boolean];
    /** @remarks Synchronous event. */
    REQUEST_INVITE_CONFIRMATION: [targetName: string, partyLevelLink: number, questSessionActive: boolean, tank: boolean | undefined, healer: boolean | undefined, dps: boolean | undefined];
    /** @remarks Synchronous event. */
    REQUESTED_GUILD_RENAME_RESULT: [newName: string, status: Enum.GuildErrorType];
    /** @remarks Synchronous event. */
    REQUIRED_GUILD_RENAME_RESULT: [success: boolean];
    /** @remarks Synchronous event. */
    RESEARCH_ARTIFACT_COMPLETE: [name: string];
    /** @remarks Synchronous event. */
    RESEARCH_ARTIFACT_DIG_SITE_UPDATED: [];
    /** @remarks Synchronous event. */
    RESEARCH_ARTIFACT_UPDATE: [];
    /** @remarks Synchronous event. */
    RESURRECT_REQUEST: [inviter: string];
    /** @remarks Synchronous event. */
    ROLE_CHANGED_INFORM: [changedName: string, fromName: string, oldRole: string, newRole: string];
    /** @remarks Synchronous event. */
    ROLE_POLL_BEGIN: [fromName: string];
    /** @remarks Synchronous event. */
    RUNE_POWER_UPDATE: [runeIndex: number, added: boolean | undefined];
    /** @remarks Synchronous event. */
    RUNE_TYPE_UPDATE: [runeIndex: number];
    /** @remarks Synchronous event. */
    RUNEFORGE_LEGENDARY_CRAFTING_CLOSED: [];
    /** @remarks Synchronous event. */
    RUNEFORGE_LEGENDARY_CRAFTING_OPENED: [isUpgrade: boolean];
    /** @remarks Synchronous event. */
    RUNEFORGE_POWER_INFO_UPDATED: [powerID: number];
    /** @remarks Synchronous event. */
    SAVED_VARIABLES_TOO_LARGE: [addOnName: string];
    /** @remarks Synchronous event. */
    SCENARIO_BONUS_OBJECTIVE_COMPLETE: [bonusObjectiveID: number];
    /** @remarks Synchronous event. */
    SCENARIO_BONUS_VISIBILITY_UPDATE: [];
    /** @remarks Synchronous event. */
    SCENARIO_COMPLETED: [questID: number | undefined, xp: number | undefined, money: number | undefined];
    /** @remarks Synchronous event. */
    SCENARIO_CRITERIA_SHOW_STATE_UPDATE: [show: boolean];
    /** @remarks Synchronous event. */
    SCENARIO_CRITERIA_UPDATE: [criteriaID: number];
    /** @remarks Synchronous event. */
    SCENARIO_POI_UPDATE: [];
    /** @remarks Synchronous event. */
    SCENARIO_SPELL_UPDATE: [];
    /** @remarks Synchronous event. */
    SCENARIO_UPDATE: [newStep: boolean | undefined];
    /** @remarks Synchronous event. */
    SCRAPPING_MACHINE_ITEM_ADDED: [index: number];
    /** @remarks Synchronous event. */
    SCRAPPING_MACHINE_ITEM_REMOVED: [index: number];
    /** @remarks Synchronous event. */
    SCRAPPING_MACHINE_PENDING_ITEM_CHANGED: [];
    /** @remarks Synchronous event. */
    SCRAPPING_MACHINE_SCRAPPING_FINISHED: [];
    /** @remarks Synchronous event. */
    SCREENSHOT_FAILED: [];
    /** @remarks Synchronous event. */
    SCREENSHOT_STARTED: [];
    /** @remarks Synchronous event. */
    SCREENSHOT_SUCCEEDED: [];
    /** @remarks Synchronous event. */
    SCRIPTED_ANIMATIONS_UPDATE: [];
    /** @remarks Synchronous event. */
    SEARCH_DB_LOADED: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_CANCEL: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_CONFIRM_HOUSING_PURCHASE: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_CONFIRM_SEND_MAIL: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_CONFIRM_TAKE_MAIL_MONEY: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_CONFIRM_TRADE_ACCEPT: [];
    /** @remarks Synchronous event. */
    SECURE_TRANSFER_HOUSING_CURRENCY_PURCHASE_CONFIRMATION: [];
    /** @remarks Synchronous event. */
    SELECTED_LOADOUT_CHANGED: [];
    /** @remarks Synchronous event. */
    SELF_RES_SPELL_CHANGED: [];
    /** @remarks Synchronous event. */
    SEND_MAIL_COD_CHANGED: [];
    /** @remarks Synchronous event. */
    SEND_MAIL_MONEY_CHANGED: [];
    /** @remarks Synchronous event. */
    SET_SEEN_PRODUCTS: [productIds: number[]];
    /** @remarks Synchronous event. */
    SETTINGS_HEADER_TEXT_UPDATE: [];
    /** @remarks Synchronous event. */
    SETTINGS_LOADED: [];
    /** @remarks Synchronous event. */
    SETTINGS_PANEL_OPEN: [openToCategoryID: number | undefined, scrollToElementName: string | undefined];
    /** @remarks Synchronous event. */
    SHARD_TRANSFER: [];
    /** @remarks Synchronous event. */
    SHARD_TRANSFER_CANCELLED: [];
    /** @remarks Synchronous event. */
    SHARD_TRANSFER_IMMINENT: [];
    /** @remarks Synchronous event. */
    SHIPMENT_CRAFTER_CLOSED: [];
    /** @remarks Synchronous event. */
    SHIPMENT_CRAFTER_INFO: [success: number, shipmentCount: number, maxShipments: number, ownedShipments: number, plotInstanceID: number];
    /** @remarks Synchronous event. */
    SHIPMENT_CRAFTER_OPENED: [charShipmentContainerID: number];
    /** @remarks Synchronous event. */
    SHIPMENT_CRAFTER_REAGENT_UPDATE: [];
    /** @remarks Synchronous event. */
    SHIPMENT_UPDATE: [shipmentStarted: boolean | undefined, hasAttachedFollower: boolean | undefined];
    /**
     * Signaled when SpellScript indicates that a curio has been learned or upgraded. Will show the companion config UI.
     * @remarks Synchronous event.
     */
    SHOW_DELVES_COMPANION_CONFIGURATION_UI: [];
    /** @remarks Synchronous event. */
    SHOW_END_OF_MATCH_UI: [];
    /** @remarks Synchronous event. */
    SHOW_FACTION_SELECT_UI: [];
    /** @remarks Synchronous event. */
    SHOW_HYPERLINK_TOOLTIP: [hyperlink: string];
    /**
     * Signaled when the UI needs to display the journeys dashboard at a specific faction.
     * @remarks Synchronous event.
     */
    SHOW_JOURNEYS_UI: [factionID: number];
    /** @remarks Synchronous event. */
    SHOW_LFG_EXPAND_SEARCH_PROMPT: [];
    /** @remarks Synchronous event. */
    SHOW_LOOT_TOAST: [typeIdentifier: string, itemLink: string, quantity: number, specID: number, sex: number, personalLootToast: boolean, toastMethod: number, lessAwesome: boolean, upgraded: boolean, corrupted: boolean];
    /** @remarks Synchronous event. */
    SHOW_LOOT_TOAST_LEGENDARY_LOOTED: [itemLink: string];
    /** @remarks Synchronous event. */
    SHOW_LOOT_TOAST_UPGRADE: [itemLink: string, quantity: number, specID: number, sex: number, baseQuality: number, personalLootToast: boolean, lessAwesome: boolean];
    /** @remarks Synchronous event. */
    SHOW_NEIGHBORHOOD_OWNERSHIP_TRANSFER_DIALOG: [neighborhoodName: string, cosmeticOwnerName: string];
    /** @remarks Synchronous event. */
    SHOW_NEW_PRODUCT_NOTIFICATION: [];
    /** @remarks Synchronous event. */
    SHOW_PARTY_POSE_UI: [mapID: number, won: boolean];
    /** @remarks Synchronous event. */
    SHOW_PLAYER_EVICTED_DIALOG: [];
    /** @remarks Synchronous event. */
    SHOW_PVP_FACTION_LOOT_TOAST: [typeIdentifier: string, itemLink: string, quantity: number, specID: number, sex: number, personalLootToast: boolean, lessAwesome: boolean];
    /** @remarks Synchronous event. */
    SHOW_RATED_PVP_REWARD_TOAST: [typeIdentifier: string, itemLink: string, quantity: number, specID: number, sex: number, personalLootToast: boolean, lessAwesome: boolean];
    /** @remarks Synchronous event. */
    SHOW_STAIR_DIRECTION_CONFIRMATION: [];
    /** @remarks Synchronous event. */
    SHOW_SUBSCRIPTION_INTERSTITIAL: [type: Enum.SubscriptionInterstitialType];
    /** @remarks Synchronous event. */
    SHOW_SUBTITLE: [subtitle: string, sender: string | undefined];
    /** @remarks Synchronous event. */
    SIMPLE_BROWSER_POPUP: [url: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SIMPLE_BROWSER_SOCIAL_CALLBACK_INVOKED: [url: string];
    /** @remarks Synchronous event. */
    SIMPLE_BROWSER_WEB_ERROR: [errorCode: number];
    /** @remarks Synchronous event. */
    SIMPLE_BROWSER_WEB_PROXY_FAILED: [];
    /** @remarks Synchronous event. */
    SIMPLE_CHECKOUT_CLOSED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SKILL_LINE_SPECS_RANKS_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SKILL_LINE_SPECS_UNLOCKED: [skillLineID: number, tradeSkillID: number];
    /** @remarks Synchronous event. */
    SKILL_LINES_CHANGED: [];
    /** @remarks Synchronous event. */
    SOCIAL_QUEUE_CONFIG_UPDATED: [];
    /** @remarks Synchronous event. */
    SOCIAL_QUEUE_UPDATE: [groupGUID: string, numAddedItems: number | undefined];
    /** @remarks Synchronous event. */
    SOCIAL_UI_FRIENDS_LIST_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    SOCIAL_UI_RAID_LIST_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    SOCIAL_UI_SOCIAL_QUEUE_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    SOCIAL_UI_SYSTEM_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_ACCEPT: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_BIND_CONFIRM: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_CLOSE: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_FAILURE: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_REFUNDABLE_CONFIRM: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_SUCCESS: [];
    /** @remarks Synchronous event. */
    SOCKET_INFO_UI_EVENT_REGISTRATION_UPDATE: [uiType: Enum.ItemSocketInfoUIType];
    /** @remarks Synchronous event. */
    SOCKET_INFO_UPDATE: [];
    /** @remarks Synchronous event. */
    SOULBIND_ACTIVATED: [soulbindID: number];
    /** @remarks Synchronous event. */
    SOULBIND_CONDUIT_COLLECTION_CLEARED: [];
    /** @remarks Synchronous event. */
    SOULBIND_CONDUIT_COLLECTION_REMOVED: [conduitID: number];
    /** @remarks Synchronous event. */
    SOULBIND_CONDUIT_COLLECTION_UPDATED: [collectionData: ConduitCollectionData];
    /** @remarks Synchronous event. */
    SOULBIND_CONDUIT_INSTALLED: [nodeID: number, data: SoulbindConduitData];
    /** @remarks Synchronous event. */
    SOULBIND_CONDUIT_UNINSTALLED: [nodeID: number, data: SoulbindConduitData];
    /** @remarks Synchronous event. */
    SOULBIND_FORGE_INTERACTION_ENDED: [];
    /** @remarks Synchronous event. */
    SOULBIND_FORGE_INTERACTION_STARTED: [];
    /** @remarks Synchronous event. */
    SOULBIND_NODE_LEARNED: [nodeID: number];
    /** @remarks Synchronous event. */
    SOULBIND_NODE_UNLEARNED: [nodeID: number];
    /** @remarks Synchronous event. */
    SOULBIND_NODE_UPDATED: [nodeID: number];
    /** @remarks Synchronous event. */
    SOULBIND_PATH_CHANGED: [];
    /** @remarks Synchronous event. */
    SOULBIND_PENDING_CONDUIT_CHANGED: [nodeID: number, conduitID: number];
    /** @remarks Synchronous event. */
    SOUND_DEVICE_UPDATE: [];
    /** @remarks Synchronous event. */
    SOUNDKIT_FINISHED: [soundHandle: number];
    /** @remarks Synchronous event. */
    SPEC_INVOLUNTARILY_CHANGED: [isPet: boolean];
    /** @remarks Synchronous event. */
    SPECIALIZATION_CHANGE_CAST_FAILED: [];
    /** @remarks Synchronous event. */
    SPEED_UPDATE: [];
    /** @remarks Synchronous event. */
    SPELL_ACTIVATION_OVERLAY_GLOW_HIDE: [spellID: number];
    /** @remarks Synchronous event. */
    SPELL_ACTIVATION_OVERLAY_GLOW_SHOW: [spellID: number];
    /** @remarks Synchronous event. */
    SPELL_ACTIVATION_OVERLAY_HIDE: [spellID: number | undefined];
    /** @remarks Synchronous event. */
    SPELL_ACTIVATION_OVERLAY_SHOW: [spellID: number, overlayFileDataID: number, locationType: Enum.ScreenLocationType, scale: number, r: number, g: number, b: number];
    /** @remarks Synchronous event. */
    SPELL_CONFIRMATION_PROMPT: [spellID: number, effectValue: number, message: string, duration: number, currencyTypesID: number, currencyCost: number, currentDifficulty: number, displayItemID: number, itemContext: number, treasureContextLevel: number];
    /** @remarks Synchronous event. */
    SPELL_CONFIRMATION_TIMEOUT: [spellID: number, effectValue: number];
    /** @remarks Synchronous event. */
    SPELL_DATA_LOAD_RESULT: [spellID: number, success: boolean];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    SPELL_FLYOUT_UPDATE: [flyoutID: number | undefined, spellID: number | undefined, isLearned: boolean | undefined];
    /** @remarks Synchronous event. */
    SPELL_POWER_CHANGED: [];
    /** @remarks Synchronous event. */
    SPELL_PUSHED_TO_ACTIONBAR: [spellID: number, slot: number, page: number];
    /** @remarks Synchronous event. */
    SPELL_PUSHED_TO_FLYOUT_ON_ACTIONBAR: [spellID: number, flyoutSlot: number, flyoutPage: number];
    /**
     * Used in conjunction with EnableSpellRangeCheck to inform the UI when a spell goes in or out of range with the current target.
     * @remarks Synchronous event.
     */
    SPELL_RANGE_CHECK_UPDATE: [spellIdentifier: number | string, isInRange: boolean, checksRange: boolean];
    /** @remarks Synchronous event. */
    SPELL_TEXT_UPDATE: [spellID: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    SPELL_UPDATE_CHARGES: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SPELL_UPDATE_COOLDOWN: [spellID: number | undefined, baseSpellID: number | undefined, category: number | undefined, startRecoveryCategory: number | undefined, itemID: number | undefined];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SPELL_UPDATE_ICON: [spellID: number | undefined];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SPELL_UPDATE_USABLE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SPELL_UPDATE_USES: [spellID: number, baseSpellID: number | undefined];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SPELLS_CHANGED: [];
    /** @remarks Synchronous event. */
    START_AUTOREPEAT_SPELL: [];
    /** @remarks Synchronous event. */
    START_LOOT_ROLL: [rollID: number, rollTime: number, lootHandle: number | undefined];
    /** @remarks Synchronous event. */
    START_PLAYER_COUNTDOWN: [initiatedBy: string, timeRemaining: number, totalTime: number, informChat: boolean, initiatedByName: string | undefined];
    /** @remarks Synchronous event. */
    START_TIMER: [timerType: Enum.StartTimerType, timeRemaining: number, totalTime: number];
    /** @remarks Synchronous event. */
    STARTER_BUILD_ACTIVATION_FAILED: [];
    /** @remarks Synchronous event. */
    STOP_AUTOREPEAT_SPELL: [];
    /** @remarks Synchronous event. */
    STOP_MOVIE: [];
    /** @remarks Synchronous event. */
    STOP_TIMER_OF_TYPE: [timerType: Enum.StartTimerType];
    /** @remarks Synchronous event. */
    STORE_FRONT_STATE_UPDATED: [storeFrontID: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    STREAM_VIEW_MARKER_UPDATED: [clubId: string, streamId: string, lastReadTime: number | undefined];
    /** @remarks Synchronous event. */
    STREAMING_ICON: [streamingStatus: number];
    /** @remarks Synchronous event. */
    STURDINESS_UPDATE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SUPER_TRACKING_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SUPER_TRACKING_PATH_UPDATED: [];
    /** @remarks Synchronous event. */
    SURVEY_DELIVERED: [];
    /** @remarks Synchronous event. */
    SYSMSG: [string: string, r: number, g: number, b: number];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    SYSTEM_VISIBILITY_CHANGED: [];
    /** @remarks Synchronous event. */
    TABARD_CANSAVE_CHANGED: [];
    /** @remarks Synchronous event. */
    TABARD_SAVE_PENDING: [];
    /** @remarks Synchronous event. */
    TALENTS_INVOLUNTARILY_RESET: [isPetTalents: boolean];
    /** @remarks Synchronous event. */
    TALKINGHEAD_CLOSE: [];
    /** @remarks Synchronous event. */
    TALKINGHEAD_REQUESTED: [];
    /** @remarks Synchronous event. */
    TASK_PROGRESS_UPDATE: [];
    /** @remarks Synchronous event. */
    TAXI_NODE_STATUS_CHANGED: [];
    /** @remarks Synchronous event. */
    TAXIMAP_CLOSED: [];
    /** @remarks Synchronous event. */
    TAXIMAP_OPENED: [system: number];
    /** @remarks Synchronous event. */
    TIME_PLAYED_MSG: [totalTimePlayed: number, timePlayedThisLevel: number];
    /** @remarks Synchronous event. */
    TOGGLE_CONSOLE: [showConsole: boolean | undefined];
    /** @remarks Synchronous event. */
    TOKEN_AUCTION_SOLD: [];
    /** @remarks Synchronous event. */
    TOKEN_BUY_CONFIRM_REQUIRED: [];
    /** @remarks Synchronous event. */
    TOKEN_BUY_RESULT: [result: number];
    /** @remarks Synchronous event. */
    TOKEN_CAN_VETERAN_BUY_UPDATE: [result: number];
    /** @remarks Synchronous event. */
    TOKEN_DISTRIBUTIONS_UPDATED: [result: number];
    /** @remarks Synchronous event. */
    TOKEN_MARKET_PRICE_UPDATED: [result: number];
    /** @remarks Synchronous event. */
    TOKEN_REDEEM_BALANCE_UPDATED: [];
    /** @remarks Synchronous event. */
    TOKEN_REDEEM_CONFIRM_REQUIRED: [choiceType: number];
    /** @remarks Synchronous event. */
    TOKEN_REDEEM_FRAME_SHOW: [];
    /** @remarks Synchronous event. */
    TOKEN_REDEEM_GAME_TIME_UPDATED: [];
    /** @remarks Synchronous event. */
    TOKEN_REDEEM_RESULT: [result: number, choiceType: number];
    /** @remarks Synchronous event. */
    TOKEN_SELL_CONFIRM_REQUIRED: [];
    /** @remarks Synchronous event. */
    TOKEN_SELL_CONFIRMED: [];
    /** @remarks Synchronous event. */
    TOKEN_SELL_RESULT: [result: number];
    /** @remarks Synchronous event. */
    TOKEN_STATUS_CHANGED: [];
    /**
     * Sends an update to the UI that a sparse or cache lookup has resolved
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    TOOLTIP_DATA_UPDATE: [dataInstanceID: number | undefined];
    TOOLTIP_SHOW_ITEM_COMPARISON: [comparisonItem: TooltipComparisonItem, tooltip: GameTooltip, anchorFrame: Frame | undefined];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    TOYS_UPDATED: [itemID: number | undefined, isNew: boolean | undefined, hasFanfare: boolean | undefined];
    /** @remarks Synchronous event. */
    TRACKABLE_INFO_UPDATE: [type: Enum.ContentTrackingType, id: number];
    /** @remarks Synchronous event. */
    TRACKED_ACHIEVEMENT_LIST_CHANGED: [achievementID: number | undefined, added: boolean | undefined];
    /** @remarks Synchronous event. */
    TRACKED_ACHIEVEMENT_UPDATE: [achievementID: number, criteriaID: number | undefined, elapsed: number | undefined, duration: number | undefined];
    /** @remarks Synchronous event. */
    TRACKED_HOUSE_CHANGED: [trackedHouse: string | undefined];
    /** @remarks Synchronous event. */
    TRACKED_RECIPE_UPDATE: [recipeID: number, tracked: boolean];
    /** @remarks Synchronous event. */
    TRACKING_TARGET_INFO_UPDATE: [targetType: Enum.ContentTrackingTargetType, targetID: number];
    /** @remarks Synchronous event. */
    TRADE_ACCEPT_UPDATE: [playerAccepted: number, targetAccepted: number];
    /** @remarks Synchronous event. */
    TRADE_CLOSED: [];
    /** @remarks Synchronous event. */
    TRADE_CURRENCY_CHANGED: [];
    /** @remarks Synchronous event. */
    TRADE_MONEY_CHANGED: [];
    /** @remarks Synchronous event. */
    TRADE_PLAYER_ITEM_CHANGED: [tradeSlotIndex: number];
    /** @remarks Synchronous event. */
    TRADE_POTENTIAL_BIND_ENCHANT: [canBecomeBoundForTrade: boolean];
    /** @remarks Synchronous event. */
    TRADE_POTENTIAL_REMOVE_TRANSMOG: [itemLink: string, tradeSlotIndex: number];
    /** @remarks Synchronous event. */
    TRADE_REPLACE_ENCHANT: [existing: string, replacement: string];
    /** @remarks Synchronous event. */
    TRADE_REQUEST: [name: string];
    /** @remarks Synchronous event. */
    TRADE_REQUEST_CANCEL: [];
    /** @remarks Synchronous event. */
    TRADE_SHOW: [];
    /** @remarks Synchronous event. */
    TRADE_SKILL_CLOSE: [];
    /** @remarks Synchronous event. */
    TRADE_SKILL_CRAFT_BEGIN: [recipeSpellID: number];
    /** @remarks Synchronous event. */
    TRADE_SKILL_CRAFTING_REAGENT_BONUS_TEXT_UPDATED: [itemID: number];
    /** @remarks Synchronous event. */
    TRADE_SKILL_CURRENCY_REWARD_RESULT: [data: CraftingCurrencyResultData];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRADE_SKILL_DATA_SOURCE_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRADE_SKILL_DATA_SOURCE_CHANGING: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRADE_SKILL_DETAILS_UPDATE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRADE_SKILL_FAVORITES_CHANGED: [isFavorite: boolean, recipeSpellID: number];
    /** @remarks Synchronous event. */
    TRADE_SKILL_ITEM_CRAFTED_RESULT: [data: CraftingItemResultData];
    /** @remarks Synchronous event. */
    TRADE_SKILL_ITEM_UPDATE: [itemGUID: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRADE_SKILL_LIST_UPDATE: [];
    /** @remarks Synchronous event. */
    TRADE_SKILL_NAME_UPDATE: [];
    /** @remarks Synchronous event. */
    TRADE_SKILL_SHOW: [];
    /** @remarks Synchronous event. */
    TRADE_TARGET_ITEM_CHANGED: [tradeSlotIndex: number];
    /** @remarks Synchronous event. */
    TRADE_UPDATE: [];
    /** @remarks Synchronous event. */
    TRADE_UPDATE_WARNINGS: [];
    /** @remarks Synchronous event. */
    TRAINER_CLOSED: [];
    /** @remarks Synchronous event. */
    TRAINER_DESCRIPTION_UPDATE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRAINER_SERVICE_INFO_NAME_UPDATE: [];
    /** @remarks Synchronous event. */
    TRAINER_SHOW: [];
    /** @remarks Synchronous event. */
    TRAINER_UPDATE: [];
    /** @remarks Synchronous event. */
    TRAINING_GROUNDS_ENABLED_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    TRAIT_COND_INFO_CHANGED: [condID: number];
    /** @remarks Synchronous event. */
    TRAIT_CONFIG_CREATED: [configInfo: TraitConfigInfo];
    /** @remarks Synchronous event. */
    TRAIT_CONFIG_DELETED: [configID: number];
    /** @remarks Synchronous event. */
    TRAIT_CONFIG_LIST_UPDATED: [];
    /** @remarks Synchronous event. */
    TRAIT_CONFIG_UPDATED: [configID: number];
    /** @remarks Synchronous event. */
    TRAIT_NODE_CHANGED: [nodeID: number];
    /** @remarks Synchronous event. */
    TRAIT_NODE_CHANGED_PARTIAL: [ID: number, info: TraitNodeInfoPartial];
    /** @remarks Synchronous event. */
    TRAIT_NODE_ENTRY_UPDATED: [nodeEntryID: number];
    /** @remarks Synchronous event. */
    TRAIT_SUB_TREE_CHANGED: [subTreeID: number];
    /** @remarks Synchronous event. */
    TRAIT_SYSTEM_INTERACTION_STARTED: [treeID: number];
    /** @remarks Synchronous event. */
    TRAIT_SYSTEM_NPC_CLOSED: [];
    /** @remarks Synchronous event. */
    TRAIT_TREE_CHANGED: [treeID: number];
    /** @remarks Synchronous event. */
    TRAIT_TREE_CURRENCY_INFO_UPDATED: [treeID: number];
    /** @remarks Synchronous event. */
    TRANSMOG_COLLECTION_CAMERA_UPDATE: [];
    /** @remarks Synchronous event. */
    TRANSMOG_COLLECTION_ITEM_FAVORITE_UPDATE: [itemAppearanceID: number, isFavorite: boolean];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRANSMOG_COLLECTION_ITEM_UPDATE: [];
    /** @remarks Synchronous event. */
    TRANSMOG_COLLECTION_SOURCE_ADDED: [itemModifiedAppearanceID: number];
    /** @remarks Synchronous event. */
    TRANSMOG_COLLECTION_SOURCE_REMOVED: [itemModifiedAppearanceID: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    TRANSMOG_COLLECTION_UPDATED: [collectionIndex: number | undefined, modID: number | undefined, itemAppearanceID: number | undefined, reason: string | undefined];
    /** @remarks Synchronous event. */
    TRANSMOG_COSMETIC_COLLECTION_SOURCE_ADDED: [itemModifiedAppearanceID: number];
    /** @remarks Synchronous event. */
    TRANSMOG_CUSTOM_SETS_CHANGED: [];
    /** @remarks Synchronous event. */
    TRANSMOG_DISPLAYED_OUTFIT_CHANGED: [];
    /** @remarks Synchronous event. */
    TRANSMOG_OUTFITS_CHANGED: [newOutfitID: number | undefined];
    /** @remarks Synchronous event. */
    TRANSMOG_SEARCH_UPDATED: [searchType: Enum.TransmogSearchType, collectionType: Enum.TransmogCollectionType | undefined];
    /** @remarks Synchronous event. */
    TRANSMOG_SETS_UPDATE_FAVORITE: [];
    /** @remarks Synchronous event. */
    TRANSMOG_SOURCE_COLLECTABILITY_UPDATE: [itemModifiedAppearanceID: number, collectable: boolean];
    /** @remarks Synchronous event. */
    TRANSMOGRIFY_CLOSE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    TRANSMOGRIFY_ITEM_UPDATE: [];
    /** @remarks Synchronous event. */
    TRANSMOGRIFY_OPEN: [];
    /** @remarks Synchronous event. */
    TRANSMOGRIFY_SUCCESS: [transmogLocation: TransmogLocationMixin];
    /** @remarks Synchronous event. */
    TRANSMOGRIFY_UPDATE: [transmogLocation: TransmogLocationMixin | undefined, action: string | undefined];
    /** @remarks Synchronous event. */
    TREASURE_PICKER_CACHE_FLUSH: [];
    /** @remarks Synchronous event. */
    TRIAL_CAP_REACHED_MONEY: [];
    /** @remarks Synchronous event. */
    TRY_PURCHASE_TO_NODE_PARTIAL_SUCCESS: [nodeFinishedOn: number];
    /** @remarks Synchronous event. */
    TUTORIAL_COMBAT_EVENT: [];
    /** @remarks Synchronous event. */
    TUTORIAL_HIGHLIGHT_SPELL: [spellID: number, tutorialGlobalStringTag: string];
    /** @remarks Synchronous event. */
    TUTORIAL_TRIGGER: [tutorialIndex: number, forceShow: boolean];
    /** @remarks Synchronous event. */
    TUTORIAL_UNHIGHLIGHT_SPELL: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UI_ERROR_MESSAGE: [errorType: number, message: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UI_ERROR_POPUP: [errorType: number, message: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UI_INFO_MESSAGE: [errorType: number, message: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UI_MODEL_SCENE_INFO_UPDATED: [];
    /** @remarks Synchronous event. */
    UI_SCALE_CHANGED: [];
    /** @remarks Synchronous event. */
    UNIT_ABSORB_AMOUNT_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_AREA_CHANGED: [unitTarget: UnitToken];
    /**
     * Only signaled when the active player is a commentator or spectator.
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_ARENA_COOLDOWNS_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_ATTACK: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_ATTACK_POWER: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_ATTACK_SPEED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_AURA: [unitTarget: UnitToken, updateInfo: UnitAuraUpdateInfo];
    /** @remarks Synchronous event. */
    UNIT_AURA_BLOCK_LIST_CLEARED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_AURA_BLOCKED: [unitTarget: UnitToken, auraInstanceID: number];
    /** @remarks Synchronous event. */
    UNIT_CHEAT_TOGGLE_EVENT: [];
    /** @remarks Synchronous event. */
    UNIT_CLASSIFICATION_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_COMBAT: [unitTarget: UnitToken, event: string, flagText: string, amount: number, schoolMask: number];
    /** @remarks Synchronous event. */
    UNIT_CONNECTION: [unitTarget: UnitToken, isConnected: boolean];
    /** @remarks Synchronous event. */
    UNIT_CTR_OPTIONS: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_DAMAGE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_DEFENSE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_DIED: [unitGUID: string];
    /** @remarks Synchronous event. */
    UNIT_DISPLAYPOWER: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_DISTANCE_CHECK_UPDATE: [unitTarget: UnitToken, isInDistance: boolean];
    /** @remarks Synchronous event. */
    UNIT_ENTERED_VEHICLE: [unitTarget: UnitToken, showVehicleFrame: boolean, isControlSeat: boolean, vehicleUIIndicatorID: number, vehicleGUID: string, mayChooseExit: boolean, hasPitch: boolean];
    /** @remarks Synchronous event. */
    UNIT_ENTERING_VEHICLE: [unitTarget: UnitToken, showVehicleFrame: boolean, isControlSeat: boolean, vehicleUIIndicatorID: number, vehicleGUID: string, mayChooseExit: boolean, hasPitch: boolean];
    /** @remarks Synchronous event. */
    UNIT_EXITED_VEHICLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_EXITING_VEHICLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_FACTION: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_FLAGS: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_FORM_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_GUILD_LEVEL: [newLevel: number];
    /** @remarks Synchronous event. */
    UNIT_HAPPINESS: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_HEAL_ABSORB_AMOUNT_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_HEAL_PREDICTION: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_HEALTH: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_IN_RANGE_UPDATE: [unitTarget: UnitToken, isInRange: boolean];
    /** @remarks Synchronous event. */
    UNIT_INVENTORY_CHANGED: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_LEVEL: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_LOOT: [unitGUID: string, hasLoot: boolean];
    /** @remarks Synchronous event. */
    UNIT_MANA: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_MAX_HEALTH_MODIFIERS_CHANGED: [unitTarget: UnitToken, percentMaxHealthAdjusted: number];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_MAXHEALTH: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_MAXPOWER: [unitTarget: UnitToken, powerType: string];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_MODEL_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_NAME_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_OTHER_PARTY_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_PET: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_PET_EXPERIENCE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_PET_TRAINING_POINTS: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_PHASE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_PING_PIN_ADDED: [guid: string, uiTextureKit: string];
    /** @remarks Synchronous event. */
    UNIT_PING_PIN_REMOVED: [guid: string];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_PORTRAIT_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_POWER_BAR_HIDE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_POWER_BAR_SHOW: [unitTarget: UnitToken];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UNIT_POWER_BAR_TIMER_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_POWER_FREQUENT: [unitTarget: UnitToken, powerType: string];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UNIT_POWER_POINT_CHARGE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_POWER_UPDATE: [unitTarget: UnitToken, powerType: string];
    /** @remarks Synchronous event. */
    UNIT_QUEST_LOG_CHANGED: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_RANGED_ATTACK_POWER: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_RANGEDDAMAGE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_RESISTANCES: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_SPELL_DIMINISH_CATEGORY_STATE_UPDATED: [unitTarget: UnitToken, trackerInfo: SpellDiminishTrackerInfo];
    /** @remarks Synchronous event. */
    UNIT_SPELL_HASTE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_CHANNEL_START: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_CHANNEL_STOP: [unitTarget: UnitToken, castGUID: string, spellID: number, interruptedBy: string, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_CHANNEL_UPDATE: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_DELAYED: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_EMPOWER_START: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_EMPOWER_STOP: [unitTarget: UnitToken, castGUID: string, spellID: number, complete: boolean, interruptedBy: string, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_EMPOWER_UPDATE: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_FAILED: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_FAILED_QUIET: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_INTERRUPTED: [unitTarget: UnitToken, castGUID: string, spellID: number, interruptedBy: string, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_INTERRUPTIBLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_NOT_INTERRUPTIBLE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_RETICLE_CLEAR: [unitTarget: UnitToken, castGUID: string, spellID: number];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_RETICLE_TARGET: [unitTarget: UnitToken, castGUID: string, spellID: number];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_SENT: [unitTarget: UnitToken, target: string, castGUID: string, spellID: number];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_START: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_STOP: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_SPELLCAST_SUCCEEDED: [unitTarget: UnitToken, castGUID: string, spellID: number, castBarID: UnitCastBarID | undefined];
    /** @remarks Synchronous event. */
    UNIT_STATS: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UNIT_TARGET: [unitTarget: UnitToken];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UNIT_TARGETABLE_CHANGED: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_THREAT_LIST_UPDATE: [unitTarget: UnitToken];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UNIT_THREAT_SITUATION_UPDATE: [unitTarget: UnitToken];
    /** @remarks Synchronous event. */
    UPDATE_ACTIVE_BATTLEFIELD: [];
    /** @remarks Synchronous event. */
    UPDATE_ALL_UI_WIDGETS: [];
    /** @remarks Synchronous event. */
    UPDATE_BATTLEFIELD_SCORE: [];
    /** @remarks Synchronous event. */
    UPDATE_BATTLEFIELD_STATUS: [battleFieldIndex: number];
    /** @remarks Synchronous event. */
    UPDATE_BINDINGS: [];
    /**
     * @remarks Synchronous event.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    UPDATE_BONUS_ACTIONBAR: [];
    /** @remarks Synchronous event. */
    UPDATE_BULLETIN_BOARD_MEMBER_TYPE: [player: string, residentType: ResidentType];
    /** @remarks Synchronous event. */
    UPDATE_BULLETIN_BOARD_ROSTER: [neighborhoodInfo: NeighborhoodInfo, rosterMemberList: NeighborhoodRosterMemberInfo[]];
    /** @remarks Synchronous event. */
    UPDATE_BULLETIN_BOARD_ROSTER_STATUSES: [rosterMemberList: NeighborhoodRosterMemberUpdateInfo[]];
    /** @remarks Synchronous event. */
    UPDATE_CHAT_COLOR: [name: string, r: number, g: number, b: number];
    /** @remarks Synchronous event. */
    UPDATE_CHAT_COLOR_NAME_BY_CLASS: [name: string, colorNameByClass: boolean];
    /** @remarks Synchronous event. */
    UPDATE_CHAT_WINDOWS: [];
    /** @remarks Synchronous event. */
    UPDATE_EXHAUSTION: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_EXTRA_ACTIONBAR: [];
    /** @remarks Synchronous event. */
    UPDATE_FACTION: [];
    /** @remarks Synchronous event. */
    UPDATE_FLOATING_CHAT_WINDOWS: [];
    /** @remarks Synchronous event. */
    UPDATE_INSTANCE_INFO: [];
    /** @remarks Synchronous event. */
    UPDATE_INVENTORY_ALERTS: [];
    /** @remarks Synchronous event. */
    UPDATE_INVENTORY_DURABILITY: [];
    /** @remarks Synchronous event. */
    UPDATE_LFG_LIST: [];
    /** @remarks Synchronous event. */
    UPDATE_MACROS: [];
    /** @remarks Synchronous event. */
    UPDATE_MASTER_LOOT_LIST: [];
    /** @remarks Synchronous event. */
    UPDATE_MOUSEOVER_UNIT: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_MULTI_CAST_ACTIONBAR: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_OVERRIDE_ACTIONBAR: [];
    /** @remarks Synchronous event. */
    UPDATE_PENDING_MAIL: [];
    /** @remarks Synchronous event. */
    UPDATE_POSSESS_BAR: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_SHAPESHIFT_COOLDOWN: [];
    /** @remarks Synchronous event. */
    UPDATE_SHAPESHIFT_FORM: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_SHAPESHIFT_FORMS: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_SHAPESHIFT_USABLE: [];
    /** @remarks Synchronous event. */
    UPDATE_SPELL_TARGET_ITEM_CONTEXT: [];
    /** @remarks Synchronous event. */
    UPDATE_STEALTH: [];
    /** @remarks Synchronous event. */
    UPDATE_SUMMONPETS_ACTION: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    UPDATE_TRADESKILL_CAST_STOPPED: [isScrapping: boolean];
    /** @remarks Synchronous event. */
    UPDATE_UI_WIDGET: [widgetInfo: UIWidgetInfo];
    /** @remarks Synchronous event. */
    UPDATE_VEHICLE_ACTIONBAR: [];
    /** @remarks Synchronous event. */
    UPDATE_WEB_TICKET: [hasTicket: boolean, numTickets: number | undefined, ticketStatus: number | undefined, caseIndex: number | undefined, waitTimeMinutes: number | undefined, waitMessage: string | undefined, caseTitle: string | undefined, caseDescription: string | undefined];
    /** @remarks Synchronous event. */
    URL_TEXTURE_REQUEST_RESULT: [texture: Texture, result: Enum.UrlTextureResult];
    /** @remarks Synchronous event. */
    USE_BIND_CONFIRM: [];
    /** @remarks Synchronous event. */
    USE_COMBINED_BAGS_CHANGED: [useCombinedBags: boolean];
    /** @remarks Synchronous event. */
    USE_GLYPH: [spellID: number];
    /** @remarks Synchronous event. */
    USE_NO_REFUND_CONFIRM: [];
    /** @remarks Synchronous event. */
    USER_WAYPOINT_UPDATED: [];
    /** @remarks Synchronous event. */
    VARIABLES_LOADED: [];
    /** @remarks Synchronous event. */
    VEHICLE_ANGLE_SHOW: [shouldShow: number | undefined];
    /** @remarks Synchronous event. */
    VEHICLE_ANGLE_UPDATE: [normalizedPitch: number, radians: number];
    /** @remarks Synchronous event. */
    VEHICLE_PASSENGERS_CHANGED: [];
    /** @remarks Synchronous event. */
    VEHICLE_POWER_SHOW: [shouldShow: number | undefined];
    /** @remarks Synchronous event. */
    VEHICLE_UPDATE: [];
    /** @remarks Synchronous event. */
    VIEW_HOUSES_LIST_RECIEVED: [houseInfos: HouseInfo[]];
    /** @remarks Synchronous event. */
    VIEWED_TRANSMOG_OUTFIT_CHANGED: [];
    /** @remarks Synchronous event. */
    VIEWED_TRANSMOG_OUTFIT_SECONDARY_SLOTS_CHANGED: [];
    /** @remarks Synchronous event. */
    VIEWED_TRANSMOG_OUTFIT_SITUATIONS_CHANGED: [];
    /** @remarks Synchronous event. */
    VIEWED_TRANSMOG_OUTFIT_SLOT_OPTION_CHANGED: [slot: Enum.TransmogOutfitSlot, option: Enum.TransmogOutfitSlotOption];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    VIEWED_TRANSMOG_OUTFIT_SLOT_REFRESH: [];
    /** @remarks Synchronous event. */
    VIEWED_TRANSMOG_OUTFIT_SLOT_SAVE_SUCCESS: [slot: Enum.TransmogOutfitSlot, type: Enum.TransmogType, option: Enum.TransmogOutfitSlotOption];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    VIGNETTE_MINIMAP_UPDATED: [vignetteGUID: string, onMinimap: boolean];
    /** @remarks Synchronous event. */
    VIGNETTES_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_ACTIVE_INPUT_DEVICE_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_ACTIVE_OUTPUT_DEVICE_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_ACTIVE_VOICE_PROVIDER_CHANGED: [voiceProviderID: Enum.VoiceProviderID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_AUDIO_CAPTURE_ENERGY: [isSpeaking: boolean, energy: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_AUDIO_CAPTURE_STARTED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_AUDIO_CAPTURE_STOPPED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_ACTIVATED: [channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_DEACTIVATED: [channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_DISPLAY_NAME_CHANGED: [channelID: VoiceChatID, channelDisplayName: string];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_JOINED: [status: Enum.VoiceChatStatusCode, channelID: VoiceChatID, channelType: Enum.ChatChannelType, clubId: string | undefined, streamId: string | undefined];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_ACTIVE_STATE_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, isActive: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_ADDED: [memberID: VoiceChatID, channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_ENERGY_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, speakingEnergy: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_GUID_UPDATED: [memberID: VoiceChatID, channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_MUTE_FOR_ALL_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, isMutedForAll: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_MUTE_FOR_ME_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, isMutedForMe: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_REMOVED: [memberID: VoiceChatID, channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_SILENCED_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, isSilenced: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_SPEAKING_STATE_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, isSpeaking: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_STT_MESSAGE: [memberID: VoiceChatID, channelID: VoiceChatID, message: string, language: string];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MEMBER_VOLUME_CHANGED: [memberID: VoiceChatID, channelID: VoiceChatID, volume: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_MUTE_STATE_CHANGED: [channelID: VoiceChatID, isMuted: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_PTT_CHANGED: [channelID: VoiceChatID, pushToTalkSetting: string];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_REMOVED: [channelID: VoiceChatID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_TRANSCRIBING_CHANGED: [channelID: VoiceChatID, isTranscribing: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_TRANSMIT_CHANGED: [channelID: VoiceChatID, isTransmitting: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CHANNEL_VOLUME_CHANGED: [channelID: VoiceChatID, volume: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_COMMUNICATION_MODE_CHANGED: [communicationMode: Enum.CommunicationMode];
    /** @remarks Synchronous event. */
    VOICE_CHAT_CONNECTION_SUCCESS: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_DEAFENED_CHANGED: [isDeafened: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_DISCORD_SETTINGS_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_ERROR: [platformCode: number, statusCode: Enum.VoiceChatStatusCode];
    /** @remarks Synchronous event. */
    VOICE_CHAT_INPUT_DEVICES_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_LOGIN: [status: Enum.VoiceChatStatusCode];
    /** @remarks Synchronous event. */
    VOICE_CHAT_LOGOUT: [status: Enum.VoiceChatStatusCode];
    /** @remarks Synchronous event. */
    VOICE_CHAT_MUTED_CHANGED: [isMuted: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_OUTPUT_DEVICES_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_PENDING_CHANNEL_JOIN_STATE: [channelType: Enum.ChatChannelType, clubId: string | undefined, streamId: string | undefined, pendingJoin: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_PTT_BUTTON_PRESSED_STATE_CHANGED: [isPressed: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_SILENCED_CHANGED: [isSilenced: boolean];
    /** @remarks Synchronous event. */
    VOICE_CHAT_SPEAK_FOR_ME_ACTIVE_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_SPEAK_FOR_ME_FEATURE_STATUS_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_PLAYBACK_BOOKMARK: [utteranceID: number, bookmarkName: string];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_PLAYBACK_FAILED: [utteranceID: number, status: Enum.VoiceTtsStatusCode];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_PLAYBACK_FINISHED: [utteranceID: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_PLAYBACK_STARTED: [utteranceID: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_SPEAK_TEXT_UPDATE: [status: Enum.VoiceTtsStatusCode, utteranceID: number];
    /** @remarks Synchronous event. */
    VOICE_CHAT_TTS_VOICES_UPDATE: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_VAD_SETTINGS_UPDATED: [];
    /** @remarks Synchronous event. */
    VOICE_CHAT_VOICE_PROVIDER_CHANGED: [voiceProviderID: Enum.VoiceProviderID];
    /** @remarks Synchronous event. */
    VOICE_CHAT_VOICE_PROVIDERS_AVAILABLE_CHANGED: [];
    /** @remarks Synchronous event. */
    VOTE_KICK_REASON_NEEDED: [name: string, resultGUID: string];
    /**
     * Signaled when the player or a private party member join a new walk-in instance or when the instance is shut down.
     * @remarks Synchronous event.
     */
    WALK_IN_DATA_UPDATE: [];
    /** @remarks Synchronous event. */
    WAR_MODE_STATUS_UPDATE: [warModeEnabled: boolean];
    /** @remarks Synchronous event. */
    WARBAND_SCENE_FAVORITES_UPDATED: [];
    /** @remarks Synchronous event. */
    WARFRONT_COMPLETED: [mapID: number, winner: number];
    /** @remarks Synchronous event. */
    WARGAME_INVITE_SENT: [];
    /** @remarks Synchronous event. */
    WARGAME_REQUEST_RESPONSE: [responderGUID: string, responderName: string | undefined, accepted: boolean];
    /** @remarks Synchronous event. */
    WARGAME_REQUESTED: [opposingPartyMemberName: string, battlegroundName: string, timeoutSeconds: number, tournamentRules: boolean];
    /** @remarks Synchronous event. */
    WAYPOINT_UPDATE: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    WEAPON_ENCHANT_CHANGED: [];
    /** @remarks Unique event: only the most recent one is delivered per frame. */
    WEAPON_SLOT_CHANGED: [];
    /**
     * The weather has taken a turn.
     * @remarks Unique event: only the most recent one is delivered per frame.
     */
    WEATHER_CHANGED: [];
    /** @remarks Synchronous event. */
    WEEKLY_REWARDS_ITEM_CHANGED: [];
    /** @remarks Synchronous event. */
    WEEKLY_REWARDS_UPDATE: [];
    /** @remarks Synchronous event. */
    WHO_LIST_UPDATE: [];
    /**
     * Sends an update when the mouse enters or leaves something in-world (object, unit, etc) that should display a tooltip
     * @remarks Synchronous event.
     */
    WORLD_CURSOR_TOOLTIP_UPDATE: [anchorType: Enum.WorldCursorAnchorType];
    /** @remarks Synchronous event. */
    WORLD_LOOT_OBJECT_INFO_UPDATED: [guid: string];
    /** @remarks Synchronous event. */
    WORLD_MAP_OPEN: [uiMapID: number | undefined];
    /** @remarks Synchronous event. */
    WORLD_PVP_QUEUE: [];
    /** @remarks Synchronous event. */
    WORLD_QUEST_COMPLETED_BY_SPELL: [questID: number];
    /** @remarks Synchronous event. */
    WORLD_STATE_TIMER_START: [timerID: number];
    /** @remarks Synchronous event. */
    WORLD_STATE_TIMER_STOP: [timerID: number];
    /** @remarks Synchronous event. */
    WOW_MOUSE_NOT_FOUND: [];
    /** @remarks Synchronous event. */
    ZONE_CHANGED: [];
    /** @remarks Synchronous event. */
    ZONE_CHANGED_INDOORS: [];
    /** @remarks Synchronous event. */
    ZONE_CHANGED_NEW_AREA: [];
}

/** Any event name the client can fire. */
type WowEvent = keyof WowEventPayloads;
