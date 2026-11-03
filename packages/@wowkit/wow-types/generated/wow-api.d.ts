// GENERATED FILE - do not edit. Regenerate with "pnpm gen:types".
// Global functions and C_* namespaces.
// Source: https://github.com/Gethe/wow-ui-source.git (forever @ 17ed2c3e84), game version 1.60.1.70755

/** @noSelfInFile */

declare function AbbreviateLargeNumbers(number: number, options?: NumberAbbrevOptions): string;
declare function AbbreviateNumbers(number: number, options?: NumberAbbrevOptions): string;
declare function AcceptAreaSpiritHeal(): void;
declare function AcceptGuild(): void;
declare function AcceptResurrect(): void;
declare function AddSourceLocationExclude(fileName: string): void;
declare function Ambiguate(fullName: string, context: string): string;
/** If true, UnitGetAvailableRoles results should be treated as suggested role, not hard limits on what role the current player can display as. */
declare function AreClassRolesSoftSuggestions(): boolean;
declare function AreDangerousScriptsAllowed(): boolean;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function AssistUnit(name?: string, exactMatch?: boolean): void;
declare function AttackTarget(): void;
declare function AutoEquipCursorItem(): void;
declare function BeginTrade(): void;
declare function BreakUpLargeNumbers(largeNumber: number, natural?: boolean): string;
declare function CalculateStringEditDistance(firstString: string, secondString: string): number;
/** Returns true if the immediate calling function has appropriate permissions to access and operate on all supplied values. */
declare function canaccessallvalues(...values: (any)[]): boolean;
/** Returns true if the immediate calling function has appropriate permissions to access or operate on secret values. */
declare function canaccesssecrets(): boolean;
/** Returns true if the immediate calling function has appropriate permissions to index secret tables. This will return false if the caller cannot access the table value itself, or if access to the table contents is disallowed by taint. */
declare function canaccesstable(table: any): boolean;
/** Returns true if the immediate calling function has appropriate permissions to access and operate on a specific value. */
declare function canaccessvalue(value: any): boolean;
declare function CanBeRaidTarget(target: UnitToken): boolean;
declare function CancelAreaSpiritHeal(): void;
declare function CancelLogout(): void;
declare function CancelPendingEquip(index: number): void;
declare function CancelPreloadingMovie(movieId: number): void;
declare function CancelTrade(): void;
declare function CanChangePlayerDifficulty(): LuaMultiReturn<[canChange: boolean | undefined, notOnCooldown: boolean | undefined]>;
declare function CanDualWield(): boolean;
declare function CanEjectPassengerFromSeat(virtualSeatIndex: number): boolean;
declare function CanInspect(targetGUID: UnitToken): boolean;
declare function CanLootUnit(targetUnit: string): LuaMultiReturn<[hasLoot: boolean | undefined, canLoot: boolean | undefined]>;
declare function CanMapChangeDifficulty(mapID?: number): boolean;
declare function CanPortGraveyard(): boolean;
declare function CanShowResetInstances(): boolean;
declare function CanShowSetRoleButton(): boolean;
declare function CanSwitchVehicleSeat(): boolean;
declare function CanUpgradeToCurrentExpansion(): boolean;
declare function CaseAccentInsensitiveParse(name: string): string;
declare function CheckInteractDistance(unitGUID: UnitToken, distIndex: number): boolean;
declare function CheckTalentMasterDist(): boolean;
declare function CinematicFinished(movieType: Enum.CinematicType, userCanceled?: boolean, didError?: boolean): void;
declare function CinematicStarted(movieType: Enum.CinematicType, movieID: number, canCancel?: boolean): void;
declare function ClassicExpansionAtLeast(expansionLevel: number): boolean;
declare function ClassicExpansionAtMost(expansionLevel: number): boolean;
declare function ClearCursor(): void;
declare function ClearCursorHoveredItem(): void;
declare function ClearFocus(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function ClearOutage(): void;
declare function ClearPendingBindConversionItem(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function ClearRaidMarker(raidMarkerIndex?: number): void;
declare function ClearTarget(): boolean;
declare function ClosestGameObjectPosition(gameObjectID: number): LuaMultiReturn<[xPos: number | undefined, yPos: number | undefined, distance: number | undefined]>;
declare function ClosestUnitPosition(creatureID: number): LuaMultiReturn<[xPos: number | undefined, yPos: number | undefined, distance: number | undefined]>;
declare function ConfirmTalentWipe(): void;
declare function ConsoleEcho(command: string, addToHistory?: boolean, prefix?: string): boolean;
declare function ConsoleExec(command: string, addToHistory?: boolean): boolean;
declare function ConsoleGetAllCommands(): ConsoleCommandInfo[];
declare function ConsoleGetColorFromType(colorType: Enum.ConsoleColorType): ColorMixin;
declare function ConsoleGetFontHeight(): number;
declare function ConsoleIsActive(): boolean;
declare function ConsolePrintAllMatchingCommands(partialCommandText: string): void;
declare function ConsoleSetFontHeight(fontHeightInPixels: number): void;
declare function ConvertItemToBindToAccount(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function CopyToClipboard(text: string, removeMarkup?: boolean): number;
declare function CreateAbbreviateConfig(data: NumberAbbreviationBreakpoint[]): AbbreviateConfig;
declare function CreateFontFamily(name: string, members: CreateFontFamilyMemberInfo[]): Font;
declare function CreateFrameWithOptions(options: CreateFrameOptions): Frame;
declare function CreateFromMixins(...mixins: (any)[]): any;
/**
 * Creates a secure delegate closure for a Lua function. The delegate invokes the original function in a protected call context with secure execution taint, and supports passing and returning values directly.
 * @remarks Has restrictions: may fail or be blocked depending on game state.
 */
declare function CreateSecureDelegate(luaFunction: any, options?: SecureDelegateOptions): any;
declare function CreateUnitHealPredictionCalculator(): UnitHealPredictionCalculator;
declare function CreateWindow(popupStyle?: boolean, topMost?: boolean): SimpleWindow | undefined;
declare function CursorHasItem(): boolean;
declare function CursorHasMacro(): boolean;
declare function CursorHasMoney(): boolean;
declare function CursorHasSpell(): boolean;
/** Starts a timer for profiling. The final time can be obtained by calling debugprofilestop. */
declare function debugprofilestart(): void;
/** Returns the time in milliseconds since the last debugprofilestart call. */
declare function debugprofilestop(): number;
declare function DeclineGuild(): void;
declare function DeclineName(name: string, gender: Enum.UnitSex | undefined, declensionSet: number, namePartType?: Enum.NamePartType): LuaMultiReturn<[...declinedNames: (string)[]]>;
declare function DeclineResurrect(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function DeleteCursorItem(): void;
declare function DestroyTotem(slot: number): void;
declare function Dismount(): void;
declare function DoesCurrentLocaleSellExpansionLevels(): boolean;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function DropCursorMoney(): void;
/** Removes the ability for the immediate calling function to access secret values. */
declare function dropsecretaccess(): void;
/** Invokes the '__dump' metamethod on any value (if present), returning its result. */
declare function dumpobject(value?: any): any | undefined;
declare function EjectPassengerFromSeat(virtualSeatIndex: number): void;
declare function EquipCursorItem(slot: number): void;
declare function EquipPendingItem(index: number): void;
declare function FlashClientIcon(briefly?: boolean): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function FocusUnit(name?: string): void;
declare function FollowUnit(name?: string, exactMatch?: boolean): void;
declare function ForceLogout(): void;
declare function ForceQuit(): void;
declare function GetAccountExpansionLevel(): number;
declare function GetAddOnCPUUsage(name: number | string): number;
declare function GetAddOnMemoryUsage(name: number | string): number;
declare function GetAllowLowLevelRaid(): boolean;
declare function GetAllowRecentAlliesSeeLocation(): boolean;
declare function GetAreaSpiritHealerTime(): number;
declare function GetAreaText(): string;
declare function GetArmorPenetration(): number;
declare function GetAttackPowerForStat(stat: number, value: number): number;
declare function GetAutoDeclineGuildInvites(): boolean;
declare function GetAutoDeclineNeighborhoodInvites(): boolean;
declare function GetAvailableBandwidth(): number;
declare function GetAvailableLocaleInfo(ignoreLocaleRestrictions?: boolean): LocaleInfo[];
declare function GetAvailableLocales(ignoreLocaleRestrictions?: boolean): LuaMultiReturn<[...localeName: (string)[]]>;
declare function GetAvoidance(): number;
declare function GetBackgroundLoadingStatus(): number;
declare function GetBaseDifficultyID(difficultyID: number): number;
declare function GetBillingTimeRested(): number;
declare function GetBindLocation(): string;
declare function GetBlockChance(): number;
declare function GetBuildInfo(): LuaMultiReturn<[buildVersion: string, buildNumber: string, buildDate: string, interfaceVersion: number, localizedVersion: string, buildInfo: string]>;
declare function GetBuildOption(name: string): boolean | undefined;
declare function GetCallstackHeight(): number;
declare function GetCameraFOVDefaults(): LuaMultiReturn<[fieldOfViewDegreesDefault: number, fieldOfViewDegreesPlayerMin: number, fieldOfViewDegreesPlayerMax: number]>;
declare function GetCemeteryPreference(): number;
declare function GetClassicExpansionLevel(): number;
declare function GetClientDisplayExpansionLevel(): number;
declare function GetCollapsingStarCost(): number;
declare function GetCombatRating(ratingIndex: number): number | undefined;
declare function GetCombatRatingBonus(ratingIndex: number): number | undefined;
declare function GetCombatRatingBonusForCombatRatingValue(ratingIndex: number, value: number): number | undefined;
declare function GetComboPoints(unit: UnitToken, target: UnitToken): number;
declare function GetCorpseRecoveryDelay(): number;
declare function GetCorruption(): number;
declare function GetCorruptionResistance(): number;
declare function GetCreditsDisplayInfo(): CreditsDisplayInfo[];
declare function GetCritChance(): number;
declare function GetCritChanceFromStat(stat: number, value: number): number;
declare function GetCritChanceProvidesParryEffect(): boolean;
declare function GetCurrentCinematicSummary(): string;
declare function GetCurrentEventID(): number | undefined;
declare function GetCurrentRegion(): number;
declare function GetCurrentRegionName(): string;
declare function GetCurrentTitle(): number;
declare function GetCursorCenterPosition(): LuaMultiReturn<[posX: number, posY: number]>;
declare function GetCursorDelta(): LuaMultiReturn<[deltaX: number, deltaY: number]>;
declare function GetCursorInfo(): void;
declare function GetCursorMoney(): number;
declare function GetCursorPosition(): LuaMultiReturn<[posX: number, posY: number]>;
declare function GetDefaultAbbreviationBreakpoints(locale?: WowLocale): NumberAbbreviationBreakpoint[];
declare function GetDefaultScale(): number;
declare function GetDifficultyInfo(difficultyID: number): LuaMultiReturn<[name: string, instanceType: string, isHeroic: boolean, isChallengeMode: boolean, displayHeroic: boolean, displayMythic: boolean, toggleDifficultyID: number | undefined, isLFR: boolean, minPlayers: number | undefined, maxPlayers: number | undefined, isUserSelectable: boolean]>;
declare function GetDodgeChance(): number;
declare function GetDodgeChanceFromAttribute(): number;
declare function GetDownloadedPercentage(): number;
declare function GetDungeonDifficultyID(): number;
declare function GetErrorCallstackHeight(): number | undefined;
declare function GetEventCPUUsage(): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetEventTime(eventProfileIndex: number): LuaMultiReturn<[totalElapsedTime: number | undefined, numExecutedHandlers: number | undefined, slowestHandlerName: string | undefined, slowestHandlerTime: number | undefined]>;
declare function GetEvictionTimeRemaining(): number;
declare function GetExpansionDisplayInfo(expansionLevel: number, desiredReleaseType?: Enum.ReleaseType): ExpansionDisplayInfo | undefined;
declare function GetExpansionForLevel(playerLevel: number): number | undefined;
declare function GetExpansionLevel(): number;
declare function GetExpansionTrialInfo(): LuaMultiReturn<[isExpansionTrialAccount: boolean, expansionTrialRemainingSeconds: number | undefined]>;
declare function GetExpertise(): LuaMultiReturn<[mainhandExpertise: number, offhandExpertise: number, rangedExpertise: number]>;
declare function GetExpertisePercent(): LuaMultiReturn<[mainhandExpertisePercent: number, offhandExpertisePercent: number, rangedExpertisePercent: number]>;
declare function GetFileIDFromPath(filePath: string): number;
declare function GetFileStreamingStatus(): number;
declare function GetFontInfo(fontObject: Font): FontScriptInfo | undefined;
declare function GetFonts(): string[];
declare function GetForbiddenObjectTable(object: FrameScriptObject): FrameScriptObject;
declare function GetFrameCPUUsage(frame: Frame, includeChildren?: boolean): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetFramerate(): number;
declare function GetFunctionCPUUsage(): LuaMultiReturn<[call_time: number, call_count: number]>;
declare function GetGameMessageInfo(gameErrorIndex: number): LuaMultiReturn<[errorName: string | undefined, soundKitID: number | undefined, voiceID: number | undefined]>;
declare function GetGameTime(): LuaMultiReturn<[hour: number, minute: number]>;
/** If no playerWeaponSkill value is provided, uses the skill value for the player's main hand weapon/shapeshift form. */
declare function GetGlancingBlowChance(playerWeaponSkill: number | undefined, targetDefenseSkill: number): number;
/** If no playerWeaponSkill value is provided, uses the skill value for the player's main hand weapon/shapeshift form. */
declare function GetGlancingBlowPenalty(playerWeaponSkill: number | undefined, targetDefenseSkill: number): number;
declare function GetHaste(): number;
declare function GetHealthRegen(): LuaMultiReturn<[healthRegen: number, combatHealthRegen: number]>;
declare function GetHealthRegenFromSpirit(): LuaMultiReturn<[healthRegen: number, combatHealthRegen: number]>;
declare function GetHitModifier(): number;
declare function GetInstanceBootTimeRemaining(): number;
declare function GetInstanceInfo(): LuaMultiReturn<[name: string, instanceType: string, difficultyID: number, difficultyName: string, maxPlayers: number, dynamicDifficulty: number, isDynamic: boolean | undefined, instanceID: number, instanceGroupSize: number, lfgDungeonID: number | undefined, hasWorldTier: boolean]>;
declare function GetInstanceLockTimeRemaining(): LuaMultiReturn<[timeLeft: number, extending: boolean, encountersTotal: number, encountersCompleted: number]>;
declare function GetInstanceLockTimeRemainingEncounter(encounterIndex: number): LuaMultiReturn<[encounterName: string, texture: string, isKilled: boolean, ineligible: boolean]>;
declare function GetJailersTowerLevel(): number;
declare function GetLegacyRaidDifficultyID(): number | undefined;
declare function GetLifesteal(): number;
declare function GetLocale(): string;
declare function GetLocalGameTime(): LuaMultiReturn<[hour: number, minute: number]>;
declare function GetLootSpecialization(): number;
declare function GetManaRegen(): LuaMultiReturn<[baseManaRegen: number, castingManaRegen: number]>;
declare function GetManaRegenFromSpirit(): LuaMultiReturn<[powerRegen: number, combatPowerRegen: number]>;
declare function GetMastery(): number;
declare function GetMasteryEffect(): LuaMultiReturn<[masteryEffect: number, bonusCoefficient: number]>;
declare function GetMaximumExpansionLevel(): number;
/** Maps an expansion level to a maximum character level for that expansion. */
declare function GetMaxLevelForExpansionLevel(expansionLevel: number): number;
declare function GetMaxLevelForLatestExpansion(): number;
declare function GetMaxLevelForPlayerExpansion(): number;
declare function GetMaxPlayerLevel(): number;
declare function GetMeleeHaste(): number;
declare function GetMinimapZoneText(): string;
declare function GetMinimumExpansionLevel(): number;
declare function GetMirrorTimerInfo(timerIndex: number): LuaMultiReturn<[name: string | undefined, startValue: number | undefined, maxValue: number | undefined, scale: number | undefined, paused: number | undefined, label: string | undefined, spellID: number | undefined]>;
declare function GetMirrorTimerProgress(timerName: string): number | undefined;
declare function GetModResilienceDamageReduction(): number;
declare function GetMoney(): number;
declare function GetMouseButtonClicked(): string;
declare function GetMouseButtonName(button: MouseButton): string;
declare function GetMouseFoci(): ScriptRegion[];
declare function GetMovieDownloadProgress(movieId: number): LuaMultiReturn<[inProgress: boolean, downloaded: number, total: number]>;
declare function GetNativeRealmID(): number;
declare function GetNegativeCorruptionEffectInfo(): CorruptionEffectInfo[];
declare function GetNetIpTypes(): LuaMultiReturn<[...ipTypes: (ConnectionIptype)[]]>;
declare function GetNetStats(): LuaMultiReturn<[in_: number, out: number, ...latencyList: (number)[]]>;
declare function GetNextAvailableRaidTargetMarkerIndex(startIndex: number, reverseSearch?: boolean, wrapSearch?: boolean, treatDeadNonFriendlyAsAvailable?: boolean): number;
declare function GetNormalizedRealmName(): string;
declare function GetNumDeclensionSets(name: string, gender?: Enum.UnitSex, namePartType?: Enum.NamePartType): number;
declare function GetNumExpansions(): number;
declare function GetNumTitles(): number;
declare function GetNumTotemSlots(): number;
declare function GetOffhandHitModifier(): number;
declare function GetOSLocale(): string;
declare function GetOverrideAPBySpellPower(): number;
declare function GetOverrideSpellPowerByAP(): number;
declare function GetParryChance(): number;
declare function GetParryChanceFromAttribute(): number;
declare function GetPetCritChance(): LuaMultiReturn<[meleeCrit: number, spellCrit: number]>;
declare function GetPetDodgeChance(): number;
declare function GetPetHitChanceModifier(): number;
declare function GetPetMeleeHaste(): number;
declare function GetPetSpellBonusDamage(): number;
declare function GetPetSpellHitChanceModifier(): number;
declare function GetPhysicalScreenSize(): LuaMultiReturn<[sizeX: number, sizeY: number]>;
declare function GetPlayerFacing(): number | undefined;
declare function GetPlayerInfoByGUID(guid: string): LuaMultiReturn<[localizedClass: string | undefined, englishClass: string | undefined, localizedRace: string | undefined, englishRace: string | undefined, sex: number | undefined, name: string | undefined, realmName: string | undefined, level: number | undefined]>;
declare function GetPowerRegen(): LuaMultiReturn<[basePowerRegen: number, castingPowerRegen: number]>;
declare function GetPowerRegenForPowerType(powerType: number): LuaMultiReturn<[basePowerRegen: number, castingPowerRegen: number]>;
declare function GetProtocolTypes(): LuaMultiReturn<[...protocolTypes: (ConnectionProtocol)[]]>;
declare function GetPVPDesired(): boolean;
declare function GetPVPGearStatRules(): boolean;
declare function GetPVPLifetimeStats(): LuaMultiReturn<[lifetimeHonorableKills: number, lifetimeMaxPVPRank: Enum.PvPRanks]>;
declare function GetPvpPowerDamage(): number;
declare function GetPvpPowerHealing(): number;
declare function GetPVPSessionStats(): LuaMultiReturn<[honorableKills: number, dishonorableKills: number]>;
declare function GetPVPTimer(): number;
declare function GetPVPYesterdayStats(): LuaMultiReturn<[honorableKills: number, dishonorableKills: number]>;
declare function GetRaidDifficultyID(): number | undefined;
declare function GetRaidTargetIndex(target: UnitToken): number | undefined;
declare function GetRangedAttackPowerForStat(stat: number, value: number): number;
declare function GetRangedCritChance(): number;
declare function GetRangedHaste(): LuaMultiReturn<[result: number, quiverHaste: number]>;
declare function GetRangedHitModifier(): number;
declare function GetRealmID(): number;
declare function GetRealmName(): string;
declare function GetRealZoneText(mapID?: number): string;
declare function GetReleaseTimeRemaining(): number;
declare function GetResSicknessDuration(): string | undefined;
declare function GetRestrictedAccountData(): LuaMultiReturn<[maxLevel: number, maxMoney: number, professionCap: number]>;
declare function GetRestState(): LuaMultiReturn<[exhaustionID: number | undefined, name: string | undefined, factor: number | undefined]>;
declare function GetRuneCooldown(runeIndex: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, isRuneReady: boolean | undefined]>;
declare function GetRuneCount(runeIndex: number): number | undefined;
declare function GetScreenDPIScale(): number;
declare function GetScreenHeight(): number;
declare function GetScreenWidth(): number;
declare function GetScriptBucketThrottleLimits(): ScriptBucketThrottleLimits;
declare function GetScriptCPUUsage(): number;
declare function GetSecondsUntilParentalControlsKick(): number | undefined;
declare function GetServerExpansionLevel(): number;
declare function GetServerTime(): number;
declare function GetSessionTime(): number;
declare function GetSheathState(): number | undefined;
declare function GetShieldBlock(): number;
declare function GetSourceLocation(): string | undefined;
declare function GetSpecializationInfoForClassID(classID: number, index: number, gender?: Enum.UnitSex): LuaMultiReturn<[id: number, name: string, description: string, icon: number, role: string, recommended: boolean, allowedForBoost: boolean, masterySpell1: number | undefined, masterySpell2: number | undefined]>;
declare function GetSpecializationInfoForSpecID(specID: number, gender?: Enum.UnitSex): LuaMultiReturn<[id: number, name: string, description: string, icon: number, role: string, recommended: boolean, allowedForBoost: boolean, masterySpell1: number | undefined, masterySpell2: number | undefined]>;
declare function GetSpecializationNameForSpecID(specID: number, gender?: Enum.UnitSex): string | undefined;
declare function GetSpecializationSystem(): Enum.SpecializationSystem;
declare function GetSpeed(): number;
declare function GetSpellBonusDamage(school: number): number | undefined;
declare function GetSpellBonusHealing(): number;
declare function GetSpellCritChance(): number;
declare function GetSpellCritChanceFromStat(stat: number, value: number): number;
declare function GetSpellHitModifier(): number;
declare function GetSpellPenetration(): number;
declare function GetStringFromModifiers(modifiers: number): string;
declare function GetSturdiness(): number;
declare function GetSubZoneText(): string;
declare function GetTaxiBenchmarkMode(): boolean;
declare function GetThreatStatusColor(gameErrorIndex: number): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
declare function GetTickTime(): number;
declare function GetTime(): number;
declare function GetTimePreciseSec(): number;
declare function GetTitleName(titleMaskID: number): LuaMultiReturn<[titleString: string, playerTitle: boolean]>;
declare function GetTotemCannotDismiss(slot: number): boolean | undefined;
declare function GetTotemDuration(slot: number): LuaDurationObject;
declare function GetTotemInfo(slot: number): LuaMultiReturn<[haveTotem: boolean | undefined, totemName: string | undefined, startTime: number | undefined, duration: number | undefined, icon: number | undefined, modRate: number | undefined, spellID: number | undefined]>;
declare function GetTotemTimeLeft(slot: number): number | undefined;
declare function GetUICameraInfo(uiCameraID: number): LuaMultiReturn<[posX: number, posY: number, posZ: number, lookAtX: number, lookAtY: number, lookAtZ: number, animID: number, animVariation: number, animFrame: number, useModelCenter: boolean]>;
declare function GetUnitChargedPowerPoints(unit: UnitToken): number[] | undefined;
declare function GetUnitEmpowerHoldAtMaxTime(unit: UnitToken): number;
declare function GetUnitEmpowerMinHoldTime(unit: UnitToken): number;
declare function GetUnitEmpowerStageDuration(unit: UnitToken, index: number): number;
declare function GetUnitHealthModifier(unit: UnitToken): number;
declare function GetUnitMaxHealthModifier(unit: UnitToken): number;
declare function GetUnitPowerBarInfo(unitToken: UnitToken): UnitPowerBarInfo | undefined;
declare function GetUnitPowerBarInfoByID(barID: number): UnitPowerBarInfo | undefined;
declare function GetUnitPowerBarStrings(unitToken: UnitToken): LuaMultiReturn<[name: string | undefined, tooltip: string | undefined, cost: string | undefined]>;
declare function GetUnitPowerBarStringsByID(barID: number): LuaMultiReturn<[name: string | undefined, tooltip: string | undefined, cost: string | undefined]>;
declare function GetUnitPowerBarTextureInfo(unitToken: UnitToken, textureIndex: number, timerIndex?: number): LuaMultiReturn<[texture: number, colorR: number, colorG: number, colorB: number, colorA: number]>;
declare function GetUnitPowerBarTextureInfoByID(barID: number, textureIndex: number): LuaMultiReturn<[texture: number, colorR: number, colorG: number, colorB: number, colorA: number]>;
declare function GetUnitPowerModifier(unit: UnitToken): number;
declare function GetUnitSpeed(unit: UnitToken): LuaMultiReturn<[currentSpeed: number, runSpeed: number, flightSpeed: number, swimSpeed: number]>;
declare function GetUnitTotalModifiedMaxHealthPercent(unit: UnitToken): number;
declare function GetUpgradeExpansionLevel(): number;
declare function GetVehicleUIIndicator(vehicleIndicatorID: number): LuaMultiReturn<[backgroundTextureID: number | undefined, numSeatIndicators: number | undefined]>;
declare function GetVehicleUIIndicatorSeat(vehicleIndicatorID: number, indicatorSeatIndex: number): LuaMultiReturn<[virtualSeatIndex: number | undefined, xPos: number | undefined, yPos: number | undefined]>;
declare function GetVersatilityBonus(combatRating: number): number;
declare function GetXPExhaustion(): number | undefined;
declare function GetZoneText(): string;
/** Returns true if a supplied value is a secret value. */
declare function hasanysecretvalues(...values: (any)[]): boolean;
declare function HasAPEffectsSpellPower(): boolean;
declare function HasDualWieldPenalty(): boolean;
declare function HasFullControl(): boolean;
declare function HasIgnoreDualWieldWeapon(): boolean;
declare function HasKey(): boolean;
declare function HasLootSpecializations(): boolean;
declare function HasNoReleaseAura(): LuaMultiReturn<[hasCannotReleaseEffect: boolean, longestDuration: number, hasUntilCancelledDuration: boolean]>;
declare function HasSPEffectsAttackPower(): boolean;
declare function InCinematic(): boolean;
declare function InitiateRolePoll(): boolean;
declare function InitiateTrade(guid: UnitToken): void;
declare function Is64BitClient(): boolean;
declare function IsAccountSecured(): boolean;
declare function IsAdvancedFlyableArea(): boolean;
declare function IsAltKeyDown(): boolean;
declare function IsBetaBuild(): boolean;
declare function IsCemeterySelectionAvailable(): boolean;
declare function IsCharacterNewlyBoosted(): boolean;
declare function IsCollisionEnabled(): boolean;
declare function IsControlKeyDown(): boolean;
declare function IsCpuBound(): boolean | undefined;
declare function IsCursorVisible(): boolean;
declare function IsDebugBuild(): boolean;
declare function IsDemonHunterAvailable(): boolean;
declare function IsDrivableArea(): boolean;
declare function IsDualWielding(): boolean;
declare function IsEuropeanNumbers(): boolean;
declare function IsExpansionTrial(): boolean;
declare function IsFalling(unit?: UnitToken): boolean;
declare function IsFlyableArea(): boolean;
declare function IsFlying(unit?: UnitToken): boolean;
declare function IsGuildLeader(): boolean;
declare function IsIndoors(): boolean;
declare function IsInGuild(): boolean;
declare function IsInInstance(): LuaMultiReturn<[isInInstance: boolean, instanceType: string]>;
declare function IsInJailersTower(): boolean;
declare function IsInsane(): boolean;
declare function IsItemPreferredArmorType(itemLocation: ItemLocationMixin): boolean;
declare function IsJailersTowerLayerTimeLocked(layerLevel: number): string;
declare function IsKeyDown(keyOrMouseName: string, excludeBindingState?: boolean): boolean | undefined;
declare function IsLeftAltKeyDown(): boolean;
declare function IsLeftControlKeyDown(): boolean;
declare function IsLeftMetaKeyDown(): boolean;
declare function IsLeftShiftKeyDown(): boolean;
declare function IsLegacyDifficulty(difficultyID: number): boolean | undefined;
declare function IsLinuxClient(): boolean;
declare function IsLoggedIn(): boolean;
declare function IsMacClient(): boolean;
declare function IsMetaKeyDown(): boolean;
declare function IsModifierKeyDown(): boolean;
declare function IsMounted(): boolean;
declare function IsMouseButtonDown(button?: MouseButton): boolean;
declare function IsMovieLocal(movieId: number): boolean;
declare function IsMoviePlayable(movieId: number): boolean;
declare function IsMovieReadable(movieId: number): boolean;
declare function IsOnGroundFloorInJailersTower(): boolean;
declare function IsOnTournamentRealm(): boolean;
declare function IsOutdoors(): boolean;
declare function IsOutOfBounds(): boolean;
declare function IsPlayerInGuildFromGUID(playerGUID: string): boolean;
declare function IsPlayerInWorld(): boolean;
declare function IsPlayerMoving(): boolean;
declare function IsPublicBuild(): boolean;
/** Reflects the state of the OnlyBetaAndPTR TOC directive */
declare function IsPublicTestClient(): boolean;
declare function IsPVPTimerRunning(): boolean;
declare function IsRaidMarkerActive(index: number): boolean;
declare function IsRaidMarkerSystemEnabled(): boolean;
declare function IsRangedWeapon(): boolean;
declare function IsResting(): boolean;
declare function IsRestrictedAccount(): boolean;
declare function IsRightAltKeyDown(): boolean;
declare function IsRightControlKeyDown(): boolean;
declare function IsRightMetaKeyDown(): boolean;
declare function IsRightShiftKeyDown(): boolean;
/** Returns true if a supplied value is a secret table. This function will return true if the table value itself is secret, or if flags on the table are set such that accesses of the table would produce secrets. */
declare function issecrettable(table: any): boolean;
/** Returns true if a supplied value is a secret value. */
declare function issecretvalue(value: any): boolean;
declare function IsShiftKeyDown(): boolean;
declare function IsStealthed(): boolean;
declare function IsSubmerged(unit?: UnitToken): boolean;
declare function IsSwimming(unit?: UnitToken): boolean;
declare function IsTargetLoose(): boolean;
declare function IsTestBuild(): boolean;
declare function IsThreatWarningEnabled(): boolean;
declare function IsTitleKnown(titleMaskID: number): boolean;
declare function IsTrialAccount(): boolean;
declare function IsUnitModelReadyForUI(unitToken: UnitToken): boolean;
declare function IsUsingFixedTimeStep(): boolean;
declare function IsUsingGamepad(): boolean;
declare function IsUsingMouse(): boolean;
declare function IsVeteranTrialAccount(): boolean;
declare function IsWindowsClient(): boolean;
declare function IsXPUserDisabled(): boolean;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function LaunchURL(url: string): void;
declare function LoadURLIndex(index: number, param?: number): void;
declare function LocalizedClassList(isFemale?: boolean): any;
declare function Logout(): void;
declare function MakeModifiers(): number;
/** Applies a given function over all supplied values individually, replacing the value with the result of the call. */
declare function mapvalues(func: any, ...values: (any)[]): LuaMultiReturn<[...mapped: (any)[]]>;
declare function Mixin(object: any, ...mixins: (any)[]): any;
declare function MouseOverrideCinematicDisable(doOverride?: boolean): void;
declare function NoPlayTime(): boolean | undefined;
declare function NotifyInspect(targetGUID: UnitToken): void;
declare function NotWhileDeadError(): void;
declare function OpeningCinematic(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function OutageDetected(): void;
declare function PartialPlayTime(): boolean | undefined;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function PickupPlayerMoney(amount: number): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function PlaceRaidMarker(index: number, token?: string): void;
declare function PlatformIsHandheld(): boolean;
declare function PlayerCanTeleport(): boolean;
declare function PlayerEffectiveAttackPower(): LuaMultiReturn<[mainHandAttackPower: number | undefined, offHandAttackPower: number | undefined, rangedAttackPower: number | undefined, baseAttackPower: number | undefined, baseRangedAttackPower: number | undefined]>;
declare function PlayerGetTimerunningSeasonID(): number | undefined;
declare function PlayerIsInCombat(): boolean;
declare function PlayerIsPVPInactive(unit: UnitToken): boolean;
/** If the unit is currently casting a spell, returns whether spell's target unit is the player. Returns false if the unit is not casting a spell or the spell has no target. */
declare function PlayerIsSpellTarget(unit: UnitToken): boolean;
declare function PlayerIsTimerunning(): boolean;
declare function PlayerVehicleHasComboPoints(): boolean;
declare function PortGraveyard(): void;
declare function PreloadMovie(movieId: number): void;
declare function Quit(): void;
declare function RandomRoll(min: number, max: number): void;
declare function ReagentsFromBankAllowed(): boolean;
declare function RegionalUniqueNamesEnabled(): boolean;
declare function RegisterEventCallback(eventName: string, callback: EventCallbackType): void;
declare function RegisterUnitEventCallback(eventName: string, callback: EventCallbackType, unit: UnitToken): void;
/**
 * Removes all assigned raid target markers.
 * @remarks Has restrictions: may fail or be blocked depending on game state.
 */
declare function RemoveRaidTargets(): void;
declare function RepopMe(): void;
declare function ReportBug(description: string): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function ReportPlayerIsPVPAFK(unit: UnitToken): void;
declare function ReportSuggestion(description: string): void;
declare function RequestTimePlayed(): void;
declare function ResetCPUUsage(): void;
declare function ResetCursor(): void;
declare function ResetInstances(): void;
declare function ResistancePercent(resistance: number, casterLevel: number): number;
declare function RespondInstanceLock(acceptLock: boolean): void;
declare function RestartGx(): void;
declare function ResurrectGetOfferer(): string;
declare function ResurrectHasSickness(): boolean;
declare function ResurrectHasTimer(): boolean;
declare function RetrieveCorpse(): void;
declare function RunScript(text: string): void;
declare function Screenshot(): void;
/** Returns a transformed list of values with inputs that are either secret or are not string, number, or boolean type replaced by nil values. */
declare function scrub(...values: (any)[]): LuaMultiReturn<[...scrubbed: (any)[]]>;
/** Returns a transformed list of values with inputs that are secret values replaced by nil values. */
declare function scrubsecretvalues(...values: (any)[]): LuaMultiReturn<[...scrubbed: (any)[]]>;
/**
 * Unwraps all supplied secrets, converting them back to regular values.
 * @remarks Has restrictions: may fail or be blocked depending on game state.
 */
declare function secretunwrap(...values: (any)[]): LuaMultiReturn<[...unwrapped: (any)[]]>;
/** Converts all supplied values to secret values, preventing most operations on them from occurring on tainted code paths. */
declare function secretwrap(...values: (any)[]): LuaMultiReturn<[...wrapped: (any)[]]>;
/** Invokes a named method on an object with a secure call barrier that prevents errors or taint from function lookup and execution from propagating to the caller. */
declare function securecallmethod(object: any, method: string, ...arguments_: (any)[]): LuaMultiReturn<[...results: (any)[]]>;
/** Securely copies a Lua value. Tables are deep-copied with recursive and shared references preserved. Copied values receive the current execution taint. */
declare function securecopy(value?: any, options?: SecureCopyOptions): any;
declare function SelectedRealmName(): string;
declare function SellCursorItem(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function SendSubscriptionInterstitialResponse(response: Enum.SubscriptionInterstitialResponseType): void;
declare function SetAllowDangerousScripts(allowed?: boolean): void;
declare function SetAllowLowLevelRaid(allow?: boolean): void;
declare function SetAllowRecentAlliesSeeLocation(allowRecentAlliesSeeLocation: boolean): void;
declare function SetAutoDeclineGuildInvites(allow?: boolean): void;
declare function SetAutoDeclineNeighborhoodInvites(allow?: boolean): void;
declare function SetCemeteryPreference(cemetaryID: number): void;
declare function SetConsoleKey(keystring: string): void;
declare function SetCurrentTitle(titleMaskID: number): void;
declare function SetCursor(name?: string): boolean;
declare function SetCursorByMode(mode: Enum.Cursormode): boolean;
declare function SetCursorHoveredItem(item: ItemLocationMixin): void;
declare function SetCursorHoveredItemTradeItem(enabled: boolean): void;
/** Insecure code can only call this once in response to gamepad input hardware events. */
declare function SetCursorPosition(xPosition: number, yPosition: number): void;
declare function SetCursorVirtualItem(itemInfo: ItemInfo, cursorType: Enum.UICursorType): void;
declare function SetDungeonDifficultyID(difficultyID: number): void;
declare function SetErrorCallstackHeight(height?: number): void;
declare function SetEuropeanNumbers(enabled: boolean): void;
declare function SetInWorldUIVisibility(visible: boolean): void;
declare function SetLegacyRaidDifficultyID(difficultyID: number, force?: boolean): void;
declare function SetLootSpecialization(specializationID: number): void;
declare function SetPortraitTexture(textureObject: Texture, unitToken: UnitToken, disableMasking?: boolean): void;
declare function SetPortraitTextureFromCreatureDisplayID(textureObject: Texture, creatureDisplayID: number): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function SetPreferredGamepadInteractTarget(unit?: UnitToken): void;
declare function SetRaidDifficultyID(difficultyID: number, force?: boolean): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function SetRaidTarget(target: UnitToken, userIndex: number): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function settablesecurity(table: any, option: Enum.TableSecurityOption): void;
declare function SetTaxiBenchmarkMode(enable?: boolean): void;
declare function SetUIVisibility(visible: boolean): void;
declare function SetUnitCursorTexture(textureObject: Texture, unit: UnitToken, style?: Enum.CursorStyle, includeLowPriority?: boolean, preferGamepadIcon?: boolean): boolean;
declare function ShouldDisplayRaidRolesInSocialFrame(): boolean;
declare function ShouldDisplayStoryModeTooltipInSocialFrame(): boolean;
declare function ShouldShowExpansionUpgradeBanner(): boolean;
declare function ShouldShowIslandsWeeklyPOI(): boolean;
declare function ShouldShowSpecialSplashScreen(): boolean;
declare function ShowCloak(show: boolean): void;
declare function ShowHelm(show: boolean): void;
declare function ShowingCloak(): boolean;
declare function ShowingHelm(): boolean;
/** Effectively the same as SimulateMouseDown plus SimulateMouseUp and consumes limited input for both. */
declare function SimulateMouseClick(button: MouseButton): void;
/** Insecure code can only call this once in response to gamepad input hardware events. */
declare function SimulateMouseDown(button: MouseButton): void;
/** Insecure code can only call this once in response to gamepad input hardware events. */
declare function SimulateMouseUp(button: MouseButton): void;
/** Insecure code can only call this once in response to gamepad input hardware events. */
declare function SimulateMouseWheel(delta: number): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function SitStandOrDescendStart(): void;
declare function SplashFrameCanBeShown(): boolean;
declare function StartAttack(name?: string, exactMatch?: boolean): void;
declare function StopAttack(): void;
declare function StopCinematic(): void;
declare function Stuck(): void;
declare function SupportsClipCursor(): boolean;
declare function TargetDirectionEnemy(facing: number, coneAngle?: number): void;
declare function TargetDirectionFinished(): void;
declare function TargetDirectionFriend(facing: number, coneAngle?: number): void;
declare function TargetLastEnemy(): void;
declare function TargetLastFriend(): void;
declare function TargetLastTarget(): void;
declare function TargetNearest(reverse?: boolean): void;
declare function TargetNearestEnemy(reverse?: boolean): void;
declare function TargetNearestEnemyPlayer(reverse?: boolean): void;
declare function TargetNearestFriend(reverse?: boolean): void;
declare function TargetNearestFriendPlayer(reverse?: boolean): void;
declare function TargetNearestPartyMember(reverse?: boolean): void;
declare function TargetNearestRaidMember(reverse?: boolean): void;
declare function TargetPriorityHighlightEnd(): void;
declare function TargetPriorityHighlightStart(useStartDelay?: boolean): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function TargetToggle(): void;
declare function TargetTotem(slot: number): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function TargetUnit(name?: string, exactMatch?: boolean): void;
declare function TimeoutResurrect(): void;
declare function ToggleAnimKitDisplay(): void;
declare function ToggleCollision(): void;
declare function ToggleCollisionDisplay(): void;
declare function ToggleDebugAIDisplay(): void;
declare function ToggleGravity(): void;
declare function TogglePlayerBounds(): void;
declare function TogglePortals(): void;
declare function ToggleSelfHighlight(): boolean;
declare function ToggleSheath(): void;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function ToggleSit(): void;
declare function ToggleTris(): void;
declare function UIReload(): void;
declare function UnitAffectingCombat(unit: UnitToken): boolean;
declare function UnitAlliedRaceInfo(unit: UnitToken): LuaMultiReturn<[isAlliedRace: boolean, hasHeritageArmorUnlocked: boolean]>;
declare function UnitArmor(unit: UnitToken): LuaMultiReturn<[base: number, effective: number, real: number, bonus: number]>;
declare function UnitAttackPower(unit: UnitToken): LuaMultiReturn<[attackPower: number, posBuff: number, negBuff: number]>;
declare function UnitAttackSpeed(unit: UnitToken): LuaMultiReturn<[attackSpeed: number, offhandAttackSpeed: number | undefined, rangedAttackSpeed: number | undefined]>;
declare function UnitBattlePetLevel(unit: UnitToken): number | undefined;
declare function UnitBattlePetSpeciesID(unit: UnitToken): number | undefined;
declare function UnitBattlePetType(unit: UnitToken): number | undefined;
declare function UnitCanAssist(unit: UnitToken, target: UnitToken, canAssistImmunePC?: boolean, canAssistUninteractable?: boolean): boolean;
declare function UnitCanAttack(unit: UnitToken, target: UnitToken): boolean;
declare function UnitCanCooperate(unit: UnitToken, target: UnitToken): boolean;
declare function UnitCanPetBattle(unit: UnitToken, target: UnitToken): boolean;
declare function UnitCastingDuration(unit: UnitToken): LuaDurationObject | undefined;
declare function UnitCastingInfo(unit: UnitToken): LuaMultiReturn<[name: string, displayName: string, textureID: number, startTimeMs: number, endTimeMs: number, isTradeskill: boolean, castID: string, notInterruptible: boolean | undefined, castingSpellID: number, castBarID: UnitCastBarID | undefined, delayTimeMs: number]>;
declare function UnitChannelDuration(unit: UnitToken): LuaDurationObject | undefined;
declare function UnitChannelInfo(unit: UnitToken): LuaMultiReturn<[name: string, displayName: string, textureID: number, startTimeMs: number, endTimeMs: number, isTradeskill: boolean, notInterruptible: boolean | undefined, spellID: number, isEmpowered: boolean, numEmpowerStages: number, castBarID: UnitCastBarID | undefined]>;
declare function UnitChromieTimeID(unit: UnitToken): number;
declare function UnitClass(unit: UnitToken): LuaMultiReturn<[className: string | undefined, classFilename: string | undefined, classID: number | undefined]>;
declare function UnitClassBase(unit: UnitToken): LuaMultiReturn<[classFilename: string | undefined, classID: number | undefined]>;
declare function UnitClassFromGUID(unitGUID: string): LuaMultiReturn<[className: string | undefined, classFilename: string | undefined, classID: number | undefined]>;
declare function UnitClassification(unit: UnitToken): string;
declare function UnitControllingVehicle(unit: UnitToken): boolean;
declare function UnitCreatureFamily(unit: UnitToken): LuaMultiReturn<[name: string, id: number]>;
declare function UnitCreatureID(unit: UnitToken): number | undefined;
declare function UnitCreatureType(unit: UnitToken): LuaMultiReturn<[name: string, id: number]>;
declare function UnitDamage(unit: UnitToken): LuaMultiReturn<[minDamage: number, maxDamage: number, offhandMinDamage: number, offhandMaxDamage: number, posBuff: number, negBuff: number, percent: number]>;
declare function UnitDefenseSkill(unit: UnitToken): LuaMultiReturn<[base: number, modifier: number]>;
declare function UnitDetailedThreatSituation(unit: UnitToken, mobGUID: UnitToken): LuaMultiReturn<[isTanking: boolean | undefined, status: number | undefined, scaledPercentage: number | undefined, rawPercentage: number | undefined, rawThreat: number | undefined]>;
declare function UnitDistanceSquared(unit: UnitToken): LuaMultiReturn<[distance: number, checkedDistance: boolean]>;
declare function UnitEffectiveLevel(name: string): number;
/** Returns a duration object that includes the duration of an empowered cast channel. */
declare function UnitEmpoweredChannelDuration(unit: UnitToken, includeHoldAtMaxTime?: boolean): LuaDurationObject | undefined;
/** Returns a vector of duration objects that measure the time spans for each individual stage in an empowered channel, with hold-at-max time included as the last element. */
declare function UnitEmpoweredStageDurations(unit: UnitToken): LuaDurationObject[] | undefined;
/** Returns a vector of percentages that describe how much of the total duration of an empowered channel is occupied by a stage. */
declare function UnitEmpoweredStagePercentages(unit: UnitToken, includeHoldAtMaxTime?: boolean): number[] | undefined;
declare function UnitExists(unit?: UnitToken): boolean;
declare function UnitFactionGroup(unitName: string, checkDisplayRace?: boolean): LuaMultiReturn<[factionGroupTag: string, localized: string]>;
declare function UnitFullName(unit: UnitToken): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitGetAvailableRoles(unit: UnitToken): LuaMultiReturn<[tank: boolean | undefined, healer: boolean | undefined, dps: boolean | undefined]>;
declare function UnitGetDetailedHealPrediction(unit: UnitToken, healerUnit: UnitToken | undefined, healPredictionCalculator: UnitHealPredictionCalculator): void;
declare function UnitGetIncomingHeals(unit: UnitToken, healerGUID?: UnitToken): number | undefined;
declare function UnitGetTotalAbsorbs(unit: UnitToken): number;
declare function UnitGetTotalHealAbsorbs(unit: UnitToken): number;
declare function UnitGroupRolesAssigned(unit?: UnitToken): string;
declare function UnitGroupRolesAssignedEnum(unit?: UnitToken): number;
declare function UnitGUID(unit: UnitToken): string | undefined;
declare function UnitHasEffectivelyTankAura(unit?: UnitToken): boolean;
declare function UnitHasLootInteraction(unit: UnitToken): boolean;
declare function UnitHasMouseoverHighlight(unit: UnitToken): boolean;
declare function UnitHasPowerType(unitToken: UnitToken, powerType: Enum.PowerType): boolean;
declare function UnitHasRelicSlot(unit: UnitToken): boolean;
declare function UnitHasVehiclePlayerFrameUI(unit?: UnitToken): boolean;
declare function UnitHasVehicleUI(unit?: UnitToken): boolean;
declare function UnitHealth(unit: UnitToken, usePredicted?: boolean): number;
declare function UnitHealthMax(unit: UnitToken): number;
/** Result of UnitHealthMax() - UnitHealth() */
declare function UnitHealthMissing(unit: UnitToken, usePredicted?: boolean): number;
/** Returns percent of health remaining - can be scaled via a curve for display purposes */
declare function UnitHealthPercent(unit: UnitToken, usePredicted?: boolean, curve?: LuaCurveObjectBase): LuaCurveEvaluatedResult;
declare function UnitHonor(unit: UnitToken): number;
declare function UnitHonorLevel(unit: UnitToken): number;
declare function UnitHonorMax(unit: UnitToken): number;
declare function UnitHPPerStamina(unit: UnitToken): number;
declare function UnitInAnyGroup(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitInBattleground(unit?: UnitToken, partyIndex?: number): number | undefined;
/** Checks whether this unit cannot see your party chat because it is in an instance group */
declare function UnitInOtherParty(unit: UnitToken): boolean;
declare function UnitInParty(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitInPartyIsAI(unit?: UnitToken): boolean;
declare function UnitInPartyShard(unit: UnitToken): boolean;
declare function UnitInRaid(unit?: UnitToken, partyIndex?: number): number | undefined;
declare function UnitInRange(unit: UnitToken): LuaMultiReturn<[inRange: boolean, checkedRange: boolean]>;
declare function UnitInSubgroup(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitInVehicle(unit: UnitToken): boolean;
declare function UnitInVehicleControlSeat(unit?: UnitToken): boolean;
declare function UnitInVehicleHidesPetFrame(unit?: UnitToken): boolean;
declare function UnitIsAFK(unit: UnitToken): boolean;
declare function UnitIsBattlePet(unit: UnitToken): boolean | undefined;
declare function UnitIsBattlePetCompanion(unit: UnitToken): boolean;
declare function UnitIsBossMob(unit: UnitToken): boolean;
declare function UnitIsCharmed(unit?: UnitToken): boolean;
declare function UnitIsConnected(unit: UnitToken): boolean;
declare function UnitIsControlling(unit: UnitToken): boolean;
declare function UnitIsCorpse(unit?: UnitToken): boolean;
declare function UnitIsDead(unit: UnitToken): boolean;
declare function UnitIsDeadOrGhost(unit: UnitToken): boolean;
declare function UnitIsDND(unit: UnitToken): boolean;
declare function UnitIsEnemy(unit: UnitToken, target: UnitToken): boolean;
declare function UnitIsFeignDeath(unit: UnitToken): boolean;
declare function UnitIsFriend(unit: UnitToken, target: UnitToken): boolean;
declare function UnitIsGameObject(unit?: UnitToken): boolean;
declare function UnitIsGhost(unit: UnitToken): boolean;
declare function UnitIsGroupAssistant(unit: UnitToken): boolean;
declare function UnitIsGroupLeader(unit: UnitToken, partyCategory?: number): boolean;
declare function UnitIsHumanPlayer(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitIsInInteractRange(unit: UnitToken): boolean;
declare function UnitIsInMyGuild(unit: string): boolean;
declare function UnitIsInteractable(unit?: UnitToken): boolean;
declare function UnitIsLieutenant(unit: UnitToken): boolean;
declare function UnitIsMercenary(name: string): boolean;
/** Returns whether the unit is considered a minion of a player, such as a pet, totem, or guardian. */
declare function UnitIsMinion(unit: UnitToken): boolean;
declare function UnitIsNPCAsPlayer(unit?: UnitToken): boolean;
declare function UnitIsOtherPlayersBattlePet(unit?: UnitToken): boolean;
declare function UnitIsOtherPlayersPet(unit?: UnitToken): boolean;
declare function UnitIsOwnerOrControllerOfUnit(controllingUnit: UnitToken, controlledUnit: UnitToken): boolean;
declare function UnitIsPlayer(unit?: UnitToken, partyIndex?: number): boolean;
/** Returns true for 'player', 'pet', 'vehicle', or any of 'partyn', 'partypetn', 'raidn', 'raidpetn' */
declare function UnitIsPlayerControlledOrGroupMember(unit: UnitToken): boolean;
declare function UnitIsPossessed(unit?: UnitToken): boolean;
declare function UnitIsPVP(unit: UnitToken): boolean;
declare function UnitIsPVPFreeForAll(unit: UnitToken): boolean;
declare function UnitIsPVPSanctuary(unit?: UnitToken): boolean;
declare function UnitIsQuestBoss(unit: UnitToken): boolean;
declare function UnitIsRaidOfficer(unit?: UnitToken): boolean;
declare function UnitIsSameServer(unitName: string): boolean;
declare function UnitIsTapDenied(unit: UnitToken): boolean;
declare function UnitIsTrivial(unit: UnitToken): boolean;
declare function UnitIsUnconscious(unit: UnitToken): boolean;
declare function UnitIsUnit(unit1: UnitToken, unit2: UnitToken): boolean;
declare function UnitIsVisible(unit?: UnitToken): boolean;
declare function UnitIsWildBattlePet(unit: UnitToken): boolean;
declare function UnitLeadsAnyGroup(unit: UnitToken): boolean;
declare function UnitLevel(name: string): number;
declare function UnitName(unit: UnitToken): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNameFromGUID(unitGUID: string): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNameplateShowsWidgetsOnly(unit: UnitToken): boolean;
declare function UnitNameUnmodified(unit: UnitToken): LuaMultiReturn<[unitName: string, unitServer: string]>;
declare function UnitNumPowerBarTimers(unit: UnitToken): number;
declare function UnitOnTaxi(unit: UnitToken): boolean;
declare function UnitOwnerGUID(unit: UnitToken): string;
declare function UnitPartialPower(unitToken: UnitToken, powerType?: Enum.PowerType, unmodified?: boolean): number;
declare function UnitPercentHealthFromGUID(unitGUID: string): number | undefined;
declare function UnitPhaseReason(unit: UnitToken): Enum.PhaseReason | undefined;
declare function UnitPlayerControlled(unit?: UnitToken): boolean;
declare function UnitPlayerOrPetInParty(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitPlayerOrPetInRaid(unit?: UnitToken, partyIndex?: number): boolean;
declare function UnitPosition(unit: UnitToken): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number, mapID: number]>;
declare function UnitPower(unitToken: UnitToken, powerType?: Enum.PowerType, unmodified?: boolean): number;
declare function UnitPowerBarID(unitToken: UnitToken): number;
declare function UnitPowerBarTimerInfo(unit: UnitToken, index?: number): LuaMultiReturn<[duration: number | undefined, expiration: number | undefined, barID: number | undefined, auraID: number | undefined]>;
declare function UnitPowerDisplayMod(powerType: Enum.PowerType): number;
declare function UnitPowerMax(unitToken: UnitToken, powerType?: Enum.PowerType, unmodified?: boolean): number;
/** Result of UnitPowerMax() - UnitPower() */
declare function UnitPowerMissing(unitToken: UnitToken, powerType?: Enum.PowerType, unmodified?: boolean): number;
/** Queries the percent of power remaining, optionally evaluating it against a supplied curve. */
declare function UnitPowerPercent(unitToken: UnitToken, powerType?: Enum.PowerType, unmodified?: boolean, curve?: LuaCurveObjectBase): LuaCurveEvaluatedResult;
declare function UnitPowerType(unit: UnitToken, index?: number): LuaMultiReturn<[powerType: Enum.PowerType | undefined, powerTypeToken: string | undefined, rgbX: number | undefined, rgbY: number | undefined, rgbZ: number | undefined]>;
declare function UnitPvpClassification(unit: UnitToken): Enum.PvPUnitClassification | undefined;
declare function UnitPVPName(unit: UnitToken): string;
declare function UnitQuestTrivialLevelRange(unit: UnitToken): number;
declare function UnitQuestTrivialLevelRangeScaling(unit: UnitToken): number;
declare function UnitRace(unit: UnitToken): LuaMultiReturn<[localizedRaceName: string | undefined, englishRaceName: string | undefined, raceID: number | undefined]>;
declare function UnitRangedAttackPower(unit: UnitToken): LuaMultiReturn<[attackPower: number, posBuff: number, negBuff: number]>;
declare function UnitRangedDamage(unit: UnitToken): LuaMultiReturn<[speed: number, minDamage: number, maxDamage: number, posBuff: number, negBuff: number, percent: number]>;
declare function UnitReaction(unit: UnitToken, target: UnitToken): number | undefined;
declare function UnitRealmRelationship(unit: UnitToken): number | undefined;
declare function UnitResistance(unit: UnitToken, damageClass: Enum.Damageclass): LuaMultiReturn<[baseResistance: number, realResistance: number, effectiveResistance: number, bonusResistance: number]>;
declare function UnitSelectionColor(unit: UnitToken, useExtendedColors?: boolean): LuaMultiReturn<[resultR: number, resultG: number, resultB: number, resultA: number]>;
declare function UnitSelectionType(unit: UnitToken, useExtendedColors?: boolean): number;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function UnitSetRole(unit: UnitToken, roleStr?: string): boolean;
/** @remarks Has restrictions: may fail or be blocked depending on game state. */
declare function UnitSetRoleEnum(unit: UnitToken, role?: Enum.LFGRole): boolean;
declare function UnitSex(unit: UnitToken): number | undefined;
declare function UnitSexBase(unit: UnitToken): Enum.UnitSex | undefined;
declare function UnitShouldDisplayName(unit: UnitToken): boolean;
/** If the unit is currently casting a spell, returns whether the target's name should be displayed. Returns false if the unit is not casting a spell or the spell has no target. */
declare function UnitShouldDisplaySpellTargetName(unit: UnitToken): boolean;
declare function UnitSpellHaste(unit: UnitToken): number;
/** If the unit is currently casting a spell, returns the class of the spell's target unit. Returns nil if the unit is not casting a spell or the spell has no target. */
declare function UnitSpellTargetClass(unit: UnitToken): string;
/** If the unit is currently casting a spell, returns the name of the spell's target unit. Returns nil if the unit is not casting a spell or the spell has no target. */
declare function UnitSpellTargetName(unit: UnitToken): string | undefined;
declare function UnitStagger(unit: UnitToken): number;
declare function UnitStat(unit: UnitToken, index: number): LuaMultiReturn<[currentStat: number, effectiveStat: number, statPositiveBuff: number, statNegativeBuff: number]>;
declare function UnitSwitchToVehicleSeat(unit: UnitToken, virtualSeatIndex: number): void;
declare function UnitTargetsVehicleInRaidUI(unit?: UnitToken): boolean;
/** Returns a threat state (0-3; representing none, yellow, orange, red) that indicates how far the provided unit is above the secondmost threat on the provided mob. If the unit is not first on threat, will always return red. Can return nil if the provided mob does not exist. */
declare function UnitThreatLeadSituation(unit: UnitToken, mobGUID: UnitToken): number | undefined;
declare function UnitThreatPercentageOfLead(unit: UnitToken, mobGUID: UnitToken): number | undefined;
declare function UnitThreatSituation(unit: UnitToken, mobGUID?: UnitToken): number | undefined;
declare function UnitTokenFromGUID(unitGUID: string): string | undefined;
declare function UnitTreatAsPlayerForDisplay(unit: UnitToken): boolean;
declare function UnitTrialBankedLevels(unit: UnitToken): LuaMultiReturn<[bankedLevels: number, xpIntoCurrentLevel: number, xpForNextLevel: number]>;
declare function UnitTrialXP(unit: UnitToken): number;
declare function UnitUsesAmmo(unit: UnitToken): boolean;
declare function UnitUsingVehicle(unit: UnitToken): boolean;
declare function UnitVehicleSeatCount(unit: UnitToken): number;
declare function UnitVehicleSeatInfo(unit: UnitToken, virtualSeatIndex: number): LuaMultiReturn<[controlType: string | undefined, occupantName: string | undefined, serverName: string | undefined, ejectable: boolean | undefined, canSwitchSeats: boolean | undefined]>;
declare function UnitVehicleSkin(unit?: UnitToken): number;
declare function UnitWeaponAttackPower(unit: UnitToken): LuaMultiReturn<[mainHandWeaponAttackPower: number, offHandWeaponAttackPower: number, rangedWeaponAttackPower: number]>;
declare function UnitWidgetSet(unit: UnitToken): number | undefined;
declare function UnitXP(unit: UnitToken): number;
declare function UnitXPMax(unit: UnitToken): number;
declare function UnregisterEventCallback(eventName: string, callback: EventCallbackType): void;
declare function UnregisterUnitEventCallback(eventName: string, callback: EventCallbackType, unit: UnitToken): void;
declare function UpdateAddOnCPUUsage(): void;
declare function UpdateAddOnMemoryUsage(): void;
declare function UpdateWindow(): void;
declare function WorldLootObjectExists(unit?: UnitToken): boolean;

declare namespace C_AccountInfo {
    function GetIDFromBattleNetAccountGUID(battleNetAccountGUID: string): number;
    function IsGUIDBattleNetAccountType(guid: string): boolean;
    function IsGUIDRelatedToLocalAccount(guid: string): boolean;
}

declare namespace C_AccountStore {
    function BeginPurchase(itemID: number): boolean;
    function GetCategories(storeFrontID: number): number[];
    function GetCategoryInfo(categoryID: number): AccountStoreCategoryInfo;
    function GetCategoryItems(categoryID: number): number[];
    function GetCurrencyAvailable(currencyID: number): number;
    function GetCurrencyIDForStore(storeFrontID: number): number | undefined;
    function GetCurrencyInfo(currencyID: number): AccountStoreCurrencyInfo;
    function GetItemInfo(itemID: number): AccountStoreItemInfo | undefined;
    function GetStoreFrontState(storeFrontID: number): AccountStoreState;
    function RefundItem(itemID: number): boolean;
    function RequestStoreFrontInfoUpdate(storeFrontID: number): void;
}

declare namespace C_AchievementInfo {
    function AreGuildAchievementsEnabled(): boolean;
    function GetRewardItemID(achievementID: number): number | undefined;
    function GetSupercedingAchievements(achievementID: number): number[];
    function IsGuildAchievement(achievementId: number): boolean;
    function IsValidAchievement(achievementId: number): boolean;
    function SetPortraitTexture(textureObject: Texture): void;
}

declare namespace C_AchievementTelemetry {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function LinkAchievementInClub(achievementID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function LinkAchievementInWhisper(achievementID: number): void;
    function ShowAchievements(): void;
}

declare namespace C_ActionBar {
    /** Used in conjunction with ActionRangeCheckUpdate to inform the UI when an action goes in or out of range with its current target. */
    function EnableActionRangeCheck(actionID: number, enable: boolean): void;
    /** Returns the list of action bar slots that contain the Assisted Combat action spell. */
    function FindAssistedCombatActionButtons(setToSearch?: Enum.ActionBarSet): number[] | undefined;
    function FindFlyoutActionButtons(flyoutID: number, setToSearch?: Enum.ActionBarSet): number[] | undefined;
    function FindPetActionButtons(petActionID: number, setToSearch?: Enum.ActionBarSet): number[] | undefined;
    /** Returns the list of action bar slots that contain a specified spell. */
    function FindSpellActionButtons(spellID: number | string, setToSearch?: Enum.ActionBarSet): number[] | undefined;
    /** Force updates some internals for an action button slot. */
    function ForceUpdateAction(slotID: number, suppressEvents?: boolean): void;
    function GetActionAutocast(actionID: number): LuaMultiReturn<[autocastAllowed: boolean, autocastEnabled: boolean]>;
    function GetActionBarPage(): number;
    /** Returns a duration object describing the active recharge time for an action. */
    function GetActionChargeDuration(actionID: number): LuaDurationObject;
    function GetActionCharges(actionID: number): SpellChargeInfo;
    function GetActionCooldown(actionID: number): SpellCooldownInfo;
    /** Returns a duration object describing the active cooldown duration for an action. */
    function GetActionCooldownDuration(actionID: number, ignoreGCD?: boolean): LuaDurationObject;
    /** Depending on the action type, return a string that is either the use count or number of charges. If value is beyond the display count parameter, returns the replacementString (defaults to '*'). */
    function GetActionDisplayCount(actionID: number, maxDisplayCount?: number, replacementString?: string): string;
    /** Returns a duration object describing the active loss of control cooldown duration for an action. */
    function GetActionLossOfControlCooldownDuration(actionID: number): LuaDurationObject;
    function GetActionLossOfControlCooldownInfo(actionID: number): SpellLossOfControlInfo;
    function GetActionText(actionID: number): string | undefined;
    function GetActionTexture(actionID: number): number;
    function GetActionUseCount(actionID: number): number;
    function GetBonusBarIndex(): number;
    function GetBonusBarIndexForSlot(slotID: number): number | undefined;
    function GetBonusBarOffset(): number;
    function GetExtraBarIndex(): number;
    function GetItemActionOnEquipSpellID(actionID: number): number | undefined;
    function GetMultiCastBarIndex(): number;
    function GetOverrideBarIndex(): number;
    function GetOverrideBarSkin(): number | undefined;
    function GetPetActionPetBarIndices(petActionID: number, setToSearch?: Enum.ActionBarSet): number[] | undefined;
    function GetProfessionQuality(actionID: number): number | undefined;
    function GetProfessionQualityInfo(actionID: number): CraftingQualityInfo | undefined;
    function GetSpell(actionID: number): number;
    function GetTempShapeshiftBarIndex(): number;
    function GetVehicleBarIndex(): number;
    /** Returns true if an actionbar slot is populated with an action. */
    function HasAction(actionID: number): boolean;
    function HasAssistedCombatActionButtons(setToSearch?: Enum.ActionBarSet): boolean;
    function HasBonusActionBar(): boolean;
    function HasExtraActionBar(): boolean;
    function HasFlyoutActionButtons(flyoutID: number, setToSearch?: Enum.ActionBarSet): boolean;
    function HasOverrideActionBar(): boolean;
    function HasPetActionButtons(petActionID: number, setToSearch?: Enum.ActionBarSet): boolean;
    function HasPetActionPetBarIndices(petActionID: number, setToSearch?: Enum.ActionBarSet): boolean;
    function HasRangeRequirements(actionID: number): boolean;
    function HasSpellActionButtons(spellID: number | string, setToSearch?: Enum.ActionBarSet): boolean;
    function HasTempShapeshiftActionBar(): boolean;
    function HasVehicleActionBar(): boolean;
    function IsActionInRange(actionID: number, target?: UnitToken): boolean | undefined;
    /** Returns whether the given action button contains the Assisted Combat action spell. */
    function IsAssistedCombatAction(slotID: number): boolean;
    function IsAttackAction(actionID: number): boolean;
    function IsAutoCastPetAction(slotID: number): boolean;
    function IsAutoRepeatAction(actionID: number): boolean;
    function IsConsumableAction(actionID: number): boolean;
    function IsCurrentAction(actionID: number): boolean;
    function IsEnabledAutoCastPetAction(slotID: number): boolean;
    function IsEquippedAction(actionID: number): boolean;
    function IsEquippedGearOutfitAction(slotID: number): boolean;
    function IsHarmfulAction(actionID: number, useNeutral: boolean): boolean;
    function IsHelpfulAction(actionID: number, useNeutral: boolean): boolean;
    function IsHighestSpellRank(spellID: number | string): boolean;
    /** Returns whether the given action button contains a spell that can interrupt spellcasting. */
    function IsInterruptAction(slotID: number): boolean;
    function IsItemAction(actionID: number): boolean;
    /** Returns whether the given action button contains a macro with an explicit #showtooltip directive. */
    function IsMacroActionWithShowTooltip(actionID: number): boolean;
    function IsOnBarOrSpecialBar(spellID: number | string, setToSearch?: Enum.ActionBarSet): boolean;
    function IsPossessBarVisible(): boolean;
    function IsStackableAction(actionID: number): boolean;
    function IsUsableAction(actionID: number): LuaMultiReturn<[isUsable: boolean, isLackingResources: boolean]>;
    function PutActionInSlot(slotID: number): void;
    function RegisterActionUIButton(checkboxFrame: CheckButton, actionID: number, cooldownFrame: Cooldown): void;
    function SetActionBarPage(pageIndex: number): void;
    function ShouldOverrideBarShowHealthBar(): boolean;
    function ShouldOverrideBarShowManaBar(): boolean;
    function ShouldShowKeyring(): boolean;
    function ToggleAutoCastPetAction(slotID: number): void;
    function UnregisterActionUIButton(checkboxFrame: CheckButton): void;
    function UsesActionText(actionID: number): boolean;
}

declare namespace C_AddOnProfiler {
    /** Adds a measured event to any ongoing measured calls. If no such calls are currently taking place, this function does nothing. */
    function AddMeasuredCallEvent(name: string): void;
    /**
     * Internal API for telemetry.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function AddPerformanceMessageShown(msg: AddOnPerformanceMessage): void;
    /** Optimized check for determining if AddOns are severely impacting UI performance. */
    function CheckForPerformanceMessage(): AddOnPerformanceMessage | undefined;
    /** Gets an AddOn profiler value - all times returned are in milliseconds. */
    function GetAddOnMetric(name: string, metric: Enum.AddOnProfilerMetric): number;
    /** Overall profiling data for the entire application (not just the UI) */
    function GetApplicationMetric(metric: Enum.AddOnProfilerMetric): number;
    /** Overall profiling data for all addons */
    function GetOverallMetric(metric: Enum.AddOnProfilerMetric): number;
    /** Returns the number of profiling clock ticks that occur within a single real-time second. */
    function GetTicksPerSecond(): number;
    /** Gets top K AddOns for a given metric. */
    function GetTopKAddOnsForMetric(metric: Enum.AddOnProfilerMetric, k: number): AddOnProfilerResult[];
    /** AddOn profiler will be enabled for all users, but this will return false if it ever isn't */
    function IsEnabled(): boolean;
    /** Performs a profiled measurement of a single function call with any supplied arguments. */
    function MeasureCall(func: any, ...arguments_: (any)[]): LuaMultiReturn<[results: AddOnProfilerCallResults, ...returns: (any)[]]>;
}

declare namespace C_AddOns {
    function DisableAddOn(name: number | string, character?: string): void;
    function DisableAllAddOns(character?: string): void;
    function DoesAddOnExist(name: number | string): boolean;
    function DoesAddOnHaveLoadError(name: number | string): boolean;
    function EnableAddOn(name: number | string, character?: string): void;
    function EnableAllAddOns(character?: string): void;
    function GetAddOnDependencies(name: number | string): LuaMultiReturn<[...deps: (string)[]]>;
    function GetAddOnEnableState(name: number | string, character?: string): Enum.AddOnEnableState;
    function GetAddOnInfo(name: number | string): LuaMultiReturn<[name: string, title: string, notes: string, loadable: boolean, reason: string, security: string]>;
    function GetAddOnInterfaceVersion(name: number | string): number;
    /** Returns the addon table (passed as the second argument of ... to files) for any addon that opts in through setting AllowAddOnTableAccess: 1 in the toc file. Insecure code cannot query addon tables from Blizzard addons. */
    function GetAddOnLocalTable(name: number | string): any;
    function GetAddOnMetadata(name: number | string, variable: string): string;
    function GetAddOnName(index: number | string): string;
    function GetAddOnNotes(name: number | string): string;
    function GetAddOnOptionalDependencies(name: number | string): LuaMultiReturn<[...deps: (string)[]]>;
    function GetAddOnSecurity(name: number | string): Enum.AddOnSecurityStatus;
    function GetAddOnTitle(name: number | string): string;
    function GetNumAddOns(): number;
    function GetScriptsDisallowedForBeta(): boolean;
    function IsAddOnDefaultEnabled(name: number | string): boolean;
    function IsAddOnLoadable(name: number | string, character?: string, demandLoaded?: boolean): LuaMultiReturn<[loadable: boolean, reason: string]>;
    function IsAddOnLoaded(name: number | string): LuaMultiReturn<[loadedOrLoading: boolean, loaded: boolean]>;
    function IsAddOnLoadOnDemand(name: number | string): boolean;
    function IsAddonVersionCheckEnabled(): boolean;
    function LoadAddOn(name: number | string): LuaMultiReturn<[loaded: boolean | undefined, value: string | undefined]>;
    function ResetAddOns(): void;
    function ResetDisabledAddOns(): void;
    function SaveAddOns(): void;
    function SetAddonVersionCheck(enabled: boolean): void;
}

declare namespace C_AdventureMap {
    function GetAdventureMapTextureKit(): string;
    function GetNumMapInsets(): number;
    function GetNumQuestOffers(): number;
    function GetNumZoneChoices(): number;
    function GetQuestPortraitInfo(questID: number): AdventureMapQuestPortraitInfo | undefined;
}

declare namespace C_AlliedRaces {
    function GetAllRacialAbilitiesFromID(raceID: number): AlliedRaceRacialAbility[] | undefined;
    function GetRaceInfoByID(raceID: number): AlliedRaceInfo | undefined;
}

declare namespace C_AnimaDiversion {
    function CloseUI(): void;
    function GetAnimaDiversionNodes(): AnimaDiversionNodeInfo[] | undefined;
    function GetOriginPosition(): Vector2DMixin | undefined;
    function GetReinforceProgress(): number;
    function GetTextureKit(): string;
    function OpenAnimaDiversionUI(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SelectAnimaNode(talentID: number, temporary: boolean): void;
}

declare namespace C_ArdenwealdGardening {
    function GetGardenData(): ArdenwealdGardenData;
    function IsGardenAccessible(): boolean;
}

declare namespace C_AreaPoiInfo {
    function GetAreaPOIForMap(uiMapID: number): number[];
    function GetAreaPOIInfo(uiMapID: number | undefined, areaPoiID: number): AreaPOIInfo | undefined;
    /** Returns the number of seconds until the POI expires. */
    function GetAreaPOISecondsLeft(areaPoiID: number): number | undefined;
    /** Returns all area POIInfos flagged as delves for the given map. */
    function GetDelvesForMap(uiMapID: number): number[];
    /** Returns all area POIInfos flagged as dragonriding races for the given map. */
    function GetDragonridingRacesForMap(uiMapID: number): number[];
    /** Returns all area POIInfos flagged as events for the given map. */
    function GetEventsForMap(uiMapID: number): number[];
    /** Returns all area POIInfos flagged as quest hubs for the given map. */
    function GetQuestHubsForMap(uiMapID: number): number[];
    /** This statically determines if the POI is timed, GetAreaPOITimeLeft retrieves the value from the server and may return nothing for long intervals */
    function IsAreaPOITimed(areaPoiID: number): LuaMultiReturn<[isTimed: boolean, hideTimerInTooltip: boolean | undefined]>;
}

declare namespace C_ArtifactUI {
    function AddPower(powerID: number): boolean;
    function ApplyCursorRelicToSlot(relicSlotIndex: number): void;
    function CanApplyArtifactRelic(relicItemID: number, onlyUnlocked: boolean): boolean;
    function CanApplyCursorRelicToSlot(relicSlotIndex: number): boolean;
    function CanApplyRelicItemIDToEquippedArtifactSlot(relicItemID: number, relicSlotIndex: number): boolean;
    function CanApplyRelicItemIDToSlot(relicItemID: number, relicSlotIndex: number): boolean;
    function CheckRespecNPC(): boolean;
    function Clear(): void;
    function ClearForgeCamera(): void;
    function ConfirmRespec(): void;
    function DoesEquippedArtifactHaveAnyRelicsSlotted(): boolean;
    function GetAppearanceInfo(appearanceSetIndex: number, appearanceIndex: number): LuaMultiReturn<[artifactAppearanceID: number | undefined, appearanceName: string | undefined, displayIndex: number | undefined, unlocked: boolean | undefined, failureDescription: string | undefined, uiCameraID: number | undefined, altHandCameraID: number | undefined, swatchColorR: number | undefined, swatchColorG: number | undefined, swatchColorB: number | undefined, modelOpacity: number | undefined, modelSaturation: number | undefined, obtainable: boolean | undefined]>;
    function GetAppearanceInfoByID(artifactAppearanceID: number): LuaMultiReturn<[artifactAppearanceSetID: number | undefined, artifactAppearanceID: number | undefined, appearanceName: string | undefined, displayIndex: number | undefined, unlocked: boolean | undefined, failureDescription: string | undefined, uiCameraID: number | undefined, altHandCameraID: number | undefined, swatchColorR: number | undefined, swatchColorG: number | undefined, swatchColorB: number | undefined, modelOpacity: number | undefined, modelSaturation: number | undefined, obtainable: boolean | undefined]>;
    function GetAppearanceSetInfo(appearanceSetIndex: number): LuaMultiReturn<[artifactAppearanceSetID: number | undefined, appearanceSetName: string | undefined, appearanceSetDescription: string | undefined, numAppearances: number | undefined]>;
    function GetArtifactArtInfo(): ArtifactArtInfo | undefined;
    function GetArtifactInfo(): LuaMultiReturn<[itemID: number | undefined, altItemID: number | undefined, name: string | undefined, icon: number | undefined, xp: number | undefined, pointsSpent: number | undefined, quality: number | undefined, artifactAppearanceID: number | undefined, appearanceModID: number | undefined, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean | undefined, tier: ArtifactTiers | undefined]>;
    function GetArtifactItemID(): number | undefined;
    function GetArtifactTier(): ArtifactTiers | undefined;
    function GetArtifactXPRewardTargetInfo(artifactCategoryID: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined]>;
    function GetCostForPointAtRank(rank: number, tier: ArtifactTiers): number;
    function GetEquippedArtifactArtInfo(): ArtifactArtInfo | undefined;
    function GetEquippedArtifactInfo(): LuaMultiReturn<[itemID: number | undefined, altItemID: number | undefined, name: string | undefined, icon: number | undefined, xp: number | undefined, pointsSpent: number | undefined, quality: number | undefined, artifactAppearanceID: number | undefined, appearanceModID: number | undefined, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean | undefined, tier: ArtifactTiers | undefined]>;
    function GetEquippedArtifactItemID(): number | undefined;
    function GetEquippedArtifactNumRelicSlots(onlyUnlocked?: boolean): number;
    function GetEquippedArtifactRelicInfo(relicSlotIndex: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, slotTypeName: string | undefined, link: string | undefined]>;
    function GetEquippedRelicLockedReason(relicSlotIndex: number): string | undefined;
    function GetForgeRotation(): LuaMultiReturn<[forgeRotationX: number, forgeRotationY: number, forgeRotationZ: number]>;
    function GetItemLevelIncreaseProvidedByRelic(itemLinkOrID: ItemInfo): number | undefined;
    function GetMetaPowerInfo(): LuaMultiReturn<[...spellID: (number)[]]>;
    function GetNumAppearanceSets(): number;
    function GetNumObtainedArtifacts(): number;
    function GetNumRelicSlots(onlyUnlocked?: boolean): number;
    function GetPointsRemaining(): number;
    function GetPowerHyperlink(powerID: number): string;
    function GetPowerInfo(powerID: number): ArtifactPowerInfo | undefined;
    function GetPowerLinks(powerID: number): number[];
    function GetPowers(): number[] | undefined;
    function GetPowersAffectedByRelic(relicSlotIndex: number): LuaMultiReturn<[...powerIDs: (number)[]]>;
    function GetPowersAffectedByRelicItemLink(relicItemInfo: ItemInfo): LuaMultiReturn<[...powerIDs: (number)[]]>;
    function GetPreviewAppearance(): number | undefined;
    function GetRelicInfo(relicSlotIndex: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, slotTypeName: string | undefined, link: string | undefined]>;
    function GetRelicInfoByItemID(itemID: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, slotTypeName: string | undefined, link: string | undefined]>;
    function GetRelicLockedReason(relicSlotIndex: number): string | undefined;
    function GetRelicSlotType(relicSlotIndex: number): string | undefined;
    function GetRespecArtifactArtInfo(): ArtifactArtInfo | undefined;
    function GetRespecArtifactInfo(): LuaMultiReturn<[itemID: number | undefined, altItemID: number | undefined, name: string | undefined, icon: number | undefined, xp: number | undefined, pointsSpent: number | undefined, quality: number | undefined, artifactAppearanceID: number | undefined, appearanceModID: number | undefined, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean | undefined, tier: ArtifactTiers | undefined]>;
    function GetRespecCost(): number;
    function GetTotalPowerCost(startingTrait: number, numTraits: number, artifactTier: ArtifactTiers): number | undefined;
    function GetTotalPurchasedRanks(): number;
    function IsArtifactDisabled(): boolean;
    function IsArtifactItem(itemLocation: ItemLocationMixin): boolean;
    function IsAtForge(): boolean;
    function IsEquippedArtifactDisabled(): boolean;
    function IsEquippedArtifactMaxed(): boolean;
    function IsMaxedByRulesOrEffect(): boolean;
    function IsPowerKnown(powerID: number): boolean;
    function IsViewedArtifactEquipped(): boolean;
    function SetAppearance(artifactAppearanceID: number): void;
    function SetForgeCamera(): void;
    function SetForgeRotation(forgeRotationX: number, forgeRotationY: number, forgeRotationZ: number): void;
    /** Call without an argument to clear the preview. */
    function SetPreviewAppearance(artifactAppearanceID?: number): void;
    function ShouldSuppressForgeRotation(): boolean;
}

declare namespace C_AssistedCombat {
    function GetActionSpell(): number | undefined;
    function GetNextCastSpell(checkForVisibleButton?: boolean): number | undefined;
    function GetRotationSpells(): number[];
    function IsAvailable(): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;
}

declare namespace C_AuctionHouse {
    function CalculateCommodityDeposit(itemID: number, duration: number, quantity: number): number | undefined;
    function CalculateItemDeposit(item: ItemLocationMixin, duration: number, quantity: number): number | undefined;
    function CanCancelAuction(ownedAuctionID: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CancelAuction(ownedAuctionID: number): void;
    function CancelCommoditiesPurchase(): void;
    function CancelSell(): void;
    function CloseAuctionHouse(): void;
    function ConfirmCommoditiesPurchase(itemID: number, quantity: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ConfirmPostCommodity(item: ItemLocationMixin, duration: number, quantity: number, unitPrice: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ConfirmPostItem(item: ItemLocationMixin, duration: number, quantity: number, bid?: number, buyout?: number): void;
    function FavoritesAreAvailable(): boolean;
    function GetAuctionInfoByID(auctionID: number): AuctionInfo | undefined;
    function GetAuctionItemSubClasses(classID: number): number[];
    function GetAvailablePostCount(item: ItemLocationMixin): number;
    function GetBidInfo(bidIndex: number): BidInfo | undefined;
    function GetBids(): BidInfo[];
    function GetBidType(bidTypeIndex: number): ItemKey | undefined;
    function GetBrowseResults(): BrowseResultInfo[];
    function GetCancelCost(ownedAuctionID: number): number;
    function GetCommoditySearchResultInfo(itemID: number, commoditySearchResultIndex: number): CommoditySearchResultInfo | undefined;
    function GetCommoditySearchResultsQuantity(itemID: number): number;
    function GetExtraBrowseInfo(itemKey: ItemKey): number | undefined;
    function GetFilterGroups(): AuctionHouseFilterGroup[];
    function GetItemCommodityStatus(item: ItemLocationMixin): Enum.ItemCommodityStatus;
    function GetItemKeyFromItem(item: ItemLocationMixin): ItemKey;
    function GetItemKeyInfo(itemKey: ItemKey, restrictQualityToFilter?: boolean): ItemKeyInfo | undefined;
    function GetItemKeyRequiredLevel(itemKey: ItemKey): number | undefined;
    /** Returns a link for an item in this key's results with player-applied enchants, gems and reforges stripped */
    function GetItemKeySampleLink(itemKey: ItemKey): string | undefined;
    function GetItemSearchResultInfo(itemKey: ItemKey, itemSearchResultIndex: number): ItemSearchResultInfo | undefined;
    function GetItemSearchResultsQuantity(itemKey: ItemKey): number;
    function GetMaxBidItemBid(): number | undefined;
    function GetMaxBidItemBuyout(): number | undefined;
    function GetMaxCommoditySearchResultPrice(itemID: number): number | undefined;
    function GetMaxItemSearchResultBid(itemKey: ItemKey): number | undefined;
    function GetMaxItemSearchResultBuyout(itemKey: ItemKey): number | undefined;
    function GetMaxOwnedAuctionBid(): number | undefined;
    function GetMaxOwnedAuctionBuyout(): number | undefined;
    function GetNumBids(): number;
    function GetNumBidTypes(): number;
    function GetNumCommoditySearchResults(itemID: number): number;
    function GetNumItemSearchResults(itemKey: ItemKey): number;
    function GetNumOwnedAuctions(): number;
    function GetNumOwnedAuctionTypes(): number;
    function GetNumReplicateItems(): number;
    function GetOwnedAuctionInfo(ownedAuctionIndex: number): OwnedAuctionInfo | undefined;
    function GetOwnedAuctions(): OwnedAuctionInfo[];
    function GetOwnedAuctionType(ownedAuctionTypeIndex: number): ItemKey | undefined;
    function GetQuoteDurationRemaining(): number;
    function GetReplicateItemBattlePetInfo(index: number): LuaMultiReturn<[creatureID: number | undefined, displayID: number | undefined]>;
    function GetReplicateItemInfo(index: number): LuaMultiReturn<[name: string | undefined, texture: number | undefined, count: number, qualityID: number, usable: boolean | undefined, level: number, levelType: string | undefined, minBid: number, minIncrement: number, buyoutPrice: number, bidAmount: number, highBidder: string | undefined, bidderFullName: string | undefined, owner: string | undefined, ownerFullName: string | undefined, saleStatus: number, itemID: number, hasAllInfo: boolean | undefined]>;
    function GetReplicateItemLink(index: number): string | undefined;
    function GetReplicateItemTimeLeft(index: number): number;
    function GetTimeLeftBandInfo(timeLeftBand: Enum.AuctionHouseTimeLeftBand): LuaMultiReturn<[timeLeftMinSeconds: number, timeLeftMaxSeconds: number]>;
    function HasFavorites(): boolean;
    function HasFullBidResults(): boolean;
    function HasFullBrowseResults(): boolean;
    function HasFullCommoditySearchResults(itemID: number): boolean;
    function HasFullItemSearchResults(itemKey: ItemKey): boolean;
    function HasFullOwnedAuctionResults(): boolean;
    function HasMaxFavorites(): boolean;
    function HasSearchResults(itemKey: ItemKey): boolean;
    function IsFavoriteItem(itemKey: ItemKey): boolean;
    function IsSellItemValid(item: ItemLocationMixin, displayError?: boolean): boolean;
    function IsThrottledMessageSystemReady(): boolean;
    function MakeItemKey(itemID: number, itemLevel?: number, itemSuffix?: number, battlePetSpeciesID?: number): ItemKey;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PlaceBid(auctionID: number, bidAmount: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PostCommodity(item: ItemLocationMixin, duration: number, quantity: number, unitPrice: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PostItem(item: ItemLocationMixin, duration: number, quantity: number, bid?: number, buyout?: number): boolean;
    function QueryBids(sorts: AuctionHouseSortType[], auctionIDs: number[]): void;
    function QueryOwnedAuctions(sorts: AuctionHouseSortType[]): void;
    function RefreshCommoditySearchResults(itemID: number): void;
    function RefreshItemSearchResults(itemKey: ItemKey, minLevelFilter?: number, maxLevelFilter?: number): void;
    /** This function should be used in place of an 'allItem' QueryAuctionItems call to query the entire auction house. */
    function ReplicateItems(): void;
    function RequestMoreBrowseResults(): void;
    function RequestMoreCommoditySearchResults(itemID: number): boolean;
    function RequestMoreItemSearchResults(itemKey: ItemKey): boolean;
    function RequestOwnedAuctionBidderInfo(auctionID: number): string;
    function SearchForFavorites(sorts: AuctionHouseSortType[]): void;
    function SearchForItemKeys(itemKeys: ItemKey[], sorts: AuctionHouseSortType[]): void;
    function SendBrowseQuery(query: AuctionHouseBrowseQuery): void;
    /** Search queries are restricted to 100 calls per minute. These should not be used to query the entire auction house. See ReplicateItems */
    function SendSearchQuery(itemKey: ItemKey, sorts: AuctionHouseSortType[], separateOwnerItems: boolean, minLevelFilter?: number, maxLevelFilter?: number): void;
    /** Search queries are restricted to 100 calls per minute. These should not be used to query the entire auction house. See ReplicateItems. ItemKey should have its iLVL and suffix cleared before calling. */
    function SendSellSearchQuery(itemKey: ItemKey, sorts: AuctionHouseSortType[], separateOwnerItems: boolean): void;
    function SetFavoriteItem(itemKey: ItemKey, setFavorite: boolean): void;
    function ShouldAutoPopulatePrice(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function StartCommoditiesPurchase(itemID: number, quantity: number): void;
    function SupportsCopperValues(): boolean;
}

declare namespace C_AuraContainerUtil {
    function ProcessAuraTooltipBackdropOptions(options: AuraContainerTooltipBackdropOptions): AuraContainerTooltipBackdropOptions;
    function ProcessAuraTooltipNineSliceOptions(options: AuraContainerTooltipNineSliceOptions): AuraContainerTooltipNineSliceOptions;
    function ProcessAuraTooltipTextureSliceOptions(options: AuraContainerTooltipTextureSliceOptions): AuraContainerTooltipTextureSliceOptions;
    function ProcessCustomAuraButtonApplicationBarOptions(options: CustomAuraButtonApplicationBarOptions): CustomAuraButtonApplicationBarOptions;
    function ProcessCustomAuraButtonApplicationCountOptions(options?: CustomAuraButtonApplicationCountOptions): CustomAuraButtonApplicationCountOptions;
    function ProcessCustomAuraButtonCasterNameOptions(options?: CustomAuraButtonCasterNameOptions): CustomAuraButtonCasterNameOptions;
    function ProcessCustomAuraButtonDispelTypeTextOptions(options?: CustomAuraButtonDispelTypeTextOptions): CustomAuraButtonDispelTypeTextOptions;
    function ProcessCustomAuraButtonDispelTypeTextureOptions(options?: CustomAuraButtonDispelTypeTextureOptions): CustomAuraButtonDispelTypeTextureOptions;
    function ProcessCustomAuraButtonDurationBarOptions(options?: CustomAuraButtonDurationBarOptions): CustomAuraButtonDurationBarOptions;
    function ProcessCustomAuraButtonDurationTextOptions(options?: CustomAuraButtonDurationTextOptions): CustomAuraButtonDurationTextOptions;
}

declare namespace C_AutoComplete {
    function GetAutoCompletePresenceID(name: string): number | undefined;
    function GetAutoCompleteRealms(): string[];
    function GetAutoCompleteResults(name: string, numResults: number, cursorPosition: number, allowFullMatch: boolean, includeFlags: number, excludeFlags: number): AutoCompleteResult[];
    function IsRecognizedName(name: string, includeFlags: number, excludeFlags: number): boolean;
}

declare namespace C_AutoLoot {
    function SetUseAutoLootToggle(useAutoLootToggle: boolean): void;
}

declare namespace C_AzeriteEmpoweredItem {
    function CanSelectPower(azeriteEmpoweredItemLocation: ItemLocationMixin, powerID: number): boolean;
    function ConfirmAzeriteEmpoweredItemRespec(azeriteEmpoweredItemLocation: ItemLocationMixin): void;
    function GetAllTierInfo(azeriteEmpoweredItemLocation: ItemLocationMixin): AzeriteEmpoweredItemTierInfo[];
    function GetAllTierInfoByItemID(itemInfo: ItemInfo, classID?: number): AzeriteEmpoweredItemTierInfo[];
    function GetAzeriteEmpoweredItemRespecCost(): number;
    function GetPowerInfo(powerID: number): AzeriteEmpoweredItemPowerInfo | undefined;
    function GetPowerText(azeriteEmpoweredItemLocation: ItemLocationMixin, powerID: number, level: Enum.AzeritePowerLevel): AzeriteEmpoweredItemPowerText | undefined;
    function GetSpecsForPower(powerID: number): AzeriteSpecInfo[] | undefined;
    function HasAnyUnselectedPowers(azeriteEmpoweredItemLocation: ItemLocationMixin): boolean;
    function HasBeenViewed(azeriteEmpoweredItemLocation: ItemLocationMixin): boolean;
    function IsAzeriteEmpoweredItem(itemLocation: ItemLocationMixin): boolean;
    function IsAzeriteEmpoweredItemByID(itemInfo: ItemInfo): boolean;
    function IsAzeritePreviewSourceDisplayable(itemInfo: ItemInfo, classID?: number): boolean;
    function IsHeartOfAzerothEquipped(): boolean;
    function IsPowerAvailableForSpec(powerID: number, specID: number): boolean;
    function IsPowerSelected(azeriteEmpoweredItemLocation: ItemLocationMixin, powerID: number): boolean;
    function SelectPower(azeriteEmpoweredItemLocation: ItemLocationMixin, powerID: number): boolean;
    function SetHasBeenViewed(azeriteEmpoweredItemLocation: ItemLocationMixin): void;
}

declare namespace C_AzeriteEssence {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ActivateEssence(essenceID: number, milestoneID: number): void;
    function CanActivateEssence(essenceID: number, milestoneID: number): boolean;
    function CanDeactivateEssence(milestoneID: number): boolean;
    function CanOpenUI(): boolean;
    function ClearPendingActivationEssence(): void;
    function CloseForge(): void;
    function GetEssenceHyperlink(essenceID: number, rank: number): string;
    function GetEssenceInfo(essenceID: number): AzeriteEssenceInfo | undefined;
    function GetEssences(): AzeriteEssenceInfo[] | undefined;
    function GetMilestoneEssence(milestoneID: number): number | undefined;
    function GetMilestoneInfo(milestoneID: number): AzeriteMilestoneInfo | undefined;
    function GetMilestones(): AzeriteMilestoneInfo[] | undefined;
    function GetMilestoneSpell(milestoneID: number): number | undefined;
    function GetNumUnlockedEssences(): number;
    function GetNumUsableEssences(): number;
    function GetPendingActivationEssence(): number;
    function HasNeverActivatedAnyEssences(): boolean;
    function HasPendingActivationEssence(): boolean;
    function IsAtForge(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPendingActivationEssence(essenceID: number): void;
    function UnlockMilestone(milestoneID: number): void;
}

declare namespace C_AzeriteItem {
    function FindActiveAzeriteItem(): ItemLocationMixin | undefined;
    function GetAzeriteItemXPInfo(azeriteItemLocation: ItemLocationMixin): LuaMultiReturn<[xp: number | undefined, totalLevelXP: number | undefined]>;
    function GetPowerLevel(azeriteItemLocation: ItemLocationMixin): number;
    function GetUnlimitedPowerLevel(azeriteItemLocation: ItemLocationMixin): number;
    function HasActiveAzeriteItem(): boolean;
    function IsAzeriteItem(itemLocation: ItemLocationMixin): boolean;
    function IsAzeriteItemAtMaxLevel(): boolean;
    function IsAzeriteItemByID(itemInfo: ItemInfo): boolean;
    function IsAzeriteItemEnabled(azeriteItemLocation: ItemLocationMixin): boolean;
    function IsUnlimitedLevelingUnlocked(): boolean;
}

declare namespace C_Bank {
    function AreAnyBankTypesViewable(): boolean;
    function AutoDepositItemsIntoBank(bankType: Enum.BankType): void;
    function BankBagTypeAndIDToInvSlot(bankType: Enum.BankType, slotIndex: number): number | undefined;
    function CanDepositMoney(bankType: Enum.BankType): boolean;
    function CanPurchaseBankTab(bankType: Enum.BankType): boolean;
    function CanUseBank(bankType: Enum.BankType): boolean;
    function CanViewBank(bankType: Enum.BankType): boolean;
    function CanWithdrawMoney(bankType: Enum.BankType): boolean;
    function CloseBankFrame(): void;
    function DepositMoney(bankType: Enum.BankType, amount: number): void;
    function DoesBankTypeSupportAutoDeposit(bankType: Enum.BankType): boolean;
    function DoesBankTypeSupportMoneyTransfer(bankType: Enum.BankType): boolean;
    function FetchBankLockedReason(bankType: Enum.BankType): Enum.BankLockedReason | undefined;
    function FetchDepositedMoney(bankType: Enum.BankType): number;
    function FetchMaxNumBankTabs(bankType: Enum.BankType): number;
    function FetchNextPurchasableBankTabData(bankType: Enum.BankType): PurchasableBankTabData | undefined;
    function FetchNumPurchasedBankTabs(bankType: Enum.BankType): number;
    function FetchPurchasedBankTabData(bankType: Enum.BankType): BankTabData[];
    function FetchPurchasedBankTabIDs(bankType: Enum.BankType): Enum.BagIndex[];
    function FetchViewableBankTypes(): Enum.BankType[];
    function HasMaxBankTabs(bankType: Enum.BankType): boolean;
    function IsItemAllowedInBankType(bankType: Enum.BankType, itemLocation: ItemLocationMixin): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PurchaseBankTab(bankType: Enum.BankType): void;
    function ShouldUsePlayerBagsInBank(): boolean;
    function UpdateBankTabSettings(bankType: Enum.BankType, tabID: Enum.BagIndex, tabName: string, tabIcon: string, depositFlags: Enum.BagSlotFlags): void;
    function WithdrawMoney(bankType: Enum.BankType, amount: number): void;
}

declare namespace C_BarberShop {
    function ApplyCustomizationChoices(): boolean;
    function Cancel(): void;
    function ClearPreviewChoices(clearSavedChoices?: boolean): void;
    function GetAvailableCustomizations(): CharCustomizationCategory[] | undefined;
    function GetCurrentCameraZoom(): number;
    function GetCurrentCharacterData(): PlayerInfoCharacterData | undefined;
    function GetCurrentCost(): number;
    function GetViewingChrModel(): number | undefined;
    function HasAlteredForm(): boolean;
    function HasAnyChanges(): boolean;
    function HasCustomizationFeature(featureMask: Enum.ChrModelFeatureFlags): boolean;
    function IsViewingAlteredForm(): boolean;
    function MarkCustomizationChoiceAsSeen(choiceID: number): void;
    function MarkCustomizationOptionAsSeen(optionID: number): void;
    function PreviewCustomizationChoice(optionID: number, choiceID: number): void;
    function RandomizeCustomizationChoices(): void;
    function ResetCameraRotation(): void;
    function ResetCustomizationChoices(): void;
    function RotateCamera(diffDegrees: number): void;
    function SaveSeenChoices(): void;
    function SetCameraDistanceOffset(offset: number): void;
    function SetCameraZoomLevel(zoomLevel: number, keepCustomZoom?: boolean): void;
    function SetCustomizationChoice(optionID: number, choiceID: number): void;
    function SetModelDressState(dressedState: boolean): void;
    function SetSelectedSex(sex: Enum.UnitSex): void;
    function SetViewingAlteredForm(isViewingAlteredForm: boolean): void;
    function SetViewingChrModel(chrModelID?: number, spellShapeshiftFormID?: number): void;
    function SetViewingShapeshiftForm(shapeshiftFormID?: number): void;
    function ZoomCamera(zoomAmount: number): void;
}

declare namespace C_BarberShopInternal {
    function SetQAMode(qaModeEnabled: boolean): void;
}

declare namespace C_BattleNet {
    function AreFriendTagsEnabled(): boolean;
    function AreHighResTexturesInstalled(): boolean;
    function AreRealIDFriendsEnabled(): boolean;
    function AreTitleFriendCustomNamesEnabled(): boolean;
    function AreTitleFriendsEnabled(): boolean;
    function BNCheckBattleTagInviteToRecentAlly(recentAllyGUID: string): void;
    function BNCheckTitleFriendInviteToUnit(unit: UnitToken): void;
    function CanToggleHighResTexturesWithoutClientReload(): boolean;
    function GetAccountInfoByGUID(guid: string): BNetAccountInfo | undefined;
    function GetAccountInfoByID(id: number, wowAccountGUID?: string): BNetAccountInfo | undefined;
    function GetCustomTitleFriendName(id: number): string | undefined;
    function GetFriendAccountInfo(friendIndex: number, wowAccountGUID?: string): BNetAccountInfo | undefined;
    function GetFriendGameAccountInfo(friendIndex: number, accountIndex: number): BNetGameAccountInfo | undefined;
    function GetFriendInviteInfo(inviteIndex: number): BNetFriendInviteInfo | undefined;
    function GetFriendLevelFromInviteText(inviteText: string): Enum.BattleNetFriendLevel;
    function GetFriendNumGameAccounts(friendIndex: number): number;
    function GetGameAccountInfoByGUID(guid: string): BNetGameAccountInfo | undefined;
    function GetGameAccountInfoByID(id: number): BNetGameAccountInfo | undefined;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function InstallHighResTextures(): void;
    function InviteFriend(gameAccountID: number): void;
    function IsBattleNetFriendsListEnabled(): boolean;
    function IsBattleNetFriendsListSupported(): boolean;
    function IsFriendTagSupportedForCurrentGameType(friendTag: Enum.BattleNetFriendTag): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SearchFriends(searchInfo: AuroraFriendsSearchInfo): number[];
    function SendGameData(gameAccountID: number, prefix: string, data: string): Enum.SendAddonMessageResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendTitleFriendInviteByName(name: string): void;
    function SendVerifiedBattleNetFriendInvite(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendWhisper(bnetAccountID: number, text: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetAFK(isAFK?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetAppearOffline(isAppearOffline?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetBlocked(bnetAccountID: number, block: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetCustomMessage(text: string): boolean;
    function SetCustomTitleFriendName(id: number, customName: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetDND(isDND?: boolean): void;
    function SetFriendTags(id: number, friendTags: Enum.BattleNetFriendTag[]): void;
}

declare namespace C_BehavioralMessaging {
    function SendNotificationReceipt(dbId: NotificationDbId, openTimeSeconds: number, readTimeSeconds: number): void;
}

declare namespace C_BlizzCon2026 {
    function GetExperience(): Enum.Bc26Experience;
    function IsActive(): boolean;
    function IsColdSwapFeatureEnabled(): boolean;
    function SetExperience(experience: Enum.Bc26Experience): void;
}

declare namespace C_Browser {
    function CloseFullscreenBrowser(): void;
}

declare namespace C_Calendar {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddEvent(): void;
    function AreNamesReady(): boolean;
    function CanAddEvent(): boolean;
    function CanSendInvite(): boolean;
    function CloseEvent(): void;
    function ContextMenuEventCanComplain(offsetMonths: number, monthDay: number, eventIndex: number): boolean;
    function ContextMenuEventCanEdit(offsetMonths: number, monthDay: number, eventIndex: number): boolean;
    function ContextMenuEventCanRemove(offsetMonths: number, monthDay: number, eventIndex: number): boolean;
    function ContextMenuEventClipboard(): boolean;
    function ContextMenuEventCopy(): void;
    function ContextMenuEventGetCalendarType(): string | undefined;
    function ContextMenuEventPaste(offsetMonths: number, monthDay: number): void;
    function ContextMenuEventRemove(): void;
    function ContextMenuEventSignUp(): void;
    function ContextMenuGetEventIndex(): CalendarEventIndexInfo | undefined;
    function ContextMenuInviteAvailable(): void;
    function ContextMenuInviteDecline(): void;
    function ContextMenuInviteRemove(): void;
    function ContextMenuInviteTentative(): void;
    function ContextMenuSelectEvent(offsetMonths: number, monthDay: number, eventIndex: number): void;
    function CreateCommunitySignUpEvent(): void;
    function CreateGuildAnnouncementEvent(): void;
    function CreateGuildSignUpEvent(): void;
    function CreatePlayerEvent(): void;
    function EventAvailable(): void;
    function EventCanEdit(): boolean;
    function EventClearAutoApprove(): void;
    function EventClearLocked(): void;
    function EventClearModerator(inviteIndex: number): void;
    function EventDecline(): void;
    function EventGetCalendarType(): string | undefined;
    function EventGetClubId(): string | undefined;
    function EventGetInvite(eventIndex: number): CalendarEventInviteInfo | undefined;
    function EventGetInviteResponseTime(eventIndex: number): CalendarTime | undefined;
    function EventGetInviteSortCriterion(): LuaMultiReturn<[criterion: string, reverse: boolean]>;
    function EventGetSelectedInvite(): number | undefined;
    function EventGetStatusOptions(eventIndex: number): CalendarEventStatusOption[];
    function EventGetTextures(eventType: Enum.CalendarEventType): CalendarEventTextureInfo[];
    function EventGetTypes(): string[];
    function EventGetTypesDisplayOrdered(): CalendarEventTypeDisplayInfo[];
    function EventHasPendingInvite(): boolean;
    function EventHaveSettingsChanged(): boolean;
    function EventInvite(name: string): void;
    function EventRemoveInvite(inviteIndex: number): void;
    function EventRemoveInviteByGuid(guid: string): void;
    function EventSelectInvite(inviteIndex: number): void;
    function EventSetAutoApprove(): void;
    function EventSetClubId(clubId?: string): void;
    function EventSetDate(month: number, monthDay: number, year: number): void;
    function EventSetDescription(description: string): void;
    function EventSetInviteStatus(eventIndex: number, status: Enum.CalendarStatus): void;
    function EventSetLocked(): void;
    function EventSetModerator(inviteIndex: number): void;
    function EventSetTextureID(textureIndex: number): void;
    function EventSetTime(hour: number, minute: number): void;
    function EventSetTitle(title: string): void;
    function EventSetType(typeIndex: Enum.CalendarEventType): void;
    function EventSignUp(): void;
    function EventSortInvites(criterion: string, reverse: boolean): void;
    function EventTentative(): void;
    function GetClubCalendarEvents(clubId: string, startTime: CalendarTime, endTime: CalendarTime): CalendarDayEvent[];
    function GetDayEvent(monthOffset: number, monthDay: number, index: number): CalendarDayEvent | undefined;
    function GetDefaultGuildFilter(): CalendarGuildFilterInfo;
    function GetEventIndex(): CalendarEventIndexInfo | undefined;
    function GetEventIndexInfo(eventID: string, monthOffset?: number, monthDay?: number): CalendarEventIndexInfo | undefined;
    function GetEventInfo(): CalendarEventInfo | undefined;
    function GetFirstPendingInvite(offsetMonths: number, monthDay: number): number | undefined;
    function GetGuildEventInfo(index: number): CalendarGuildEventInfo | undefined;
    function GetGuildEventSelectionInfo(index: number): CalendarEventIndexInfo | undefined;
    function GetHolidayInfo(monthOffset: number, monthDay: number, index: number): CalendarHolidayInfo | undefined;
    function GetMaxCreateDate(): CalendarTime;
    function GetMinDate(): CalendarTime;
    function GetMonthInfo(offsetMonths?: number): CalendarMonthInfo;
    function GetNextClubId(): string | undefined;
    function GetNumDayEvents(offsetMonths: number, monthDay: number): number;
    function GetNumGuildEvents(): number;
    function GetNumInvites(): number;
    function GetNumPendingInvites(): number;
    function GetRaidInfo(offsetMonths: number, monthDay: number, eventIndex: number): CalendarRaidInfo | undefined;
    function IsActionPending(): boolean;
    function IsEventOpen(): boolean;
    function MassInviteCommunity(clubId: string, minLevel: number, maxLevel: number, maxRankOrder?: number): void;
    function MassInviteGuild(minLevel: number, maxLevel: number, maxRankOrder: number): void;
    function OpenCalendar(): void;
    function OpenEvent(offsetMonths: number, monthDay: number, index: number): boolean;
    function RemoveEvent(): void;
    function SetAbsMonth(month: number, year: number): void;
    function SetMonth(offsetMonths: number): void;
    function SetNextClubId(clubId?: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function UpdateEvent(): void;
}

declare namespace C_CampaignInfo {
    function GetAvailableCampaigns(): number[];
    function GetCampaignChapterInfo(campaignChapterID: number): CampaignChapterInfo | undefined;
    function GetCampaignID(questID: number): number;
    function GetCampaignInfo(campaignID: number): CampaignInfo | undefined;
    function GetChapterIDs(campaignID: number): number[] | undefined;
    function GetCurrentChapterID(campaignID: number): number | undefined;
    function GetFailureReason(campaignID: number): CampaignFailureReason | undefined;
    function GetState(campaignID: number): Enum.CampaignState;
    function IsCampaignQuest(questID: number): boolean;
    function SortAsNormalQuest(campaignID: number): boolean;
}

declare namespace C_CatalogShop {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function BulkPurchaseProducts(productIDs: number[]): boolean;
    function BulkRefundDecors(decorGUIDs: string[]): void;
    function CloseCatalogShopInteraction(): void;
    function ConfirmHousingPurchase(productIDs: number[]): void;
    function FindBestCurrencyProductForNeededAmount(vcCurrencyCode: string, amountNeeded: number): number | undefined;
    function GetAvailableCategoryIDs(): number[];
    function GetAvailableTransmogRaceInfos(): AvailableRaceInfo[];
    function GetCatalogShopProductDisplayInfo(catalogShopProductID: number): CatalogShopProductDisplayInfo;
    function GetCategoryInfo(categoryID: number): CatalogShopCategoryInfo;
    function GetCategorySectionInfo(categoryID: number, sectionID: number): CatalogShopSectionInfo;
    function GetFailureInfo(): LuaMultiReturn<[errorResultEnum: StoreError | undefined, errorResultRaw: number | undefined]>;
    function GetFirstCategoryByProductID(productID: number): CatalogShopCategoryInfo | undefined;
    function GetNewProducts(): number[];
    function GetProductAvailabilityTimeRemainingSecs(catalogShopProductID: number): number | undefined;
    function GetProductIDsForBundle(bundleProductID: number): CatalogShopBundleChildInfo[];
    function GetProductIDsForCategory(categoryID: number): number[];
    function GetProductIDsForCategorySection(categoryID: number, sectionID: number): number[];
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetProductInfo(productID: number): CatalogShopProductInfo | undefined;
    function GetProductSortOrder(categoryID: number, sectionID: number, productID: number): number | undefined;
    function GetRefundableDecors(productIdFilterOpt?: number): LuaMultiReturn<[refundableDecorInfos: RefundableDecorInfo[], minTimeRemainingSeconds: number]>;
    function GetSectionIDsForCategory(categoryID: number): number[];
    function GetSpellVisualInfoForMount(spellVisualID: number): CatalogShopSpellVisualInfo;
    function GetVCProductInfos(): CatalogShopVCProductInfo[];
    function GetVirtualCurrencyBalance(currencyCode: string): string | undefined;
    function HasNewProducts(): boolean;
    function IsProductIncludedInAnyBundle(productID: number): boolean;
    function IsShop2Enabled(): boolean | undefined;
    function OnLegalDisclaimerClicked(catalogShopProductID: number): void;
    function OnLegalPersonalizedOptOutClicked(): void;
    function OpenCatalogShopInteractionFromHouse(): string;
    function OpenCatalogShopInteractionFromShop(): string;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ProductDisplayedTelemetry(categoryId: number, sectionId: number, catalogShopProductID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ProductSelectedTelemetry(categoryId: number, sectionId: number, catalogShopProductID: number, wasCodeSelection: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PurchaseProduct(productID: number): boolean;
    function RefreshRefundableDecors(): void;
    function RefreshVirtualCurrencyBalance(currencyCode: string): void;
    function ShouldShowHousingWarning(): boolean;
    function StartHousingVCPurchaseConfirmation(productID: number): void;
}

declare namespace C_ChallengeMode {
    function CanUseKeystoneInCurrentMap(itemLocation: ItemLocationMixin): boolean;
    function ClearKeystone(): void;
    function CloseKeystoneFrame(): void;
    function GetActiveChallengeMapID(): number | undefined;
    function GetActiveKeystoneInfo(): LuaMultiReturn<[activeKeystoneLevel: number, activeAffixIDs: number[], wasActiveKeystoneCharged: boolean]>;
    function GetAffixInfo(affixID: number): LuaMultiReturn<[name: string | undefined, description: string | undefined, filedataid: number | undefined]>;
    function GetChallengeCompletionInfo(): ChallengeCompletionInfo;
    function GetDeathCount(): LuaMultiReturn<[numDeaths: number | undefined, timeLost: number | undefined]>;
    /** Returns a color value from the passed in overall season M+ rating. */
    function GetDungeonScoreRarityColor(dungeonScore: number): ColorMixin;
    function GetGuildLeaders(): ChallengeModeGuildTopAttempt[] | undefined;
    /** Returns a color value from the passed in keystone level. */
    function GetKeystoneLevelRarityColor(level: number): ColorMixin;
    /** Returns how much time is left before player is automatically flagged as a leaver (and removed from the group) for exiting a restricted challenge mode instance */
    function GetLeaverPenaltyWarningTimeLeft(): number;
    function GetMapScoreInfo(): MythicPlusRatingLinkInfo[] | undefined;
    function GetMapTable(): number[];
    function GetMapUIInfo(mapChallengeModeID: number): LuaMultiReturn<[name: string | undefined, id: number | undefined, timeLimit: number | undefined, texture: number | undefined, backgroundTexture: number | undefined, mapID: number | undefined]>;
    /** Gets the overall season mythic+ rating for the player. */
    function GetOverallDungeonScore(): number;
    function GetPowerLevelDamageHealthMod(powerLevel: number): LuaMultiReturn<[damageMod: number | undefined, healthMod: number | undefined]>;
    function GetSlottedKeystoneInfo(): LuaMultiReturn<[mapChallengeModeID: number | undefined, affixIDs: number[] | undefined, keystoneLevel: number | undefined]>;
    /** Returns a color value from the passed in mythic+ rating from the combined affix scores for a specific dungeon */
    function GetSpecificDungeonOverallScoreRarityColor(specificDungeonOverallScore: number): ColorMixin;
    /** Returns a color value from the passed in mythic+ rating for a specific dungeon. */
    function GetSpecificDungeonScoreRarityColor(specificDungeonScore: number): ColorMixin;
    function GetStartTime(): number;
    function HasSlottedKeystone(): boolean;
    function IsChallengeModeActive(): boolean;
    function IsChallengeModeResettable(): boolean;
    function RemoveKeystone(): boolean;
    function RequestLeaders(mapChallengeModeID: number): void;
    function Reset(): void;
    function SlotKeystone(): void;
    function StartChallengeMode(): boolean;
}

declare namespace C_ChatBubbles {
    function GetAllChatBubbles(includeForbidden?: boolean): ChatBubbleFrame[];
}

declare namespace C_ChatInfo {
    /** Returns false if addons are allowed to send outgoing chat messages. This is controlled on a realm-by-realm basis (tournament realms allow it), and the ability for addons to receive comms is controlled separately. */
    function AreOutgoingAddonChatMessagesRestricted(): boolean;
    function CancelEmote(): void;
    function CanPlayerSpeakLanguage(languageId: number): boolean;
    function DropCautionaryChatMessage(confirmNumber: number): void;
    function GetChannelInfoFromIdentifier(channelIdentifier: string): ChatChannelInfo | undefined;
    function GetChannelRosterInfo(channelIndex: number, rosterIndex: number): LuaMultiReturn<[name: string | undefined, owner: boolean | undefined, moderator: boolean | undefined, guid: string | undefined]>;
    function GetChannelRuleset(channelIndex: number): Enum.ChatChannelRuleset;
    function GetChannelRulesetForChannelID(channelID: number): Enum.ChatChannelRuleset;
    function GetChannelShortcut(channelIndex: number): string;
    function GetChannelShortcutForChannelID(channelID: number): string;
    function GetChatLineSenderGUID(chatLine: number): string;
    function GetChatLineSenderName(chatLine: number): string;
    function GetChatLineText(chatLine: number): string;
    function GetChatTypeName(typeID: number): string | undefined;
    function GetClubStreamIDs(clubID: string): string[];
    function GetColorForChatType(chatType: string): ColorMixin | undefined;
    function GetGeneralChannelID(): number;
    function GetGeneralChannelLocalID(): number | undefined;
    function GetMentorChannelID(): number;
    function GetNumActiveChannels(): number;
    function GetNumReservedChatWindows(): number;
    function GetRegisteredAddonMessagePrefixes(): string[];
    /** Returns true if API security restrictions regarding chat messaging are in effect. */
    function InChatMessagingLockdown(): boolean;
    function IsAddonMessagePrefixRegistered(prefix: string): boolean;
    function IsChannelRegional(channelIndex: number): boolean;
    function IsChannelRegionalForChannelID(channelID: number): boolean;
    function IsChatLineCensored(chatLine: number): boolean;
    function IsLoggingChat(): boolean;
    function IsLoggingCombat(): LuaMultiReturn<[enabled: boolean, advanced: boolean]>;
    function IsPartyChannelType(channelType: Enum.ChatChannelType): boolean;
    function IsRegionalServiceAvailable(): boolean;
    function IsTimerunningPlayer(playerGUID: string): boolean;
    function IsValidChatLine(chatLine?: number): boolean;
    function IsValidCombatFilterName(name: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PerformEmote(emoteName: string, targetName?: string, suppressMoveError?: boolean): boolean;
    /** Registers interest in addon messages with this prefix, cannot be an empty string. */
    function RegisterAddonMessagePrefix(prefix: string): Enum.RegisterAddonMessagePrefixResult;
    function ReplaceIconAndGroupExpressions(input: string, noIconReplacement?: boolean, noGroupReplacement?: boolean): string;
    function RequestCanLocalWhisperTarget(whisperTarget: string): void;
    function ResetDefaultZoneChannels(): void;
    /** Sends a text payload to other clients specified by chatChannel and target which are registered to listen for prefix. */
    function SendAddonMessage(prefix: string, message: string, chatType?: string, target?: string): Enum.SendAddonMessageResult;
    /** Sends a text payload to other clients specified by chatChannel and target which are registered to listen for prefix. Intended for plain text payloads; logged and throttled. */
    function SendAddonMessageLogged(prefix: string, message: string, chatType?: string, target?: string): Enum.SendAddonMessageResult | undefined;
    function SendCautionaryChatMessage(confirmNumber: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendChatMessage(message: string, chatType?: string, languageID?: number, target?: string): void;
    function SwapChatChannelsByChannelIndex(firstChannelIndex: number, secondChannelIndex: number): void;
    function UncensorChatLine(chatLine: number): void;
}

declare namespace C_ChromieTime {
    function CloseUI(): void;
    function GetChromieTimeExpansionOption(expansionRecID: number): ChromieTimeExpansionInfo | undefined;
    function GetChromieTimeExpansionOptions(): ChromieTimeExpansionInfo[];
    function SelectChromieTimeOption(chromieTimeExpansionInfoId: number): void;
}

declare namespace C_CinematicList {
    function GetUICinematicList(): UICinematic[];
}

declare namespace C_ClassColor {
    function GetClassColor(className: string, tintColor?: ColorMixin): ColorMixin | undefined;
}

declare namespace C_ClassTalents {
    /** Returns true only if the player has staged changes and can commit their talents in their current state. */
    function CanChangeTalents(): LuaMultiReturn<[canChange: boolean, canAdd: boolean, changeError: string | undefined]>;
    function CanCreateNewConfig(): boolean;
    /** Returns true if the player could switch talents if they staged a proper loadout. */
    function CanEditTalents(): LuaMultiReturn<[canEdit: boolean, changeError: string]>;
    function CommitConfig(savedConfigID?: number): boolean;
    function DeleteConfig(configID: number): boolean;
    function GetActiveConfigID(): number | undefined;
    /** Returns the SubTreeID of the player's active Hero Talent Specialization SubTree. */
    function GetActiveHeroTalentSpec(): number | undefined;
    function GetConfigIDsBySpecID(specID?: number): number[];
    function GetHasStarterBuild(): boolean;
    /** Returns the SubTreeIDs of the Hero Talent Specializations available to a Class Specialization and config; Returns nothing if none available */
    function GetHeroTalentSpecsForClassSpec(configID?: number, classSpecID?: number): LuaMultiReturn<[subTreeIDs: number[] | undefined, requiredPlayerLevel: number | undefined]>;
    function GetLastSelectedSavedConfigID(specID: number): number | undefined;
    function GetNextStarterBuildPurchase(): LuaMultiReturn<[nodeID: number | undefined, entryID: number | undefined]>;
    function GetStarterBuildActive(): boolean;
    function GetTraitTreeForSpec(specID: number): number | undefined;
    /** Returns whether the player has any unspent talent points in their active hero talent tree. If hasUnspentPoints is true, numHeroPoints will be greater than zero. */
    function HasUnspentHeroTalentPoints(): LuaMultiReturn<[hasUnspentPoints: boolean, numHeroPoints: number]>;
    /** Returns whether the player has any unspent talent points in their class or spec talent trees. If hasUnspentPoints is true, the number of unspent points for at least one of the trees will be greater than zero. Hero talent points are not included by this function. */
    function HasUnspentTalentPoints(): LuaMultiReturn<[hasUnspentPoints: boolean, numClassPoints: number, numSpecPoints: number]>;
    function ImportLoadout(configID: number, entries: ImportLoadoutEntryInfo[], name: string, importString?: string): LuaMultiReturn<[success: boolean, importError: string]>;
    function InitializeViewLoadout(specID: number, level: number): void;
    /** New configs may or may not be populated and ready to load immediately after creation. Avoid calling for configs intentionally created empty. */
    function IsConfigPopulated(configID: number): boolean;
    function LoadConfig(configID: number, autoApply: boolean): LuaMultiReturn<[result: Enum.LoadConfigResult, changeError: string | undefined, newLearnedNodeIDs: number[]]>;
    function RenameConfig(configID: number, name: string): boolean;
    function RequestNewConfig(name: string): boolean;
    function SaveConfig(configID: number): boolean;
    function SetStarterBuildActive(active: boolean): Enum.LoadConfigResult;
    function SetUsesSharedActionBars(configID: number, usesShared: boolean): void;
    /**
     * Loads loadout for the current specialization by dropdown index. Indices start at 1.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SwitchToLoadoutByIndex(loadoutIndex: number): void;
    /**
     * Loads loadout for the current specialization by name. Loads the first one found in the case of duplicate names.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SwitchToLoadoutByName(loadoutName: string): void;
    /**
     * Activates specialization for the current class by index in the order within the Specializations tab. Indices start at 1.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SwitchToSpecializationByIndex(specIndex: number): void;
    /**
     * Activates specialization for the current class by spec name.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SwitchToSpecializationByName(specName: string): void;
    function UpdateLastSelectedSavedConfigID(specID: number, configID?: number): void;
    function ViewLoadout(entries: ImportLoadoutEntryInfo[], importString?: string): boolean;
}

declare namespace C_ClickBindings {
    function CanSpellBeClickBound(spellID: number | string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ExecuteBinding(targetToken: string, button: string, modifiers: number): void;
    function GetBindingType(button: string, modifiers: number): Enum.ClickBindingType;
    function GetEffectiveInteractionButton(button: string, modifiers: number): string;
    function GetProfileInfo(): ClickBindingInfo[];
    function GetTutorialShown(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ResetCurrentProfile(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetProfileByInfo(infoVec: ClickBindingInfo[]): void;
    function SetTutorialShown(): void;
}

declare namespace C_ClientScene {
    function IsSceneTypeActive(desiredSceneType?: Enum.ClientSceneType): boolean;
}

declare namespace C_Club {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AcceptInvitation(clubId: string): void;
    function AddClubStreamChatChannel(clubId: string, streamId: string): void;
    function AdvanceStreamViewMarker(clubId: string, streamId: string): void;
    function AreMembersReady(clubId: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AssignMemberRole(clubId: string, memberId: string, roleId: Enum.ClubRoleIdentifier): void;
    function CanResolvePlayerLocationFromClubMessageData(clubId: string, streamId: string, epoch: number, position: number): boolean;
    function ClearAutoAdvanceStreamViewMarker(): void;
    function ClearClubPresenceSubscription(): void;
    function CompareBattleNetDisplayName(clubId: string, lhsMemberId: number, rhsMemberId: number): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CreateClub(name: string, shortName: string | undefined, description: string, clubType: Enum.ClubType, avatarId: number, isCrossFaction?: boolean): void;
    /**
     * Check the canCreateStream privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function CreateStream(clubId: string, name: string, subject: string, leadersAndModeratorsOnly: boolean): void;
    /**
     * Check canCreateTicket privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function CreateTicket(clubId: string, allowedRedeemCount?: number, duration?: number, defaultStreamId?: string, isCrossFaction?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DeclineInvitation(clubId: string): void;
    /**
     * Check the canDestroy privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function DestroyClub(clubId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DestroyMessage(clubId: string, streamId: string, messageId: ClubMessageIdentifier): void;
    /**
     * Check canDestroyStream privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function DestroyStream(clubId: string, streamId: string): void;
    /**
     * Check canDestroyTicket privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function DestroyTicket(clubId: string, ticketId: string): void;
    function DoesAnyCommunityHaveUnreadMessages(): boolean;
    function DoesCommunityHaveMembersOfTheOppositeFaction(clubId: string): boolean;
    /**
     * nil arguments will not change existing club data
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function EditClub(clubId: string, name?: string, shortName?: string, description?: string, avatarId?: number, broadcast?: string, crossFaction?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function EditMessage(clubId: string, streamId: string, messageId: ClubMessageIdentifier, message: string): void;
    /**
     * Check the canSetStreamName, canSetStreamSubject, canSetStreamAccess privileges. nil arguments will not change existing stream data.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function EditStream(clubId: string, streamId: string, name?: string, subject?: string, leadersAndModeratorsOnly?: boolean): void;
    function Flush(): void;
    function FocusCommunityStreams(): void;
    function FocusMembers(clubId: string): void;
    function FocusStream(clubId: string, streamId: string): boolean;
    function GetAssignableRoles(clubId: string, memberId: string): Enum.ClubRoleIdentifier[];
    /** listen for AVATAR_LIST_UPDATED event. This can happen if we haven't downloaded the battle.net avatar list yet */
    function GetAvatarIdList(clubType: Enum.ClubType): number[] | undefined;
    function GetClubCapacity(): number;
    function GetClubInfo(clubId: string): ClubInfo | undefined;
    function GetClubLimits(clubType: Enum.ClubType): ClubLimits;
    function GetClubMembers(clubId: string, streamId?: string): string[];
    /** The privileges for the logged in user for this club */
    function GetClubPrivileges(clubId: string): ClubPrivilegeInfo;
    function GetClubStreamNotificationSettings(clubId: string): ClubStreamNotificationSetting[];
    function GetCommunityNameResultText(result: Enum.ValidateNameResult): string | undefined;
    function GetGuildClubId(): string | undefined;
    function GetInfoFromLastCommunityChatLine(): LuaMultiReturn<[messageInfo: ClubMessageInfo | undefined, clubId: string | undefined, streamId: string | undefined, clubType: Enum.ClubType | undefined]>;
    /** Returns a list of players that you can send a request to a Battle.net club. Returns an empty list for Character based clubs */
    function GetInvitationCandidates(filter: string | undefined, maxResults: number | undefined, cursorPosition: number | undefined, allowFullMatch: boolean | undefined, clubId: string): ClubInvitationCandidateInfo[];
    /** Get info about a specific club the active player has been invited to. */
    function GetInvitationInfo(clubId: string): ClubSelfInvitationInfo | undefined;
    /** Get the pending invitations for this club. Call RequestInvitationsForClub() to retrieve invitations from server. */
    function GetInvitationsForClub(clubId: string): ClubInvitationInfo[];
    /** These are the clubs the active player has been invited to. */
    function GetInvitationsForSelf(): ClubSelfInvitationInfo[];
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetLastTicketResponse(ticket: string): LuaMultiReturn<[error: Enum.ClubErrorType | undefined, info: ClubInfo | undefined, showError: boolean | undefined]>;
    function GetMemberInfo(clubId: string, memberId: string): ClubMemberInfo | undefined;
    /** Info for the logged in user for this club */
    function GetMemberInfoForSelf(clubId: string): ClubMemberInfo | undefined;
    /** Get info about a particular message. */
    function GetMessageInfo(clubId: string, streamId: string, messageId: ClubMessageIdentifier): ClubMessageInfo | undefined;
    /** Get the ranges of the messages currently downloaded. */
    function GetMessageRanges(clubId: string, streamId: string): ClubMessageRange[];
    /** Get downloaded messages before (and including) the specified messageId limited by count. These are filtered by ignored players */
    function GetMessagesBefore(clubId: string, streamId: string, newest: ClubMessageIdentifier, count: number): ClubMessageInfo[];
    /** Get downloaded messages in the given range. These are filtered by ignored players */
    function GetMessagesInRange(clubId: string, streamId: string, oldest: ClubMessageIdentifier, newest: ClubMessageIdentifier): ClubMessageInfo[];
    function GetStreamInfo(clubId: string, streamId: string): ClubStreamInfo | undefined;
    function GetStreams(clubId: string): ClubStreamInfo[];
    function GetStreamViewMarker(clubId: string, streamId: string): number | undefined;
    function GetSubscribedClubs(): ClubInfo[];
    /** Get the existing tickets for this club. Call RequestTickets() to retrieve tickets from server. */
    function GetTickets(clubId: string): ClubTicketInfo[];
    function IsAccountMuted(clubId: string): boolean;
    /** Returns whether the given message is the first message in the stream, taking into account ignored messages */
    function IsBeginningOfStream(clubId: string, streamId: string, messageId: ClubMessageIdentifier): boolean;
    function IsEnabled(): boolean;
    function IsRestricted(): Enum.ClubRestrictionReason;
    function IsSubscribedToStream(clubId: string, streamId: string): boolean;
    /**
     * Check kickableRoleIds privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function KickMember(clubId: string, memberId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function LeaveClub(clubId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RedeemTicket(ticketId: string): void;
    /** Request invitations for this club from server. Check canGetInvitation privilege. */
    function RequestInvitationsForClub(clubId: string): void;
    /** Call this when the user scrolls near the top of the message view, and more need to be displayed. The history will be downloaded backwards (newest to oldest). */
    function RequestMoreMessagesBefore(clubId: string, streamId: string, messageId?: ClubMessageIdentifier, count?: number): boolean;
    function RequestTicket(ticketId: string): void;
    /** Request tickets from server. Check canGetTicket privilege. */
    function RequestTickets(clubId: string): void;
    /**
     * Check canRevokeOwnInvitation or canRevokeOtherInvitation
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function RevokeInvitation(clubId: string, memberId: string): void;
    function SendBattleTagFriendRequest(guildClubId: string, memberId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendCharacterInvitation(clubId: string, character: string): void;
    /**
     * Check the canSendInvitation privilege.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SendInvitation(clubId: string, memberId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendMessage(clubId: string, streamId: string, message: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendTitleFriendRequest(guildClubId: string, memberId: string): void;
    /** Only one stream can be set for auto-advance at a time. Focused streams will have their view times advanced automatically. */
    function SetAutoAdvanceStreamViewMarker(clubId: string, streamId: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetAvatarTexture(texture: Texture, avatarId: number, clubType: Enum.ClubType): void;
    /**
     * Check the canSetOwnMemberNote and canSetOtherMemberNote privileges.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetClubMemberNote(clubId: string, memberId: string, note: string): void;
    /** You can only be subscribed to 0 or 1 clubs for presence.  Subscribing to a new club automatically unsuscribes you to existing subscription. */
    function SetClubPresenceSubscription(clubId: string): void;
    function SetClubStreamNotificationSettings(clubId: string, settings: ClubStreamNotificationSetting[]): void;
    function SetCommunityID(communityID: number): void;
    function SetFavorite(clubId: string, isFavorite: boolean): void;
    function SetSocialQueueingEnabled(clubId: string, enabled: boolean): void;
    function ShouldAllowClubType(clubType: Enum.ClubType): boolean;
    function UnfocusAllStreams(unsubscribe: boolean): void;
    function UnfocusMembers(clubId: string): void;
    function UnfocusStream(clubId: string, streamId: string): void;
    function ValidateText(clubType: Enum.ClubType, text: string, clubFieldType: Enum.ClubFieldType): Enum.ValidateNameResult;
}

declare namespace C_ClubFinder {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ApplicantAcceptClubInvite(clubFinderGUID: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ApplicantDeclineClubInvite(clubFinderGUID: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CancelMembershipRequest(clubFinderGUID: string): void;
    function CheckAllPlayerApplicantSettings(): void;
    function ClearAllFinderCache(): void;
    function ClearClubApplicantsCache(): void;
    function ClearClubFinderPostingsCache(): void;
    function DoesPlayerBelongToClubFromClubGUID(clubFinderGUID: string): boolean;
    function GetClubFinderDisableReason(): Enum.ClubFinderDisableReason | undefined;
    function GetClubRecruitmentSettings(): ClubSettingsInfo;
    function GetClubTypeFromFinderGUID(clubFinderGUID: string): Enum.ClubFinderRequestType | undefined;
    function GetFocusIndexFromFlag(flags: number): number;
    function GetPlayerApplicantLocaleFlags(): number;
    function GetPlayerApplicantSettings(): ClubSettingsInfo;
    function GetPlayerClubApplicationStatus(clubFinderGUID: string): Enum.PlayerClubRequestStatus;
    function GetPlayerSettingsFocusFlagsSelectedCount(): number;
    function GetPostingIDFromClubFinderGUID(clubFinderGUID: string): number | undefined;
    function GetRecruitingClubInfoFromClubID(clubId: string): RecruitingClubInfo | undefined;
    function GetRecruitingClubInfoFromFinderGUID(clubFinderGUID: string): RecruitingClubInfo;
    function GetStatusOfPostingFromClubId(postingID: string): Enum.ClubFinderClubPostingStatusFlags[];
    function GetTotalMatchingCommunityListSize(): number;
    function GetTotalMatchingGuildListSize(): number;
    function HasAlreadyAppliedToLinkedPosting(clubFinderGUID: string): boolean;
    function HasPostingBeenDelisted(postingID: string): boolean;
    function IsCommunityFinderEnabled(): boolean;
    function IsEnabled(): boolean;
    function IsListingEnabledFromFlags(flags: number): boolean;
    function IsPostingBanned(postingID: string): boolean;
    function IsValidSearchString(name: string): boolean;
    function LookupClubPostingFromClubFinderGUID(clubFinderGUID: string, isLinkedPosting: boolean): void;
    function PlayerGetClubInvitationList(): RecruitingClubInfo[] | undefined;
    function PlayerRequestPendingClubsList(type: Enum.ClubFinderRequestType): void;
    function PlayerReturnPendingCommunitiesList(): RecruitingClubInfo[];
    function PlayerReturnPendingGuildsList(): RecruitingClubInfo[];
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PostClub(clubId: string, itemLevelRequirement: number, name: string, description: string, avatarId: number, specs: number[], type: Enum.ClubFinderRequestType, crossFaction?: boolean): boolean;
    function RequestApplicantList(type: Enum.ClubFinderRequestType): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestClubsList(guildListRequested: boolean, searchString: string, specIDs: number[]): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestMembershipToClub(clubFinderGUID: string, comment: string, specIDs: number[]): void;
    function RequestNextCommunityPage(startingIndex: number, pageSize: number): void;
    function RequestNextGuildPage(startingIndex: number, pageSize: number): void;
    function RequestPostingInformationFromClubId(clubId: string): boolean;
    function RequestSubscribedClubPostingIDs(): void;
    function ResetClubPostingMapCache(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RespondToApplicant(clubFinderGUID: string, playerGUID: string, shouldAccept: boolean, requestType: Enum.ClubFinderRequestType, playerName: string, forceAccept: boolean, reported?: boolean): void;
    function ReturnClubApplicantList(clubId: string): ClubFinderApplicantInfo[];
    function ReturnMatchingCommunityList(): RecruitingClubInfo[];
    function ReturnMatchingGuildList(): RecruitingClubInfo[];
    function ReturnPendingClubApplicantList(clubId: string): ClubFinderApplicantInfo[];
    function SendChatWhisper(clubFinderGUID: string, playerGUID: string, applicantType: Enum.ClubFinderRequestType, name: string): void;
    function SetAllRecruitmentSettings(value: number): void;
    function SetPlayerApplicantLocaleFlags(localeFlags: number): void;
    function SetPlayerApplicantSettings(index: number, checked: boolean): void;
    function SetRecruitmentLocale(locale: number): void;
    function SetRecruitmentSettings(index: number, checked: boolean): void;
    function ShouldShowClubFinder(): boolean;
}

declare namespace C_ColorOverrides {
    function ClearColorOverrides(): void;
    function GetColorForQuality(quality: Enum.ItemQuality): ColorMixin;
    function GetColorOverrideInfo(overrideType: Enum.ColorOverride): ColorOverrideInfo | undefined;
    function GetDefaultColorForQuality(quality: Enum.ItemQuality): ColorMixin;
    function RemoveColorOverride(overrideType: Enum.ColorOverride): void;
    function SetColorOverride(overrideType: Enum.ColorOverride, color: ColorMixin): void;
}

declare namespace C_ColorUtil {
    /** Converts an unpacked HSL color to HSV. */
    function ConvertHSLToHSV(hslH: number, hslS: number, hslL: number): LuaMultiReturn<[hsvH: number, hsvS: number, hsvV: number]>;
    /** Converts an unpacked HSV color to HSL. */
    function ConvertHSVToHSL(hsvH: number, hsvS: number, hsvV: number): LuaMultiReturn<[hslH: number, hslS: number, hslL: number]>;
    /** Converts an unpacked HSV color to RGB. */
    function ConvertHSVToRGB(hsvH: number, hsvS: number, hsvV: number): LuaMultiReturn<[rgbR: number, rgbG: number, rgbB: number]>;
    /** Converts an unpacked RGB color to HSV. For achromatic inputs, the returned hue will be -1. */
    function ConvertRGBToHSV(rgbR: number, rgbG: number, rgbB: number): LuaMultiReturn<[hsvH: number, hsvS: number, hsvV: number]>;
    /** Generates a hex color code suitable for use in text color code markup. */
    function GenerateTextColorCode(color: ColorMixin): string;
    /** Wraps a given string with color code markup. */
    function WrapTextInColor(text: string, color: ColorMixin): string;
    /** Wraps a given string with color code markup. */
    function WrapTextInColorCode(text: string, textColorCode: string): string;
}

declare namespace C_CombatAudioAlert {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddToKnownTargetingList(unit: UnitToken): boolean;
    function GetCategoryVoice(category: Enum.CombatAudioAlertCategory): number;
    function GetCategoryVolume(category: Enum.CombatAudioAlertCategory): number;
    function GetFormatSetting(unit: Enum.CombatAudioAlertUnit, alertType: Enum.CombatAudioAlertType): number;
    function GetSpeakerSpeed(): number;
    function GetSpecSetting(setting: Enum.CombatAudioAlertSpecSetting): number;
    function GetThrottle(throttleType: Enum.CombatAudioAlertThrottle): number;
    function IsEnabled(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RemoveFromKnownTargetingList(unit: UnitToken): boolean;
    function SetCategoryVoice(category: Enum.CombatAudioAlertCategory, newVal: number): boolean;
    function SetCategoryVolume(category: Enum.CombatAudioAlertCategory, newVal: number): boolean;
    function SetFormatSetting(unit: Enum.CombatAudioAlertUnit, alertType: Enum.CombatAudioAlertType, newVal: number): boolean;
    function SetSpeakerSpeed(newVal: number): boolean;
    function SetSpecSetting(setting: Enum.CombatAudioAlertSpecSetting, newVal: number): boolean;
    function SetThrottle(throttleType: Enum.CombatAudioAlertThrottle, newVal: number): boolean;
    function SpeakText(text: string, category: Enum.CombatAudioAlertCategory, allowOverlap?: boolean): number | undefined;
}

declare namespace C_CombatLog {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ApplyFilterSettings(filterSettings: any): void;
    function AreFilteredEventsEnabled(): boolean;
    function ClearEntries(): void;
    function DoesObjectMatchFilter(mask: Enum.CombatLogObject, flags: Enum.CombatLogObject): boolean;
    function GetEntryRetentionTime(): number;
    function GetMessageLimit(): number;
    function IsCombatLogRestricted(): boolean;
    function RefilterEntries(): void;
    function SetEntryRetentionTime(retentionTime: number): void;
    function SetFilteredEventsEnabled(enabled: boolean): void;
    function SetMessageLimit(messageLimit: number): void;
}

declare namespace C_CombatLogInternal {
    function GetCurrentEventInfo(): void;
}

declare namespace C_CombatLogSecure {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddEventFilter(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ClearEventFilters(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CreateCombatLogMessage(message: string, colorR: number, colorG: number, colorB: number, order: Enum.CombatLogMessageOrder): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetCurrentEntryInfo(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetCurrentEventInfo(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetEntryCount(ignoreFilter?: boolean): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SeekToNewestEntry(ignoreFilter?: boolean): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SeekToPreviousEntry(ignoreFilter?: boolean): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ShouldShowCurrentEntry(): boolean;
}

declare namespace C_CombatText {
    function GetActiveUnit(): string | undefined;
    function GetCurrentEventInfo(): void;
    function SetActiveUnit(unitToken: UnitToken): void;
}

declare namespace C_Commentator {
    function AddPlayerOverrideName(playerName: string, overrideName: string): void;
    function AddTrackedDefensiveAuras(spellIDs: number[]): void;
    function AddTrackedOffensiveAuras(spellIDs: number[]): void;
    function AreTeamsSwapped(): boolean;
    function AssignPlayersToTeam(playerName: string[], teamName: string): void;
    function AssignPlayersToTeamInCurrentInstance(teamIndex: number, teamName: string): void;
    function AssignPlayerToTeam(playerName: string, teamName: string): void;
    function CanUseCommentatorCheats(): boolean;
    function ClearCameraTarget(): void;
    function ClearFollowTarget(): void;
    function ClearLookAtTarget(lookAtIndex?: number): void;
    function EnterInstance(): void;
    function ExitInstance(): void;
    function FindSpectatedUnit(unitToken: UnitToken): LuaMultiReturn<[playerIndex: number | undefined, teamIndex: number | undefined, isPet: boolean | undefined]>;
    function FindTeamNameInCurrentInstance(teamIndex: number): string | undefined;
    function FindTeamNameInDirectory(playerNames: string[]): string | undefined;
    function FlushCommentatorHistory(): void;
    function FollowPlayer(factionIndex: number, playerIndex: number, forceInstantTransition?: boolean): void;
    function FollowUnit(token: string): void;
    function ForceFollowTransition(): void;
    function GetAdditionalCameraWeight(): LuaMultiReturn<[teamIndex: number, playerIndex: number]>;
    function GetAdditionalCameraWeightByToken(unitToken: UnitToken): number | undefined;
    function GetAllPlayerOverrideNames(): NameOverrideEntry[];
    function GetCamera(): LuaMultiReturn<[xPos: number | undefined, yPos: number | undefined, zPos: number | undefined, yaw: number | undefined, pitch: number | undefined, roll: number | undefined, fov: number | undefined]>;
    function GetCameraCollision(): boolean;
    function GetCameraPosition(): LuaMultiReturn<[xPos: number | undefined, yPos: number | undefined, zPos: number | undefined]>;
    function GetCombatEventInfo(): void;
    function GetCommentatorHistory(): CommentatorHistory;
    function GetCommentatorMatchDataState(): CommentatorMatchDataState;
    function GetCurrentMapID(): number | undefined;
    function GetDampeningPercent(): number;
    function GetDistanceBeforeForcedHorizontalConvergence(): number;
    function GetDurationToForceHorizontalConvergence(): number;
    function GetExcludeDistance(): number;
    function GetHardlockWeight(): number;
    function GetHorizontalAngleThresholdToSmooth(): number;
    function GetIndirectSpellID(trackedSpellID: number): number;
    function GetInstanceInfo(mapIndex: number, instanceIndex: number): LuaMultiReturn<[mapID: number | undefined, mapName: string | undefined, status: number | undefined, instanceIDLow: number | undefined, instanceIDHigh: number | undefined]>;
    function GetLookAtLerpAmount(): number;
    function GetMapInfo(mapIndex: number): LuaMultiReturn<[teamSize: number | undefined, minLevel: number | undefined, maxLevel: number | undefined, numInstances: number | undefined]>;
    function GetMatchDuration(): number;
    function GetMaxNumPlayersPerTeam(): number;
    function GetMaxNumTeams(): number;
    function GetMode(): number;
    function GetMsToHoldForHorizontalMovement(): number;
    function GetMsToHoldForVerticalMovement(): number;
    function GetMsToSmoothHorizontalChange(): number;
    function GetMsToSmoothVerticalChange(): number;
    function GetNumMaps(): number;
    function GetNumPlayers(factionIndex: number): number | undefined;
    function GetOrCreateSeries(teamName1: string, teamName2: string): CommentatorSeries;
    function GetPlayerAuraInfo(teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerAuraInfoByUnit(token: UnitToken, spellID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerCooldownInfo(teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerCooldownInfoByUnit(unitToken: UnitToken, spellID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerCrowdControlInfo(teamIndex: number, playerIndex: number): LuaMultiReturn<[spellID: number | undefined, expiration: number | undefined, duration: number | undefined]>;
    function GetPlayerCrowdControlInfoByUnit(token: UnitToken): LuaMultiReturn<[spellID: number | undefined, expiration: number | undefined, duration: number | undefined]>;
    function GetPlayerData(teamIndex: number, playerIndex: number): CommentatorPlayerData | undefined;
    function GetPlayerFlagInfo(teamIndex: number, playerIndex: number): boolean;
    function GetPlayerFlagInfoByUnit(unitToken: UnitToken): boolean;
    function GetPlayerItemCooldownInfo(teamIndex: number, playerIndex: number, itemID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerItemCooldownInfoByUnit(unitToken: UnitToken, itemID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: boolean | undefined]>;
    function GetPlayerOverrideName(originalName: string): string | undefined;
    function GetPlayerSpellCharges(teamIndex: number, playerIndex: number, spellID: number): LuaMultiReturn<[charges: number | undefined, maxCharges: number | undefined, startTime: number | undefined, duration: number | undefined]>;
    function GetPlayerSpellChargesByUnit(unitToken: UnitToken, spellID: number): LuaMultiReturn<[charges: number | undefined, maxCharges: number | undefined, startTime: number | undefined, duration: number | undefined]>;
    function GetPositionLerpAmount(): number;
    function GetSmoothFollowTransitioning(): boolean;
    function GetSoftlockWeight(): number;
    function GetSpeedFactor(): number;
    function GetStartLocation(mapID: number): Vector3DMixin | undefined;
    function GetTeamColor(teamIndex: number): ColorMixin;
    function GetTeamColorByUnit(unitToken: UnitToken): ColorMixin;
    function GetTimeLeftInMatch(): number | undefined;
    function GetTrackedSpellID(indirectSpellID: number): number;
    function GetTrackedSpells(teamIndex: number, playerIndex: number, category: Enum.TrackedSpellCategory): LuaMultiReturn<[spells: number[] | undefined, result: Enum.TrackedSpellsResult]>;
    function GetTrackedSpellsByUnit(unitToken: UnitToken, category: Enum.TrackedSpellCategory): LuaMultiReturn<[spells: number[] | undefined, result: Enum.TrackedSpellsResult]>;
    function GetUnitData(unitToken: UnitToken): CommentatorUnitData;
    function GetWargameInfo(listID: number): LuaMultiReturn<[name: string | undefined, minPlayers: number | undefined, maxPlayers: number | undefined, isArena: boolean | undefined]>;
    function HasTrackedAuras(token: UnitToken): LuaMultiReturn<[hasOffensiveAura: boolean, hasDefensiveAura: boolean]>;
    function IsSmartCameraLocked(): boolean;
    function IsSpectating(): boolean;
    function IsTrackedDefensiveAura(spellID: number): boolean;
    function IsTrackedOffensiveAura(spellID: number): boolean;
    function IsTrackedSpell(teamIndex: number, playerIndex: number, spellID: number, category: Enum.TrackedSpellCategory): boolean;
    function IsTrackedSpellByUnit(unitToken: UnitToken, spellID: number, category: Enum.TrackedSpellCategory): boolean;
    function IsUsingSmartCamera(): boolean;
    function LookAtPlayer(factionIndex: number, playerIndex: number, lookAtIndex?: number): void;
    function RemoveAllOverrideNames(): void;
    function RemovePlayerOverrideName(originalPlayerName: string): void;
    function RequestPlayerCooldownInfo(teamIndex: number, playerIndex: number): void;
    function ResetFoVTarget(): void;
    function ResetSeriesScores(teamName1: string, teamName2: string): void;
    function ResetSettings(): void;
    function ResetTrackedAuras(): void;
    /** Works the same as C_ChatInfo.SendAddonMessage but accepts secrets and is only allowed when outgoing addon comms are allowed (i.e. on tournament realms) */
    function SendAddonMessage(prefix: string, message: string, chatType?: string, target?: string): Enum.SendAddonMessageResult;
    /** Works the same as C_ChatInfo.SendAddonMessageLogged but accepts secrets and is only allowed when outgoing addon comms are allowed (i.e. on tournament realms) */
    function SendAddonMessageLogged(prefix: string, message: string, chatType?: string, target?: string): Enum.SendAddonMessageResult | undefined;
    function SetAdditionalCameraWeight(teamIndex: number, playerIndex: number, weight: number): void;
    function SetAdditionalCameraWeightByToken(unitToken: UnitToken, weight: number): void;
    function SetBlocklistedAuras(spellIDs: number[]): void;
    function SetBlocklistedCooldowns(specID: number, spellIDs: number[]): void;
    function SetBlocklistedItemCooldowns(itemIDs: number[]): void;
    function SetCamera(xPos: number, yPos: number, zPos: number, yaw: number, pitch: number, roll: number, fov: number): void;
    function SetCameraCollision(collide: boolean): void;
    function SetCameraPosition(xPos: number, yPos: number, zPos: number, snapToLocation: boolean): void;
    function SetCheatsEnabled(enableCheats: boolean): void;
    function SetCommentatorHistory(history: CommentatorHistory): void;
    function SetDistanceBeforeForcedHorizontalConvergence(distance: number): void;
    function SetDurationToForceHorizontalConvergence(ms: number): void;
    function SetExcludeDistance(excludeDistance: number): void;
    function SetFollowCameraSpeeds(elasticSpeed: number, minSpeed: number): void;
    function SetHardlockWeight(weight: number): void;
    function SetHorizontalAngleThresholdToSmooth(angle: number): void;
    function SetLookAtLerpAmount(amount: number): void;
    function SetMapAndInstanceIndex(mapIndex: number, instanceIndex: number): void;
    function SetMouseDisabled(disabled: boolean): void;
    function SetMoveSpeed(newSpeed: number): void;
    function SetMsToHoldForHorizontalMovement(ms: number): void;
    function SetMsToHoldForVerticalMovement(ms: number): void;
    function SetMsToSmoothHorizontalChange(ms: number): void;
    function SetMsToSmoothVerticalChange(ms: number): void;
    function SetPositionLerpAmount(amount: number): void;
    function SetRequestedDebuffCooldowns(specID: number, spellIDs: number[]): void;
    function SetRequestedDefensiveCooldowns(specID: number, spellIDs: number[]): void;
    function SetRequestedItemCooldowns(itemIDs: number[]): void;
    function SetRequestedOffensiveCooldowns(specID: number, spellIDs: number[]): void;
    function SetSeriesScore(teamName1: string, teamName2: string, scoringTeamName: string, score: number): void;
    function SetSeriesScores(teamName1: string, teamName2: string, score1: number, score2: number): void;
    function SetSmartCameraLocked(locked: boolean): void;
    function SetSmoothFollowTransitioning(enabled: boolean): void;
    function SetSoftlockWeight(weight: number): void;
    function SetSpeedFactor(factor: number): void;
    function SetTargetHeightOffset(offset: number): void;
    function SetUseSmartCamera(useSmartCamera: boolean): void;
    function SnapCameraLookAtPoint(): void;
    function SpellUsesItemCharges(spellID: number): boolean;
    function StartWargame(listID: number, teamSize: number, tournamentRules: boolean, teamOneCaptain: string, teamTwoCaptain: string): void;
    function SwapTeamSides(): void;
    function ToggleCheats(): void;
    function UpdateMapInfo(targetPlayer?: string): void;
    function UpdatePlayerInfo(): void;
    function ZoomIn(): void;
    function ZoomIn_Position(zoomAmount?: number): void;
    function ZoomOut(): void;
    function ZoomOut_Position(zoomAmount?: number): void;
}

declare namespace C_ConfigurationWarnings {
    function GetConfigurationWarnings(includeSeenWarnings?: boolean): Enum.ConfigurationWarning[];
    function GetConfigurationWarningSeen(configurationWarning: Enum.ConfigurationWarning): boolean;
    function GetConfigurationWarningString(configurationWarning: Enum.ConfigurationWarning): string | undefined;
    function SetConfigurationWarningSeen(configurationWarning: Enum.ConfigurationWarning): void;
}

declare namespace C_ConsoleScriptCollection {
    function GetCollectionDataByID(collectionID: number): ConsoleScriptCollectionData | undefined;
    function GetCollectionDataByTag(collectionTag: string): ConsoleScriptCollectionData | undefined;
    function GetElements(collectionID: number): ConsoleScriptCollectionElementData[];
    function GetScriptData(consoleScriptID: number): ConsoleScriptData;
}

declare namespace C_Container {
    function CalculateTotalNumberOfFreeBagSlots(): number;
    function ContainerIDToInventoryID(containerID: Enum.BagIndex): number | undefined;
    function ContainerRefundItemPurchase(containerIndex: Enum.BagIndex, slotIndex: number, isEquipped?: boolean): void;
    function GetBackpackAutosortDisabled(): boolean;
    function GetBackpackSellJunkDisabled(): boolean;
    function GetBagName(bagIndex: Enum.BagIndex): string;
    function GetBagSlotFlag(bagIndex: Enum.BagIndex, flag: Enum.BagSlotFlags): boolean;
    function GetBankAutosortDisabled(): boolean;
    function GetContainerFreeSlots(containerIndex: Enum.BagIndex): number[] | undefined;
    function GetContainerItemCooldown(containerIndex: Enum.BagIndex, slotIndex: number): LuaMultiReturn<[startTime: number, duration: number, enable: number]>;
    function GetContainerItemDurability(containerIndex: Enum.BagIndex, slotIndex: number): LuaMultiReturn<[durability: number | undefined, maxDurability: number | undefined]>;
    function GetContainerItemEquipmentSetInfo(containerIndex: Enum.BagIndex, slotIndex: number): LuaMultiReturn<[inSet: boolean, setList: string]>;
    function GetContainerItemID(containerIndex: Enum.BagIndex, slotIndex: number): number | undefined;
    function GetContainerItemInfo(containerIndex: Enum.BagIndex, slotIndex: number): ContainerItemInfo | undefined;
    function GetContainerItemLink(containerIndex: Enum.BagIndex, slotIndex: number): string;
    function GetContainerItemPurchaseCurrency(containerIndex: Enum.BagIndex, slotIndex: number, itemIndex: number, isEquipped: boolean): ItemPurchaseCurrency | undefined;
    function GetContainerItemPurchaseInfo(containerIndex: Enum.BagIndex, slotIndex: number, isEquipped: boolean): ItemPurchaseInfo | undefined;
    function GetContainerItemPurchaseItem(containerIndex: Enum.BagIndex, slotIndex: number, itemIndex: number, isEquipped: boolean): ItemPurchaseItem | undefined;
    function GetContainerItemQuestInfo(containerIndex: Enum.BagIndex, slotIndex: number): ItemQuestInfo;
    function GetContainerNumFreeSlots(bagIndex: Enum.BagIndex): LuaMultiReturn<[numFreeSlots: number, bagFamily: number | undefined]>;
    function GetContainerNumSlots(containerIndex: Enum.BagIndex): number;
    function GetInsertItemsLeftToRight(): boolean;
    function GetItemCooldown(itemID: number): LuaMultiReturn<[startTime: number | undefined, duration: number | undefined, enable: number | undefined]>;
    function GetMaxArenaCurrency(): number;
    function GetSortBagsRightToLeft(): boolean;
    function HasContainerItem(containerIndex: Enum.BagIndex, slotIndex: number): boolean;
    function IsBattlePayItem(containerIndex: Enum.BagIndex, slotIndex: number): boolean;
    function IsContainerFiltered(containerIndex: Enum.BagIndex): boolean;
    function PickupContainerItem(containerIndex: Enum.BagIndex, slotIndex: number): void;
    function PlayerHasHearthstone(): number | undefined;
    function SetBackpackAutosortDisabled(disable: boolean): void;
    function SetBackpackSellJunkDisabled(disable: boolean): void;
    function SetBagPortraitTexture(texture: Texture, bagIndex: Enum.BagIndex): void;
    function SetBagSlotFlag(bagIndex: Enum.BagIndex, flag: Enum.BagSlotFlags, isSet: boolean): void;
    function SetBankAutosortDisabled(disable: boolean): void;
    function SetInsertItemsLeftToRight(enable: boolean): void;
    function SetItemSearch(searchString: string): void;
    function SetSortBagsRightToLeft(enable: boolean): void;
    function ShowContainerSellCursor(containerIndex: Enum.BagIndex, slotIndex: number): void;
    function SocketContainerItem(containerIndex: Enum.BagIndex, slotIndex: number): boolean;
    function SortAccountBankBags(): void;
    function SortBags(): void;
    function SortBank(bankType: Enum.BankType): void;
    function SortBankBags(): void;
    function SplitContainerItem(containerIndex: Enum.BagIndex, slotIndex: number, amount: number): void;
    function UseContainerItem(containerIndex: Enum.BagIndex, slotIndex: number, unitToken?: UnitToken, bankType?: Enum.BankType, reagentBankOpen?: boolean): void;
    function UseHearthstone(): boolean;
}

declare namespace C_ContentTracking {
    function GetBestMapForTrackable(trackableType: Enum.ContentTrackingType, trackableID: number, ignoreWaypoint?: boolean): LuaMultiReturn<[result: Enum.ContentTrackingResult, mapID: number | undefined]>;
    function GetCollectableSourceTrackingEnabled(): boolean;
    function GetCollectableSourceTypes(): Enum.ContentTrackingType[];
    function GetCurrentTrackingTarget(type: Enum.ContentTrackingType, id: number): LuaMultiReturn<[targetType: Enum.ContentTrackingTargetType | undefined, targetID: number | undefined]>;
    function GetEncounterTrackingInfo(journalEncounterID: number): EncounterTrackingInfo | undefined;
    function GetNextWaypointForTrackable(trackableType: Enum.ContentTrackingType, trackableID: number, uiMapID: number): LuaMultiReturn<[result: Enum.ContentTrackingResult, mapInfo: ContentTrackingMapInfo | undefined]>;
    function GetObjectiveText(targetType: Enum.ContentTrackingTargetType, targetID: number, includeHyperlinks?: boolean): string | undefined;
    function GetTitle(trackableType: Enum.ContentTrackingType, trackableID: number): string | undefined;
    function GetTrackablesOnMap(trackableType: Enum.ContentTrackingType, uiMapID: number): LuaMultiReturn<[result: Enum.ContentTrackingResult, trackableMapInfos: ContentTrackingMapInfo[]]>;
    function GetTrackedIDs(trackableType: Enum.ContentTrackingType): number[];
    function GetVendorTrackingInfo(collectableEntryID: number): VendorTrackingInfo | undefined;
    function GetWaypointText(trackableType: Enum.ContentTrackingType, trackableID: number): string | undefined;
    /** If successful, returns if the trackable is either on your current map, or if we're able to determine a route to that map from your location via waypoints. */
    function IsNavigable(trackableType: Enum.ContentTrackingType, trackableID: number): LuaMultiReturn<[result: Enum.ContentTrackingResult, isNavigable: boolean]>;
    function IsTrackable(type: Enum.ContentTrackingType, id: number): boolean;
    function IsTracking(type: Enum.ContentTrackingType, id: number): boolean;
    function StartTracking(type: Enum.ContentTrackingType, id: number): Enum.ContentTrackingError | undefined;
    function StopTracking(type: Enum.ContentTrackingType, id: number, stopType: Enum.ContentTrackingStopType): void;
    function ToggleTracking(type: Enum.ContentTrackingType, id: number, stopType: Enum.ContentTrackingStopType): Enum.ContentTrackingError | undefined;
}

declare namespace C_ContributionCollector {
    function Close(): void;
    function Contribute(contributionID: number): void;
    function GetActive(): LuaMultiReturn<[...contributionID: (number)[]]>;
    function GetAtlases(contributionID: number): string[];
    function GetBuffs(contributionID: number): LuaMultiReturn<[...spellID: (number)[]]>;
    function GetContributionAppearance(contributionID: number, contributionState: Enum.ContributionState): ContributionAppearance | undefined;
    function GetContributionCollectorsForMap(uiMapID: number): ContributionMapInfo[];
    function GetContributionResult(contributionID: number): Enum.ContributionResult;
    function GetDescription(contributionID: number): string;
    function GetManagedContributionsForCreatureID(creatureID: number): LuaMultiReturn<[...contributionID: (number)[]]>;
    function GetName(contributionID: number): string;
    function GetOrderIndex(contributionID: number): number;
    function GetRequiredContributionCurrency(contributionID: number): LuaMultiReturn<[currencyID: number | undefined, currencyAmount: number | undefined]>;
    function GetRequiredContributionItem(contributionID: number): LuaMultiReturn<[itemID: number | undefined, itemCount: number | undefined]>;
    function GetRewardQuestID(contributionID: number): number;
    function GetState(contributionID: number): LuaMultiReturn<[contributionState: Enum.ContributionState, contributionPercentageComplete: number, timeOfNextStateChange: number | undefined, startTime: number]>;
    function HasPendingContribution(contributionID: number): boolean;
    function IsAwaitingRewardQuestData(contributionID: number): boolean;
}

declare namespace C_CooldownViewer {
    function GetCooldownViewerCategorySet(category: Enum.CooldownViewerCategory, allowUnlearned?: boolean): number[];
    function GetCooldownViewerCooldownInfo(cooldownID: number): CooldownViewerCooldown | undefined;
    function GetGroupBuffItems(): GroupBuffItem[];
    function GetLayoutData(): string;
    function GetValidAlertTypes(cooldownID: number): Enum.CooldownViewerAlertEventType[];
    function IsCooldownViewerAvailable(): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;
    function SetLayoutData(data: string): void;
}

declare namespace C_CovenantCallings {
    function AreCallingsUnlocked(): boolean;
    function RequestCallings(): void;
}

declare namespace C_CovenantPreview {
    function CloseFromUI(): void;
    function GetCovenantInfoForPlayerChoiceResponseID(playerChoiceResponseID: number): CovenantPreviewInfo | undefined;
}

declare namespace C_Covenants {
    function GetActiveCovenantID(): number;
    function GetCovenantData(covenantID: number): CovenantData | undefined;
    function GetCovenantIDs(): number[];
}

declare namespace C_CovenantSanctumUI {
    function CanAccessReservoir(): boolean;
    function CanDepositAnima(): boolean;
    function DepositAnima(): void;
    function EndInteraction(): void;
    function GetAnimaInfo(): LuaMultiReturn<[currencyID: number, maxDisplayableValue: number]>;
    function GetCurrentTalentTreeID(): number | undefined;
    function GetFeatures(): CovenantSanctumFeatureInfo[];
    function GetRenownLevel(): number;
    function GetRenownLevels(covenantID: number): CovenantSanctumRenownLevelInfo[];
    function GetRenownRewardsForLevel(covenantID: number, renownLevel: number): CovenantSanctumRenownRewardInfo[];
    function GetSanctumType(): Enum.GarrTalentFeatureSubtype | undefined;
    function GetSoulCurrencies(): number[];
    function HasMaximumRenown(): boolean;
    function IsPlayerInRenownCatchUpMode(): boolean;
    function IsWeeklyRenownCapped(): boolean;
    function RequestCatchUpState(): void;
}

declare namespace C_CraftingOrders {
    function AreOrderNotesDisabled(): boolean;
    function CalculateCraftingOrderPostingFee(skillLineAbilityID: number, orderType: Enum.CraftingOrderType, orderDuration: Enum.CraftingOrderDuration): number;
    function CancelOrder(orderID: number): void;
    function CanOrderSkillAbility(skillLineAbilityID: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ClaimOrder(orderID: number, profession: Enum.Profession): void;
    function CloseCrafterCraftingOrders(): void;
    function CloseCustomerCraftingOrders(): void;
    function FulfillOrder(orderID: number, crafterNote: string, profession: Enum.Profession): void;
    function GetClaimedOrder(): CraftingOrderInfo | undefined;
    function GetCrafterBuckets(): CraftingOrderBucketInfo[];
    function GetCrafterOrders(): CraftingOrderInfo[];
    function GetCraftingOrderTime(): number;
    function GetCustomerCategories(): CraftingOrderCustomerCategory[];
    function GetCustomerOptions(params: CraftingOrderCustomerSearchParams): CraftingOrderCustomerSearchResults;
    function GetCustomerOrders(): CraftingOrderInfo[];
    function GetDefaultOrdersSkillLine(): number | undefined;
    function GetMyOrders(): CraftingOrderInfo[];
    function GetNumFavoriteCustomerOptions(): number;
    function GetOrderClaimInfo(profession: Enum.Profession): CraftingOrderClaimsRemainingInfo;
    function GetPersonalOrdersInfo(): CraftingOrderPersonalOrdersInfo[];
    function HasFavoriteCustomerOptions(): boolean;
    function IsCustomerOptionFavorited(recipeID: number): boolean;
    function ListMyOrders(request: CraftingOrderRequestMyOrdersInfo): void;
    function OpenCrafterCraftingOrders(): void;
    function OpenCustomerCraftingOrders(): void;
    function OrderCanBeRecrafted(orderID: number): boolean;
    function ParseCustomerOptions(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PlaceNewOrder(orderInfo: NewCraftingOrderInfo): void;
    function RejectOrder(orderID: number, crafterNote: string, profession: Enum.Profession): void;
    function ReleaseOrder(orderID: number, profession: Enum.Profession): void;
    function RequestCrafterOrders(request: CraftingOrderRequestInfo): void;
    function RequestCustomerOrders(request: CraftingOrderRequestInfo): void;
    function SetCustomerOptionFavorited(recipeID: number, favorited: boolean): void;
    function ShouldShowCraftingOrderTab(): boolean;
    function SkillLineHasOrders(skillLineID: number): boolean;
    function UpdateIgnoreList(): void;
}

declare namespace C_CreatureInfo {
    function GetClassInfo(classID: number): ClassInfo | undefined;
    function GetCreatureFamilyIDs(): number[];
    function GetCreatureFamilyInfo(creatureFamilyID: number): CreatureFamilyInfo | undefined;
    function GetCreatureID(creatureGUID: string): number | undefined;
    function GetCreatureTypeIDs(): number[];
    function GetCreatureTypeInfo(creatureTypeID: number): CreatureTypeInfo | undefined;
    function GetFactionInfo(raceID: number): FactionInfo | undefined;
    function GetRaceInfo(raceID: number): RaceInfo | undefined;
}

declare namespace C_CurrencyInfo {
    function CanTransferCurrency(currencyID: number): LuaMultiReturn<[canTransferCurrency: boolean, failureReason: Enum.AccountCurrencyTransferResult | undefined]>;
    function DoesCurrentFilterRequireAccountCurrencyData(): boolean;
    function DoesWarModeBonusApply(currencyID: number): LuaMultiReturn<[warModeApplies: boolean | undefined, limitOncePerTooltip: boolean | undefined]>;
    function ExpandCurrencyList(index: number, expand: boolean): void;
    function FetchCurrencyDataFromAccountCharacters(currencyID: number): CharacterCurrencyData[] | undefined;
    function FetchCurrencyTransferTransactions(): CurrencyTransferTransaction[];
    function GetAzeriteCurrencyID(): number;
    function GetBackpackCurrencyInfo(index: number): BackpackCurrencyInfo | undefined;
    function GetBasicCurrencyInfo(currencyType: number, quantity?: number): CurrencyDisplayInfo | undefined;
    function GetCoinIcon(amount: number): number;
    function GetCoinText(amount: number, separator?: string): string;
    function GetCoinTextureString(amount: number, fontHeight?: number): string;
    function GetCostToTransferCurrency(currencyID: number, quantity: number): number | undefined;
    function GetCurrencyContainerInfo(currencyType: number, quantity: number): CurrencyDisplayInfo | undefined;
    function GetCurrencyDescription(type: number): string;
    function GetCurrencyFilter(): Enum.CurrencyFilterType;
    function GetCurrencyIDFromLink(currencyLink: string): number;
    function GetCurrencyInfo(type: number): CurrencyInfo | undefined;
    function GetCurrencyInfoFromLink(link: string): CurrencyInfo | undefined;
    function GetCurrencyLink(type: number, amount?: number): string;
    function GetCurrencyListInfo(index: number): CurrencyInfo | undefined;
    function GetCurrencyListLink(index: number): string;
    function GetCurrencyListSize(): number;
    function GetDragonIslesSuppliesCurrencyID(): number;
    /** Gets the faction ID for currency that is immediately converted into reputation with that faction instead. */
    function GetFactionGrantedByCurrency(currencyID: number): number | undefined;
    function GetMaxTransferableAmountFromQuantity(currencyID: number, requestedQuantity: number): number | undefined;
    function GetPlayerCurrencyCategoryInfo(categoryID: number, includeAccountWide?: boolean): PlayerCurrencyCategoryInfo;
    function GetWarResourcesCurrencyID(): number;
    function IsAccountCharacterCurrencyDataReady(): boolean;
    function IsAccountTransferableCurrency(currencyID: number): boolean;
    function IsAccountWideCurrency(currencyID: number): boolean;
    function IsCurrencyContainer(currencyID: number, quantity: number): boolean;
    function IsCurrencyTransferInProgress(): boolean;
    function IsCurrencyTransferTransactionDataReady(): boolean;
    function PickupCurrency(type: number): void;
    function PlayerHasMaxQuantity(currencyID: number): boolean;
    function PlayerHasMaxWeeklyQuantity(currencyID: number): boolean;
    function RequestCurrencyDataForAccountCharacters(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestCurrencyFromAccountCharacter(sourceCharacterGUID: string, currencyID: number, quantity: number): void;
    function SetCurrencyBackpack(index: number, backpack: boolean): void;
    function SetCurrencyBackpackByID(currencyType: number, backpack: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetCurrencyFilter(filterType: Enum.CurrencyFilterType): void;
    function SetCurrencyUnused(index: number, unused: boolean): void;
}

declare namespace C_Cursor {
    function GetCursorItem(): ItemLocationMixin | undefined;
}

declare namespace C_CurveUtil {
    /** Returns a new color curve object with no assigned points. */
    function CreateColorCurve(): LuaColorCurveObject;
    /** Returns a new curve object with no assigned points. */
    function CreateCurve(): LuaCurveObject;
    /** Evaluates a potentially-secret boolean value and returns a color. */
    function EvaluateColorFromBoolean(boolean: boolean, valueIfTrue: ColorMixin, valueIfFalse: ColorMixin): ColorMixin;
    /** Evaluates a potentially-secret boolean value and returns a single color component (eg. alpha). */
    function EvaluateColorValueFromBoolean(boolean: boolean, valueIfTrue: number, valueIfFalse: number): number;
    function EvaluateGameCurve(curveID: number, x: number): number;
}

declare namespace C_CVar {
    function AreCVarsLoaded(): boolean;
    function GetCVar(name: string): string | undefined;
    function GetCVarBitfield(name: string, index: number): boolean | undefined;
    function GetCVarBool(name: string): boolean | undefined;
    function GetCVarDefault(name: string): string | undefined;
    function GetCVarInfo(name: string): LuaMultiReturn<[value: string, defaultValue: string, isStoredServerAccount: boolean, isStoredServerCharacter: boolean, isLockedFromUser: boolean, isSecure: boolean, isReadOnly: boolean]>;
    function RegisterCVar(name: string, value?: string): void;
    function RemoveTempCVar(name: string): void;
    function ResetTestCVars(): void;
    function SetCVar(name: string, value?: string): boolean;
    function SetCVarBitfield(name: string, index: number, value: boolean): boolean;
    function SetTempCVar(name: string, value?: string): void;
}

declare namespace C_DamageMeter {
    /** Returns a list of combat sessions currently being tracked. */
    function GetAvailableCombatSessions(): DamageMeterAvailableCombatSession[];
    /** Returns the data for the player's combat session with the specified ID. */
    function GetCombatSessionFromID(sessionID: number, type: Enum.DamageMeterType): DamageMeterCombatSession;
    /** Returns the data for the player's current combat session. */
    function GetCombatSessionFromType(sessionType: Enum.DamageMeterSessionType, type: Enum.DamageMeterType): DamageMeterCombatSession;
    /** Returns the data for a single source (unit) in the player's current combat session with the specified ID. */
    function GetCombatSessionSourceFromID(sessionID: number, type: Enum.DamageMeterType, sourceGUID?: string, sourceCreatureID?: number): DamageMeterCombatSessionSource;
    /** Returns the data for a single source (unit) in the player's current combat session. */
    function GetCombatSessionSourceFromType(sessionType: Enum.DamageMeterSessionType, type: Enum.DamageMeterType, sourceGUID?: string, sourceCreatureID?: number): DamageMeterCombatSessionSource;
    /** Returns the amount of time a combat session has lasted */
    function GetSessionDurationSeconds(sessionType: Enum.DamageMeterSessionType): number | undefined;
    /** Returns whether the player can enable and use the Damage Meter. */
    function IsDamageMeterAvailable(): LuaMultiReturn<[isAvailable: boolean, failureReason: string]>;
    /** Clears the data for all the player's combat sessions. */
    function ResetAllCombatSessions(): void;
}

declare namespace C_DateAndTime {
    function AdjustTimeByDays(date: CalendarTime, days: number): CalendarTime;
    function AdjustTimeByMinutes(date: CalendarTime, minutes: number): CalendarTime;
    function AdjustTimeByMonths(date: CalendarTime, months: number): CalendarTime;
    function CompareCalendarTime(lhsCalendarTime: CalendarTime, rhsCalendarTime: CalendarTime): number;
    function GetCalendarTimeFromEpoch(epoch: number): CalendarTime;
    function GetCurrentCalendarTime(): CalendarTime;
    function GetSecondsUntilDailyReset(): number;
    function GetSecondsUntilWeeklyReset(): number;
    function GetServerTimeLocal(): number;
    function GetWeeklyResetStartTime(): number;
    function IsDayTime(): boolean;
}

declare namespace C_DeathInfo {
    function GetCorpseMapPosition(uiMapID: number): Vector2DMixin | undefined;
    function GetDeathReleasePosition(uiMapID: number): Vector2DMixin | undefined;
    function GetGraveyardsForMap(uiMapID: number): GraveyardMapInfo[];
    function GetSelfResurrectOptions(): SelfResurrectOption[] | undefined;
    function UseSelfResurrectOption(optionType: Enum.SelfResurrectOptionType, id: number): void;
}

declare namespace C_DeathRecap {
    function GetRecapEvents(recapID?: number): DeathRecapEventInfo[];
    function GetRecapLink(recapID?: number): string;
    /** Returns the max health for the unit that died in the provided death recap. */
    function GetRecapMaxHealth(recapID?: number): number;
    function HasRecapEvents(recapID?: number): boolean;
}

declare namespace C_DelvesUI {
    /** Returns the entrance tier information for the active Delve (via party data). Assumes only Delves use this type for now. */
    function GetActiveDelveTier(): TieredEntranceTierInfo;
    function GetCompanionInfoForActivePlayer(): number;
    function GetCreatureDisplayInfoForCompanion(companionID?: number): number;
    /** Given the spell ID for an owned curio and its rarity, return a spell link style hyperlink for the curio spell, since they aren't items when learned */
    function GetCurioLink(spellID: number | string, rarity: Enum.CurioRarity): string;
    function GetCurioNodeForCompanion(curioType: Enum.CurioType, companionID?: number): number;
    function GetCurioRarityByTraitCondAccountElementID(traitCondAccountElementID: number): Enum.CurioRarity;
    function GetCurrentDelvesSeasonNumber(): number;
    function GetDelveEntranceBackgroundWidgetSetID(): number;
    function GetDelveEntranceDescriptionString(): string | undefined;
    function GetDelveEntranceHeaderString(): string | undefined;
    function GetDelveEntranceMapID(): number;
    function GetDelveEntranceTiers(): TieredEntranceTierInfo[];
    function GetDelveEntranceTitleString(): string | undefined;
    function GetDelvesAffixSpellsForSeason(): number[];
    function GetDelvesFactionForSeason(): number;
    /** Players must be at or above the min level + offset to enter Delves. This function returns that min level. */
    function GetDelvesMinRequiredLevel(): number | undefined;
    function GetFactionForCompanion(companionID?: number): number;
    function GetFlavorNodeForCompanion(companionID?: number): number;
    function GetFlavorNodeNameForCompanion(companionID?: number): string;
    function GetLockedTextForCompanion(companionID?: number): string;
    function GetModelSceneForCompanion(companionID?: number): number;
    function GetPlayerCompanionPDEID(companionID?: number): number | undefined;
    function GetRoleNodeForCompanion(companionID?: number): number;
    function GetRoleSubtreeForCompanion(roleType: Enum.CompanionRoleType, companionID?: number): number;
    function GetTieredEntranceOptionalAffixTraitTreeID(): number | undefined;
    function GetTieredEntrancePDEID(): number;
    function GetTieredEntranceType(): Enum.TieredEntranceType;
    function GetTraitTreeForCompanion(companionID?: number): number;
    function GetUnseenCuriosBySlotType(slotType: Enum.CompanionConfigSlotTypes, ownedCurioNodeIDs: number[]): number[];
    function GetWorldTierDifficultyForActivePlayer(): Enum.WorldTierDifficulty;
    function HasActiveDelve(): boolean;
    function HasActiveLair(): boolean;
    function HasActiveLFGLair(): boolean;
    function IsDelveEntranceTierEnabled(tier: number): LuaMultiReturn<[isEnabled: boolean, failureReason: string | undefined]>;
    function IsEligibleForActiveDelveRewards(unit: UnitToken): boolean;
    function IsInLair(): boolean;
    function IsTraitTreeForCompanion(traitTreeID: number): boolean;
    /** Queries private party members to see what level they have unlocked for the Delve. Ineligible members are added to the tooltip of dropdown entries. */
    function RequestPartyEligibilityForDelveTiers(mapID: number): void;
    function SaveSeenCuriosBySlotType(slotType: Enum.CompanionConfigSlotTypes, ownedCurioNodeIDs: number[]): void;
    function SelectDelveEntranceTier(tier: number): void;
}

declare namespace C_Discord {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function Authorize(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetDiscordChannelName(serverIndex: number, channelIndex: number): string;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetDiscordUserID(): DiscordMemberOpaqueID;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetDiscordUserName(userID: DiscordMemberOpaqueID): string;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetDisplayNameType(): Enum.DiscordDisplayNameType;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetGuildLinkStatus(): LuaMultiReturn<[isFullyLinked: boolean, linkedChannelName: string, linkedServerName: string]>;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetNumDiscordChannels(serverIndex: number): LuaMultiReturn<[count: number, valid: boolean]>;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetNumDiscordServers(): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetServerLinkableChannels(index: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetServerName(index: number): string;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GuildLink(serverIndex: number, channelIndex: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GuildUnlink(): void;
    function IsEnabled(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function IsGuildChannelLinked(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function IsGuildSettingSet(setting: Enum.DiscordGuildSettings): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function IsUserOAuthed(): boolean;
    function IsVoiceEnabled(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RefreshAuth(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetGuildSetting(setting: Enum.DiscordGuildSettings, set: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function UpdateDiscordServers(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function UpdateGuildLobby(): void;
}

declare namespace C_DurationUtil {
    /** Creates a zero duration container that can represent a time span. */
    function CreateDuration(): LuaDurationObject;
    /** Creates a duration text binding, which automatically updates a font string with formatted text derived from a duration object. */
    function CreateDurationTextBinding(): DurationTextBindingObject;
    /** Creates a manually driven time source for use with duration objects. */
    function CreateManualClock(): LuaDurationManualClock;
}

declare namespace C_DyeColor {
    function GetAllDyeColorCategories(): number[];
    function GetAllDyeColors(ownedColorsOnly?: boolean): number[];
    function GetDyeColorCategoryInfo(dyeColorCategoryID: number): DyeColorCategoryDisplayInfo | undefined;
    function GetDyeColorInfo(dyeColorID: number): DyeColorDisplayInfo | undefined;
    function GetDyeColorsForItem(itemLinkOrID: ItemInfo): number[];
    function GetDyeColorsForItemLocation(itemLocation: ItemLocationMixin): number[];
    function GetDyeColorsInCategory(dyeColorCategory: number, ownedColorsOnly?: boolean): number[];
    /** True if the player owns any of the consumable item used to apply the specified dye */
    function IsDyeColorOwned(dyeColorID: number): boolean;
}

declare namespace C_EditMode {
    function ConvertLayoutInfoToString(layoutInfo: EditModeLayoutInfo): string;
    function ConvertStringToLayoutInfo(layoutInfoAsString: string): EditModeLayoutInfo | undefined;
    function GetAccountSettings(): EditModeSettingInfo[];
    function GetEditModeDefaultLayout(): number;
    function GetLayouts(): EditModeLayouts;
    function IsValidLayoutName(name: string): boolean;
    function OnEditModeExit(): void;
    function OnLayoutAdded(addedLayoutIndex: number, activateNewLayout: boolean, isLayoutImported: boolean): void;
    function OnLayoutDeleted(deletedLayoutIndex: number): void;
    function SaveLayouts(saveInfo: EditModeLayouts): void;
    function SetAccountSetting(setting: Enum.EditModeAccountSetting, value: number): void;
    function SetActiveLayout(activeLayout: number): void;
}

declare namespace C_EncodingUtil {
    function CompressString(source: string, method?: Enum.CompressionMethod, level?: Enum.CompressionLevel): string | undefined;
    function DecodeBase64(source: string, variant?: Enum.Base64Variant): string | undefined;
    function DecodeHex(source: string): string | undefined;
    function DecompressString(source: string, method?: Enum.CompressionMethod): string | undefined;
    function DeserializeCBOR(source: string): any | undefined;
    function DeserializeJSON(source: string): any | undefined;
    function EncodeBase64(source: string, variant?: Enum.Base64Variant): string | undefined;
    function EncodeHex(source: string): string | undefined;
    function SerializeCBOR(value?: any, options?: CBORSerializationOptions): string;
    function SerializeJSON(value?: any, options?: JSONSerializationOptions): string;
}

declare namespace C_EncounterEvents {
    /** Returns any custom color override applied for an encounter event. */
    function GetEventColor(encounterEventID: number, trigger: Enum.EncounterEventColorTrigger): ColorMixin | undefined;
    /** Returns information about an encounter event. */
    function GetEventInfo(encounterEventID: number): EncounterEventInfo | undefined;
    /** Returns a list of all encounter event IDs. */
    function GetEventList(): number[];
    /** Returns information on a custom sound file to be played when an encounter event trigger occurs. */
    function GetEventSound(encounterEventID: number, trigger: Enum.EncounterEventSoundTrigger): EncounterEventSoundInfo | undefined;
    /** Returns true if an encounter event record with a specified ID exists. */
    function HasEventInfo(encounterEventID: number): boolean;
    /** Plays any registered custom sound file for a given encounter event trigger. */
    function PlayEventSound(encounterEventID: number, trigger: Enum.EncounterEventSoundTrigger): number;
    /** Sets a custom color override for an encounter event. This can be used to colorize text or timer bars individually. */
    function SetEventColor(encounterEventID: number, trigger: Enum.EncounterEventColorTrigger, color?: ColorMixin): void;
    /** Sets a custom sound file to be played when an encounter event trigger occurs. */
    function SetEventSound(encounterEventID: number, trigger: Enum.EncounterEventSoundTrigger, sound?: EncounterEventSoundInfo): void;
}

declare namespace C_EncounterJournal {
    function GetBaseDifficultyID(difficultyID: number): number;
    function GetDungeonEntrancesForMap(uiMapID: number): DungeonEntranceMapInfo[];
    function GetEncounterJournalLink(linkType: Enum.JournalLinkTypes, ID: number, displayText: string, difficultyID: number): string;
    function GetEncountersOnMap(uiMapID: number): EncounterJournalMapEncounterInfo[];
    /** GameMap as opposed to UIMap since we use a mapID not a uiMapID. */
    function GetInstanceForGameMap(mapID: number): number | undefined;
    function GetLootInfo(id: number): EncounterJournalItemInfo;
    function GetLootInfoByIndex(index: number, encounterIndex?: number): EncounterJournalItemInfo | undefined;
    /** Represents the icon indices for this EJ section.  An icon index can be used to arrive at texture coordinates for specific encounter types, e.g.: EncounterJournal_SetFlagIcon */
    function GetSectionIconFlags(sectionID: number): number[] | undefined;
    function GetSectionInfo(sectionID: number): EncounterJournalSectionInfo | undefined;
    function GetSlotFilter(): Enum.ItemSlotFilterType;
    function InitalizeSelectedTier(): void;
    function InstanceHasDifficultyID(difficultyID: number): boolean;
    function InstanceHasLoot(instanceID?: number): boolean;
    function IsEncounterComplete(journalEncounterID: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnClose(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnOpen(): void;
    function ResetSlotFilter(): void;
    function SetPreviewMythicPlusLevel(level: number): void;
    function SetPreviewPvpTier(tier: number): void;
    function SetSlotFilter(filterSlot: Enum.ItemSlotFilterType): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetTab(tabIdx: number): void;
    function StartArathiRPE(): void;
}

declare namespace C_EncounterTimeline {
    /** Adds a predefined set of events to the timeline for display in Edit Mode. */
    function AddEditModeEvents(): number;
    /** Adds a custom event to the timeline. */
    function AddScriptEvent(eventInfo: EncounterTimelineScriptEventRequest): EncounterTimelineEventID;
    /** Cancels all custom timeline events, removing them from the timeline. */
    function CancelAllScriptEvents(): void;
    /** Removes all Edit Mode events from the timeline. */
    function CancelEditModeEvents(): void;
    /** Cancels a custom timeline event, removing it from the timeline. */
    function CancelScriptEvent(eventID: EncounterTimelineEventID): void;
    /** Finishes a custom timeline event, removing it from the timeline. */
    function FinishScriptEvent(eventID: EncounterTimelineEventID): void;
    /** Returns the current timestamp used for rendering the timeline display. */
    function GetCurrentTime(): number;
    /** Returns the current color used to render timeline event. */
    function GetEventColor(eventID: EncounterTimelineEventID, overrideTrigger?: Enum.EncounterEventColorTrigger): ColorMixin;
    /** Returns the number of present events in the timeline by their source type. */
    function GetEventCountBySource(source: Enum.EncounterTimelineEventSource): number;
    /** Returns the duration at which timeline events will be highlighted for imminency. */
    function GetEventHighlightTime(): number;
    /** Returns information about a timeline event. This data is generally expected to be static for the lifetime of an event. */
    function GetEventInfo(eventID: EncounterTimelineEventID): EncounterTimelineEventInfo;
    /** Returns an unsorted list of event IDs present in the timeline. */
    function GetEventList(): EncounterTimelineEventID[];
    /** Returns the current state of a timeline event. */
    function GetEventState(eventID: EncounterTimelineEventID): Enum.EncounterTimelineEventState;
    /** Returns the elapsed duration of a timeline event. */
    function GetEventTimeElapsed(eventID: EncounterTimelineEventID): number;
    /** Returns a Duration object that tracks the elapsed duration of a timeline event. This object tracks the range [0, duration] of the event and automatically pauses its progression based on event state. */
    function GetEventTimer(eventID: EncounterTimelineEventID): LuaDurationObject | undefined;
    /** Returns the remaining duration of a timeline event. */
    function GetEventTimeRemaining(eventID: EncounterTimelineEventID): number;
    /** Returns information about the position of an event on the timeline. */
    function GetEventTrack(eventID: EncounterTimelineEventID): LuaMultiReturn<[track: Enum.EncounterTimelineTrack, trackSortIndex: number | undefined]>;
    /** Returns a sorted list of event IDs present in the timeline from shortest to longest remaining durations, meeting the requirements of the specified filters. */
    function GetSortedEventList(maxEventCount?: number, maxEventDuration?: number, excludeTerminalStates?: boolean, excludeHiddenEvents?: boolean): EncounterTimelineEventID[];
    /** Returns information for a single timeline track. */
    function GetTrackInfo(track: Enum.EncounterTimelineTrack): EncounterTimelineTrackInfo;
    /** Returns information about all timeline tracks. */
    function GetTrackList(): EncounterTimelineTrackInfo[];
    /** Returns the maximum permitted event duration on a single timeline track. */
    function GetTrackMaxEventDuration(track: Enum.EncounterTimelineTrack): number;
    /** Returns the type of a single timeline track. */
    function GetTrackType(track: Enum.EncounterTimelineTrack): Enum.EncounterTimelineTrackType;
    /** Returns the current view type of the timeline. */
    function GetViewType(): Enum.EncounterTimelineViewType;
    /** Returns true if the timeline contains any events in the active state. */
    function HasActiveEvents(): boolean;
    /** Returns true if the timeline contains any events in any state. */
    function HasAnyEvents(): boolean;
    /** Returns true if the timeline contains any events in the paused state. */
    function HasPausedEvents(): boolean;
    /** Returns true if the timeline contains any events that are on visible tracks. */
    function HasVisibleEvents(): boolean;
    /** Returns true if the event is in a 'blocked' state, where the cast for this event may not occur due to encounter conditions not being met. */
    function IsEventBlocked(eventID: EncounterTimelineEventID): boolean;
    /** Returns true if the encounter timeline feature is available on this client. */
    function IsFeatureAvailable(): boolean;
    /** Returns true if the encounter timeline feature has been enabled by the player. This function will always return false if the feature is not available. */
    function IsFeatureEnabled(): boolean;
    /** Pauses a custom timeline event, hiding it from the timeline. A paused event can later be resumed to show it again, or canceled. */
    function PauseScriptEvent(eventID: EncounterTimelineEventID): void;
    /** Resumes a custom timeline event, showing it on the timeline again if it is currently paused. */
    function ResumeScriptEvent(eventID: EncounterTimelineEventID): void;
    /** Updates a given vector of texture objects to reference art assets for icons associated with an event. */
    function SetEventIconTextures(eventID: EncounterTimelineEventID, includeIcons: Enum.EncounterEventIconmask, textures: Texture[]): void;
    /** Changes the view type for the timeline. This adjusts track layouts to be more appropriate for a specific mode and optimizes event processing. */
    function SetViewType(viewType: Enum.EncounterTimelineViewType): void;
}

declare namespace C_EncounterWarnings {
    function GetColorForSeverity(severity: Enum.EncounterEventSeverity): ColorMixin;
    function GetEditModeWarningInfo(severity: Enum.EncounterEventSeverity): EncounterWarningInfo;
    /** Returns true if custom sound alerts are allowed to play for hidden warning messages. */
    function GetPlayCustomSoundsWhenHidden(): boolean;
    function GetSoundKitForSeverity(severity: Enum.EncounterEventSeverity): number;
    /** Returns true if text messages for encounter events are allowed to be shown. */
    function GetWarningsShown(): boolean;
    function IsFeatureAvailable(): boolean;
    function IsFeatureEnabled(): boolean;
    function PlaySound(severity: Enum.EncounterEventSeverity): number | undefined;
    /** Controls whether custom sound alerts for encounter events are allowed to play for warning messages that are hidden. */
    function SetPlayCustomSoundsWhenHidden(play: boolean): void;
    /** Controls whether text messages for encounter events are allowed to be shown. */
    function SetWarningsShown(shown: boolean): void;
}

declare namespace C_EndOfMatchUI {
    function GetEndOfMatchDetails(): MatchDetails | undefined;
}

declare namespace C_EquipmentSet {
    function AssignSpecToEquipmentSet(equipmentSetID: number, specIndex: number): void;
    function CanUseEquipmentSets(): boolean;
    function ClearIgnoredSlotsForSave(): void;
    function CreateEquipmentSet(equipmentSetName: string, icon?: string): void;
    function DeleteEquipmentSet(equipmentSetID: number): void;
    function EquipmentSetContainsLockedItems(equipmentSetID: number): boolean;
    function GetEquipmentSetAssignedSpec(equipmentSetID: number): number | undefined;
    function GetEquipmentSetForSpec(specIndex: number): number | undefined;
    function GetEquipmentSetID(equipmentSetName: string): number | undefined;
    function GetEquipmentSetIDs(): number[];
    function GetEquipmentSetInfo(equipmentSetID: number): LuaMultiReturn<[name: string | undefined, iconFileID: number | undefined, setID: number | undefined, isEquipped: boolean | undefined, numItems: number | undefined, numEquipped: number | undefined, numInInventory: number | undefined, numLost: number | undefined, numIgnored: number | undefined]>;
    function GetIgnoredSlots(equipmentSetID: number): boolean[] | undefined;
    function GetItemIDs(equipmentSetID: number): number[] | undefined;
    function GetItemLocations(equipmentSetID: number): number[] | undefined;
    function GetNumEquipmentSets(): number;
    function IgnoreSlotForSave(slot: number): void;
    function IsSlotIgnoredForSave(slot: number): boolean;
    function ModifyEquipmentSet(equipmentSetID: number, newName: string, newIcon?: string): void;
    function PickupEquipmentSet(equipmentSetID: number): void;
    function SaveEquipmentSet(equipmentSetID: number, icon?: string): void;
    function UnassignEquipmentSetSpec(equipmentSetID: number): void;
    function UnignoreSlotForSave(slot: number): void;
    function UseEquipmentSet(equipmentSetID: number): boolean;
}

declare namespace C_EventScheduler {
    /** Returns true if there are any events eligible to show for the player. */
    function CanShowEvents(): boolean;
    /** Clears reminder on a scheduled event. Must use endTime to identify which specific instance in the case of repeating ones. */
    function ClearReminder(eventKey: string): void;
    /** Returns the name of the continent with current events */
    function GetActiveContinentName(): string | undefined;
    /** Will try to figure out a UiMap for an areaPOI. */
    function GetEventUiMapID(areaPoiID: number): number | undefined;
    /** Will try to figure out a map zone name for an areaPOI */
    function GetEventZoneName(areaPoiID: number): string | undefined;
    /** Will request data from the server on a throttle */
    function GetOngoingEvents(): OngoingEventInfo[] | undefined;
    /** Will request data from the server on a throttle */
    function GetScheduledEvents(): ScheduledEventInfo[] | undefined;
    /** True if the server sent a list, even if the list had 0 events. */
    function HasData(): boolean;
    /** Returns whether there are any event reminders saved. Can include reminders that have expired since set and haven't gotten removed yet. Has to be called after cvars are loaded. */
    function HasSavedReminders(): boolean;
    /** Requests events from the server, subject to throttle */
    function RequestEvents(): void;
    /** Sets reminder on a scheduled event. Must use endTime to identify which specific instance in the case of repeating ones. */
    function SetReminder(eventKey: string): void;
}

declare namespace C_EventToastManager {
    function GetLevelUpDisplayToastsFromLevel(level: number): EventToastInfo[] | undefined;
    function GetNextToastToDisplay(): EventToastInfo | undefined;
    function RemoveCurrentToast(): void;
}

declare namespace C_EventUtils {
    function IsCallbackEvent(eventName: string): boolean;
    function IsEventValid(eventName: string): boolean;
}

declare namespace C_ExpansionTrial {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnTrialLevelUpDialogClicked(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnTrialLevelUpDialogShown(): void;
}

declare namespace C_ExternalEventURL {
    function CanShow(): boolean;
    function HasURL(): boolean;
    function IsNew(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function LaunchURL(): void;
}

declare namespace C_Flyout {
    function FlyoutHasSpell(flyoutID: number, spellID: number): boolean | undefined;
    function GetFlyoutID(index: number): number | undefined;
    function GetFlyoutInfo(flyoutID: number): FlyoutInfo | undefined;
    function GetFlyoutSlotInfo(flyoutID: number, slotIndex: number): FlyoutSlotInfo | undefined;
    function GetFlyoutTexture(flyoutID: number): number | undefined;
    function GetNumFlyouts(): number;
}

declare namespace C_FogOfWar {
    function GetFogOfWarForMap(uiMapID: number): number | undefined;
    function GetFogOfWarInfo(fogOfWarID: number): FogOfWarInfo | undefined;
}

declare namespace C_FrameManager {
    function GetFrameVisibilityState(frameType: Enum.UIFrameType): boolean;
}

declare namespace C_FriendList {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddFriend(name: string, notes?: string): void;
    function AddIgnore(name: string): boolean;
    function AddOrDelIgnore(name: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddOrRemoveFriend(name: string, notes: string): void;
    function DelIgnore(name: string): boolean;
    function DelIgnoreByIndex(index: number): void;
    function GetFriendInfo(name: string): FriendInfo | undefined;
    function GetFriendInfoByIndex(index: number): FriendInfo | undefined;
    function GetIgnoreName(index: number): string | undefined;
    function GetNumFriends(): number;
    function GetNumIgnores(): number;
    function GetNumOnlineFriends(): number;
    function GetNumWhoResults(): LuaMultiReturn<[numWhos: number, totalNumWhos: number]>;
    function GetSelectedFriend(): number | undefined;
    function GetSelectedIgnore(): number | undefined;
    function GetWhoInfo(index: number): WhoInfo | undefined;
    function GetWhoRaceFilters(): WhoFilter[];
    function IsFriend(guid: string): boolean;
    function IsIgnored(token: string): boolean;
    function IsIgnoredByGuid(guid: string): boolean;
    function IsLegacyFriendSystemEnabled(): boolean;
    function IsOnIgnoredList(token: string): boolean;
    function RemoveFriend(name: string): boolean;
    function RemoveFriendByIndex(index: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendWho(filter: string, origin?: number, filters?: SendWhoFilters): void;
    function SetFriendNotes(name: string, notes: string): boolean;
    function SetFriendNotesByIndex(index: number, notes: string): void;
    function SetSelectedFriend(index: number): void;
    function SetSelectedIgnore(index: number): void;
    function SetWhoToUi(whoToUi: boolean): void;
    function ShowFriends(): void;
    function SortWho(sorting: string, ascending?: boolean): void;
}

declare namespace C_GamePad {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddSDLMapping(platform: Enum.ClientPlatformType, mapping: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ApplyConfigs(): void;
    function AxisIndexToConfigName(axisIndex: number): string | undefined;
    function ButtonBindingToIndex(bindingName: string): number | undefined;
    function ButtonIndexToBinding(buttonIndex: number): string | undefined;
    function ButtonIndexToConfigName(buttonIndex: number): string | undefined;
    function ClearLedColor(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DeleteConfig(configID: GamePadConfigID): void;
    function GetActiveDeviceID(): number;
    function GetAllConfigIDs(): GamePadConfigID[];
    function GetAllDeviceIDs(): number[];
    function GetAllowHoverEventsWithFreeLook(): boolean;
    function GetCombinedDeviceID(): number;
    function GetConfig(configID: GamePadConfigID): GamePadConfig | undefined;
    function GetDeviceMappedState(deviceID?: number): GamePadMappedState | undefined;
    function GetDeviceRawState(deviceID: number): GamePadRawState | undefined;
    function GetLedColor(): ColorMixin;
    function GetPowerLevel(deviceID?: number): Enum.GamePadPowerLevel;
    function IsEnabled(): boolean;
    function SetAllowHoverEventsWithFreeLook(enable: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetConfig(config: GamePadConfig): void;
    function SetLedColor(color: ColorMixin): void;
    function SetVibration(vibrationType: string, intensity: number): void;
    function StickIndexToConfigName(stickIndex: number): string | undefined;
    function StopVibration(): void;
}

declare namespace C_GamepadTargeting {
    function Disable(): boolean;
    function Enable(): void;
    function SetFilter(filter: Enum.GamepadTargetingFilters): void;
}

declare namespace C_GamepadUI {
    function GetFirstGamepadActionBarStorageSlotIndexForActiveStance(): number | undefined;
    function GetFirstGamepadActionStorageSlotIndex(): number;
    function GetFirstGamepadPetActionStorageSlotIndex(): number;
    function IsValidGamepadActionStorageSlotIndex(gamepadActionStorageSlotIndex: number): boolean;
    function IsValidGamepadPossessBarStorageSlotIndex(gamepadPossessBarStorageSlotIndex: number): boolean;
}

declare namespace C_GameRules {
    function AccountHasSDEnabled(): boolean;
    function AutoConnectToGameModeRealm(gameModeRecordID: number): void;
    function DoesGameModeHavePromo(gameModeRecordID: number): boolean;
    function GetActiveGameMode(): GameMode;
    function GetCurrentEventRealmQueues(): Enum.EventRealmQueues;
    function GetCurrentGameModeDisplayInfo(): GameModeDisplayInfo | undefined;
    function GetCurrentGameModeRecordID(): number;
    function GetDisplayedGameModeRecordIDAtIndex(displayIndex: number): number;
    function GetForeverExperiencePreset(): Enum.ForeverExperiencePreset | undefined;
    function GetGameModeDisplayInfoByRecordID(gameModeRecordID: number): GameModeDisplayInfo | undefined;
    function GetGameModeGlueScreenName(): string;
    function GetGameModePromoGlobalString(gameModeRecordID: number): string;
    /** Returns the numeric value specified in the Game Rule, multiplied by 0.1 for every decimal place requested */
    function GetGameRuleAsFloat(gameRule: GameRule, decimalPlaces?: number): number;
    /** Returns the value specified in the Game Rule converted to a frame strata */
    function GetGameRuleAsFrameStrata(gameRule: GameRule): string;
    function GetNumDisplayedGameModes(): number;
    function IsCharacterlessLoginActive(): boolean;
    function IsClassAllowedForGameMode(classID: number): boolean;
    function IsGameModeEnabled(gameModeRecordID: number): boolean;
    function IsGameRuleActive(gameRule: GameRule): boolean;
    function IsHardcoreActive(): boolean;
    function IsMultiActionBarVisibilityForced(): boolean;
    /** Checks the game rule as well as nameplateShowSelf */
    function IsPersonalResourceDisplayEnabled(): boolean;
    function IsPlunderstorm(): boolean;
    function IsSDHDToggleEnabled(): boolean;
    function IsSelfFoundAllowed(): boolean;
    function IsStandard(): boolean;
    function IsWoWHack(): boolean;
    function SetForeverExperiencePresetPostLogin(preset: Enum.ForeverExperiencePreset): void;
    function SetForeverExperiencePresetPreLogin(preset: Enum.ForeverExperiencePreset): void;
    function SetSDHDToggleValue(setToSD: boolean, usageLocation: Enum.SdToggleUsageLocationUI): void;
}

declare namespace C_Garrison {
    function AddFollowerToMission(missionID: number, followerID: GarrisonFollower, boardIndex?: number): boolean;
    function GetAutoCombatDamageClassValues(): AutoCombatDamageClassString[];
    function GetAutoMissionBoardState(missionID: number): AutoMissionTargetingInfo[];
    function GetAutoMissionEnvironmentEffect(missionID: number): AutoMissionEnvironmentEffect | undefined;
    function GetAutoMissionTargetingInfo(missionID: number, followerID: GarrisonFollower, casterBoardIndex: number): AutoMissionTargetingInfo[];
    function GetAutoMissionTargetingInfoForSpell(missionID: number, autoCombatSpellID: number, casterBoardIndex: number): AutoMissionTargetingInfo[];
    function GetAutoTroops(followerType: number): AutoCombatTroopInfo[];
    function GetCombatLogSpellInfo(autoCombatSpellID: number): AutoCombatSpellInfo | undefined;
    function GetCurrentCypherEquipmentLevel(): number;
    function GetCurrentGarrTalentTreeFriendshipFactionID(): number | undefined;
    function GetCurrentGarrTalentTreeID(): number | undefined;
    function GetCyphersToNextEquipmentLevel(): number | undefined;
    function GetFollowerAutoCombatSpells(garrFollowerID: GarrisonFollower, followerLevel: number): LuaMultiReturn<[autoCombatSpells: AutoCombatSpellInfo[] | undefined, autoCombatAutoAttack: AutoCombatSpellInfo | undefined]>;
    function GetFollowerAutoCombatStats(garrFollowerID: GarrisonFollower): FollowerAutoCombatStatsInfo | undefined;
    function GetFollowerMissionCompleteInfo(followerID: GarrisonFollower): FollowerMissionCompleteInfo;
    function GetGarrisonPlotsInstancesForMap(uiMapID: number): GarrisonPlotInstanceMapInfo[];
    function GetGarrisonTalentTreeCurrencyTypes(garrTalentTreeID: number): number | undefined;
    function GetGarrisonTalentTreeType(garrTalentTreeID: number): number;
    function GetMaxCypherEquipmentLevel(): number;
    function GetMissionCompleteEncounters(missionID: number): GarrisonEnemyEncounterInfo[];
    function GetMissionDeploymentInfo(missionID: number): MissionDeploymentInfo;
    function GetMissionEncounterIconInfo(missionID: number): MissionEncounterIconInfo;
    function GetTalentInfo(talentID: number): GarrisonTalentInfo;
    function GetTalentPointsSpentInTalentTree(garrTalentTreeID: number): number;
    function GetTalentTreeIDsByClassID(garrType: number, classID: number): number[] | undefined;
    function GetTalentTreeInfo(treeID: number): GarrisonTalentTreeInfo;
    function GetTalentTreeResetInfo(garrTalentTreeID: number): LuaMultiReturn<[goldCost: number, currencyCosts: GarrisonTalentCurrencyCostInfo[]]>;
    function GetTalentTreeTalentPointResearchInfo(garrTalentID: number, researchRank: number, garrTalentTreeID: number, talentPointIndex: number, isRespec: boolean): LuaMultiReturn<[goldCost: number, currencyCosts: GarrisonTalentCurrencyCostInfo[], durationSecs: number]>;
    function GetTalentUnlockWorldQuest(talentID: number): number | undefined;
    function HasAdventures(): boolean;
    function IsAtGarrisonMissionNPC(): boolean;
    function IsEnvironmentCountered(missionID: number): boolean;
    function IsFollowerOnCompletedMission(followerID: GarrisonFollower): boolean;
    function IsLandingPageMinimapButtonVisible(garrType: number): boolean;
    function IsTalentConditionMet(talentID: number): LuaMultiReturn<[isMet: boolean, failureString: string | undefined]>;
    function RegenerateCombatLog(missionID: number): boolean;
    function RemoveFollowerFromMission(missionID: number, followerID: GarrisonFollower, boardIndex?: number): void;
    function RushHealAllFollowers(followerType: number): void;
    function RushHealFollower(garrFollowerID: GarrisonFollower): void;
    function SetAutoCombatSpellFastForward(state: boolean): void;
}

declare namespace C_GenericWidgetDisplay {
    function Acknowledge(): void;
    function Close(): void;
}

declare namespace C_Glue {
    function IsFirstLoadThisSession(): boolean;
    function IsOnGlueScreen(): boolean;
}

declare namespace C_GossipInfo {
    function CloseGossip(): void;
    function ForceGossip(): boolean;
    function GetActiveQuests(): GossipQuestUIInfo[];
    function GetAvailableQuests(): GossipQuestUIInfo[];
    function GetCompletedOptionDescriptionString(): string | undefined;
    function GetCustomGossipDescriptionString(): string | undefined;
    function GetFriendshipReputation(friendshipFactionID: number): FriendshipReputationInfo | undefined;
    function GetFriendshipReputationRanks(friendshipFactionID: number): FriendshipReputationRankInfo;
    function GetNumActiveQuests(): number;
    function GetNumAvailableQuests(): number;
    function GetOptions(): GossipOptionUIInfo[];
    function GetOptionUIWidgetSetsAndTypesByOptionID(gossipOptionID: number): GossipOptionUIWidgetSetAndType[] | undefined;
    function GetPoiForUiMapID(uiMapID: number): number | undefined;
    function GetPoiInfo(uiMapID: number, gossipPoiID: number): GossipPoiInfo | undefined;
    function GetText(): string;
    function RefreshOptions(): void;
    function SelectActiveQuest(optionID: number): void;
    function SelectAvailableQuest(optionID: number): void;
    function SelectOption(optionID: number, text?: string, confirmed?: boolean): void;
    function SelectOptionByIndex(optionID: number, text?: string, confirmed?: boolean): void;
}

declare namespace C_GuildBank {
    function IsGuildBankEnabled(): boolean;
}

declare namespace C_GuildInfo {
    function AreGuildEventsEnabled(): boolean;
    function CanEditOfficerNote(): boolean;
    function CanSpeakInGuildChat(): boolean;
    function CanViewOfficerNote(): boolean;
    function Demote(name: string): void;
    function Disband(): void;
    function GetGuildNewsInfo(index: number): GuildNewsInfo | undefined;
    function GetGuildRankOrder(guid: string): number;
    function GetGuildTabardInfo(unit?: UnitToken): GuildTabardInfo | undefined;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetInfoText(): string;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetMOTD(): string;
    function GetPreferredPlaySettings(): LuaMultiReturn<[loaded: boolean, preferredLocaleID: number, preferredDatacenterLocalityID: number, lastPreferredLocaleChangeDate: number, lastPreferredDatacenterLocalityChangeDate: number, changeCooldownDays: number]>;
    function GetPreferredPlaySettingsFeatures(): LuaMultiReturn<[canChangeLocale: boolean, canChangeDatacenterLocality: boolean]>;
    function GuildControlGetRankFlags(rankOrder: number): boolean[];
    function GuildRoster(): void;
    function Invite(name: string): void;
    function IsDiscordStreamSeparate(): boolean;
    function IsEncounterGuildNewsEnabled(): boolean;
    function IsGuildOfficer(): boolean;
    function IsGuildRankAssignmentAllowed(guid: string, rankOrder: number): boolean;
    function IsGuildReputationEnabled(): boolean;
    function Leave(): void;
    function MemberExistsByName(name: string): boolean;
    function Promote(name: string): void;
    function QueryGuildMemberRecipes(guildMemberGUID: string, skillLineID: number): void;
    function QueryGuildMembersForRecipe(skillLineID: number, recipeSpellID: number, recipeLevel?: number): number | undefined;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RemoveFromGuild(guid: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestGuildRename(desiredName: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestGuildRenameRefund(): void;
    function RequestPreferredPlaySettings(): boolean;
    function RequestRenameNameCheck(desiredName: string): void;
    function RequestRenameStatus(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetGuildRankOrder(guid: string, rankOrder: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetInfoText(infoText: string): void;
    function SetLeader(name: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetMOTD(motd: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetNote(guid: string, note: string, isPublic: boolean): void;
    function SetPreferredPlaySettings(preferredLocaleID?: number, preferredDatacenterLocalityID?: number): boolean;
    function Uninvite(name: string): void;
}

declare namespace C_HeirloomInfo {
    function AreAllCollectionFiltersChecked(): boolean;
    function AreAllSourceFiltersChecked(): boolean;
    function HeirloomsAvailable(): boolean;
    function IsHeirloomSourceValid(source: number): boolean;
    function IsUsingDefaultFilters(): boolean;
    function SetAllCollectionFilters(checked: boolean): void;
    function SetAllSourceFilters(checked: boolean): void;
    function SetDefaultFilters(): void;
}

declare namespace C_HouseEditor {
    /** Attempts switch the House Editor to a specific House Editor mode */
    function ActivateHouseEditorMode(editMode: Enum.HouseEditorMode): Enum.HousingResult;
    /** Attempts to open the House Editor to the default House Editor mode */
    function EnterHouseEditor(): Enum.HousingResult;
    function GetActiveHouseEditorMode(): Enum.HouseEditorMode;
    /** Returns the availability state of the House Editor overall */
    function GetHouseEditorAvailability(): Enum.HousingResult;
    /** Returns the availability of a specific House Editor mode */
    function GetHouseEditorModeAvailability(editMode: Enum.HouseEditorMode): Enum.HousingResult;
    function GetHouseEditorPlayerType(): Enum.HouseEditorPlayerType;
    /** Returns whether the House Editor is active, in any mode */
    function IsHouseEditorActive(): boolean;
    /** Returns whether the specific House Editor mode is active */
    function IsHouseEditorModeActive(editMode: Enum.HouseEditorMode): boolean;
    /** Returns true if the HouseEditor currently able process mode availability and switching; May be false if not in a house or plot, or while waiting to get house settings back from the server */
    function IsHouseEditorStatusAvailable(): boolean;
    function LeaveHouseEditor(): void;
}

declare namespace C_HouseExterior {
    /** Cancels all in-progress editing of house exterior fixtures, which will deselect any active targets */
    function CancelActiveExteriorEditing(): void;
    function GetCoreFixtureOptionsInfo(coreFixtureType: Enum.HousingFixtureType): HousingCoreFixtureInfo | undefined;
    function GetCurrentHouseExteriorSize(): Enum.HousingFixtureSize | undefined;
    function GetCurrentHouseExteriorType(): LuaMultiReturn<[houseExteriorTypeID: number | undefined, houseExteriorTypeName: string | undefined]>;
    function GetHouseExteriorSizeOptions(): HouseExteriorSizeOptionsInfo | undefined;
    function GetHouseExteriorTypeOptions(): HouseExteriorTypeOptionsInfo | undefined;
    function GetSelectedFixturePointInfo(): HousingFixturePointInfo | undefined;
    function HasHoveredFixture(): boolean;
    function HasSelectedFixturePoint(): boolean;
    /** Returns true if any decor is attached to the specified core fixture type, OR any child fixtures attached to it; Will also return false if the type provided is not a core fixture type, or if not in Exterior Customization mode on an owned plot */
    function IsAnyDecorAttachedToCoreFixture(coreFixtureType: Enum.HousingFixtureType): boolean;
    /** Returns true if any decor is attached to the current House Exterior's door; Will also return false if not in Exterior Customization mode on an owned plot */
    function IsAnyDecorAttachedToDoor(): boolean;
    /** Returns true if any decor is attached to any component of the current House Exterior; Will also return false if not in House Exterior Customization mode on an owned Plot */
    function IsAnyDecorAttachedToHouseExterior(): boolean;
    /** Returns true if any decor is attached to the Fixture occupying the currently selected fixture point; Will also return false if no point is currently selected, or if there is currently no Fixture there */
    function IsAnyDecorAttachedToSelectedFixturePoint(): boolean;
    function IsExteriorDecorHidden(): boolean;
    function RemoveFixtureFromSelectedPoint(attachedDecorAction?: Enum.HousingFixtureDecorAction): void;
    function SelectCoreFixtureOption(fixtureID: number, attachedDecorAction?: Enum.HousingFixtureDecorAction): void;
    function SelectFixtureOption(fixtureID: number, attachedDecorAction?: Enum.HousingFixtureDecorAction): void;
    function SetExteriorDecorHidden(decorHidden: boolean): void;
    function SetHouseExteriorSize(size: Enum.HousingFixtureSize, attachedDecorAction?: Enum.HousingFixtureDecorAction): void;
    function SetHouseExteriorType(houseExteriorTypeID: number, attachedDecorAction?: Enum.HousingFixtureDecorAction): void;
}

declare namespace C_Housing {
    function AcceptNeighborhoodOwnership(): void;
    function CanEditCharter(): boolean;
    function CanTakeReportScreenshot(plotIndex: number): InvalidPlotScreenshotReason;
    function CreateGuildNeighborhood(neighborhoodName: string): void;
    function CreateNeighborhoodCharter(neighborhoodName: string): void;
    function DeclineNeighborhoodOwnership(): void;
    function DoesFactionMatchNeighborhood(neighborhoodGUID: string): boolean;
    function EditNeighborhoodCharter(neighborhoodName: string): void;
    function GetCurrentHouseInfo(): HouseInfo | undefined;
    function GetCurrentHouseLevelFavor(houseGuid: string): void;
    function GetCurrentHouseRefundAmount(): number;
    function GetCurrentNeighborhoodGUID(): string | undefined;
    function GetHouseLevelFavorForLevel(level: number): number;
    function GetHouseLevelRewardsForLevel(level: number): void;
    function GetHousingAccessFlags(): HouseSettingFlags;
    function GetMaxHouseLevel(): number;
    function GetNeighborhoodTextureSuffix(neighborhoodGUID: string): string;
    function GetOthersOwnedHouses(playerGUID: string | undefined, bnetID: number | undefined, isInPlayersGuild: boolean): void;
    function GetPlayerOwnedHouses(): void;
    function GetTrackedHouseGuid(): string | undefined;
    function GetUIMapIDForNeighborhood(neighborhoodGuid: string): number | undefined;
    function GetVisitCooldownInfo(): SpellCooldownInfo | undefined;
    function HasHousingExpansionAccess(): boolean;
    function HouseFinderDeclineNeighborhoodInvitation(): void;
    function HouseFinderIgnoreNeighborhood(neighborhoodGuid: string): void;
    function HouseFinderRequestNeighborhoods(): void;
    function HouseFinderRequestReservationAndPort(neighborhoodGuid: string, plotID: number): void;
    function IsHousingMarketCartFullRemoveEnabled(): boolean;
    function IsHousingMarketEnabled(): boolean;
    function IsHousingMarketShopEnabled(): boolean;
    function IsHousingServiceEnabled(): boolean;
    function IsInsideHouse(): boolean;
    function IsInsideHouseOrPlot(): boolean;
    function IsInsideOwnedHouse(): boolean;
    function IsInsideOwnedHouseOrPlot(): boolean;
    function IsInsideOwnedPlot(): boolean;
    function IsInsidePlot(): boolean;
    function IsOnNeighborhoodMap(): boolean;
    function LeaveHouse(): void;
    function OnCharterConfirmationAccepted(): void;
    function OnCharterConfirmationClosed(): void;
    function OnCreateCharterNeighborhoodClosed(): void;
    function OnCreateGuildNeighborhoodClosed(): void;
    function OnHouseFinderClickPlot(plotID: number): void;
    function OnRequestSignatureClicked(): void;
    function OnSignCharterClicked(charterOwnerGUID: string): void;
    function RelinquishHouse(houseGuid: string): void;
    function RequestCurrentHouseInfo(): void;
    function RequestHouseFinderNeighborhoodData(neighborhoodGuid: string, neighborhoodName: string): void;
    function RequestPlayerCharacterList(): void;
    /**
     * Resets all contents of the house, based on the provided scope; API restricted to ensure this can't be triggered without the player getting ample notice and confirmation
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function ResetHouse(resetScope: Enum.HousingHouseScope): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ReturnAfterVisitingHouse(): void;
    function SaveHouseSettings(playerGUID: string, accessFlags: HouseSettingFlags): void;
    function SearchBNetFriendNeighborhoods(bnetName: string): boolean;
    function SearchBNetFriendNeighborhoodsByID(bnetID: number): boolean;
    function SetTrackedHouseGuid(trackedHouse?: string): void;
    function StartTutorial(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function TeleportHome(neighborhoodGUID: string, houseGUID: string, plotID: number): void;
    function TryRenameNeighborhood(neighborhoodName: string): void;
    function ValidateCreateGuildNeighborhoodSize(): void;
    function ValidateNeighborhoodName(neighborhoodName: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function VisitHouse(neighborhoodGUID: string, houseGUID: string, plotID: number): void;
}

declare namespace C_HousingBasicMode {
    /** Cancels all in-progress editing of the selected target, which will reset any unsaved changes and deselect the active target; Un-placed decor will be returned to the house chest */
    function CancelActiveEditing(): void;
    /** Attempt to save the changes made to the currently selected decor instance */
    function CommitDecorMovement(): void;
    /** Attempt to save the changes made to the House Exterior's position within the plot */
    function CommitHouseExteriorPosition(): void;
    function FinishPlacingNewDecor(): void;
    /** Returns info for the placed decor instance currently being hovered, if there is one */
    function GetHoveredDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns info for the decor instance that's currently selected, if there is one */
    function GetSelectedDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns true if a decor instance is currently selected and being dragged */
    function IsDecorSelected(): boolean;
    /** When free place is enabled, collision checks while dragging decor/the house exterior are ignored */
    function IsFreePlaceEnabled(): boolean;
    function IsGridSnapEnabled(): boolean;
    function IsGridVisible(): boolean;
    /** Returns true if the house's exterior is currently being hovered */
    function IsHouseExteriorHovered(): boolean;
    /** Returns true if the house's exterior is currently selected and being moved */
    function IsHouseExteriorSelected(): boolean;
    /** Returns true if a placed decor instance is currently being hovered */
    function IsHoveringDecor(): boolean;
    function IsPlacingNewDecor(): boolean;
    /** Attempt to return the currently selected decor instance back to the house chest */
    function RemoveSelectedDecor(): void;
    /** Rotates the currently selected decor along a single axis; For wall decor, rotates such that the object stays flat against its current wall; For all other decor, rotates around the Z (vertical) axis */
    function RotateDecor(rotDegrees: number): void;
    /** Rotates the House Exterior around the Z (vertical) axis */
    function RotateHouseExterior(rotDegrees: number): void;
    /** Set whether free place is enabled; When free place is enabled, collision checks while dragging decor/the house exterior are ignored */
    function SetFreePlaceEnabled(freePlaceEnabled: boolean): void;
    function SetGridSnapEnabled(isGridSnapEnabled: boolean): void;
    function SetGridVisible(gridVisible: boolean): void;
    function StartPlacingNewDecor(catalogEntryVariantID: HousingCatalogEntryVariantID): void;
    function StartPlacingPreviewDecor(decorRecordID: number, bundleCatalogShopProductID?: number): void;
}

declare namespace C_HousingBlueprint {
    /** Returns true if the specific room is allowed to be exported */
    function CanExportRoom(roomGUID: string): boolean;
    /** Returns true if the player's current location is a valid place to attempt to export a specific kind of blueprint */
    function CanExportTypeFromCurrentLocation(type: Enum.HousingBlueprintType): boolean;
    /** Returns true if the player's current location is a valid place to attempt to import a specific kind of blueprint */
    function CanImportTypeFromCurrentLocation(type: Enum.HousingBlueprintType): boolean;
    /** Delete the specified owned blueprint; Listen for HousingBlueprintDeleteSuccess and HousingBlueprintDeleteFailure for results */
    function DeleteBlueprint(blueprintID: number): void;
    /** Saves out a new Blueprint of the specified type, using the specified name, if available, based on where the player is currently standing (see GetExportAvailability); Listen for HousingBlueprintExportSuccess and HousingBlueprintExportFailure for results */
    function ExportBlueprint(type: Enum.HousingBlueprintType, name: string): void;
    /** Saves out a new Blueprint of the specified room, using the specified name, if available (see GetExportAvailability); Listen for HousingBlueprintExportSuccess and HousingBlueprintExportFailure for results */
    function ExportRoomBlueprint(name: string, roomGUID: string): void;
    function GetBlueprintHyperlink(blueprintShareCode: string): string | undefined;
    /** Returns what type of Blueprint the specified code is for; Will return HousingBlueprintType.None if code is invalid; Does NOT check whether the shareCode actually matches up to a real valid Blueprint */
    function GetBlueprintTypeForCode(shareCode: string): Enum.HousingBlueprintType;
    /** Returns success if the player can currently export Blueprints, or a specific error type (ex: invalid location or permissions) */
    function GetExportAvailability(): Enum.HousingResult;
    /** Returns success if Blueprints as a feature is currently enabled and available */
    function GetFeatureAvailability(): Enum.HousingResult;
    /** Returns success if the player can currently import Blueprints, or a specific error type (ex: invalid location or permissions) */
    function GetImportAvailability(): Enum.HousingResult;
    /** Imports the specified blueprint, if available (see GetImportAvailability and CanImportTypeFromCurrentLocation); Listen for HousingBlueprintImportSuccess and HousingBlueprintImportFailure for results */
    function ImportBlueprint(shareCode: string): void;
    /** Returns true if the string matches the valid expected format for a Blueprint Share Code; Does NOT check whether the shareCode actually matches up to a real valid Blueprint */
    function IsShareCodeValid(shareCode: string): boolean;
    /** Rename the specified owned blueprint to the specified name; Listen for HousingBlueprintRenameSuccess and HousingBlueprintRenameFailure for results */
    function RenameBlueprint(blueprintID: number, newName: string): void;
    /** Request the full list of all of the player's Blueprints; This is async, either the HOUSING_BLUEPRINT_COLLECTION_RECEIVED or HOUSING_BLUEPRINT_COLLECTION_FAILURE event will eventually be fired as a result */
    function RequestBlueprintCollection(): void;
    /** Request the full contents of a specific Blueprint, in context of the current owned plot or house (if any); This is async as content info includes dynamic data from the server, either the HOUSING_BLUEPRINT_CONTENTS_RECEIVED or HOUSING_BLUEPRINT_CONTENTS_FAILURE event will eventually be fired as a result; Calling this again before a prior request has finished will cancel the prior request */
    function RequestBlueprintContents(shareCode: string): void;
    /** Request the full contents of a specific Blueprint, either in context of a specific owned House or plot, or explicitly outside of any specific context; Typically used to update missing requirement info from previously-retrieved contents; See RequestBlueprintContents for other notes */
    function RequestBlueprintContentsForContext(shareCode: string, optionalHouseGUID?: string): void;
    /** Start the process of importing a Room Blueprint. This will lead to Layout Mode being opened, so the player can then select an available door to attach the room to */
    function StartImportRoomBlueprint(shareCode: string): void;
    function UpdateBlueprintStringFromInput(inputShareCode: string): string | undefined;
}

declare namespace C_HousingCatalog {
    /** Creates a new instance of a HousingCatalog searcher; This can be used to asynchronously search/filter the HousingCatalog without affecting/being restricted by the filter state of other Housing Catalog UI displays */
    function CreateCatalogSearcher(): HousingCatalogSearcher;
    function DeletePreviewCartDecor(decorGUID: string): void;
    /** Attempt to delete the entry from storage */
    function DestroyEntry(entryVariantID: HousingCatalogEntryVariantID, destroyAll: boolean): void;
    function GetAllFilterTagGroups(): HousingCatalogFilterTagGroupInfo[];
    /** Returns variant info for all variants of a given catalog entry; Variants represent different visual modifications of the same base entry (ex: dyed versions) */
    function GetAllVariantInfosForEntry(entryID: HousingCatalogEntryID): HousingCatalogEntryVariantInfo[];
    function GetBundleInfo(bundleCatalogShopProductID: number): HousingBundleInfo | undefined;
    function GetCartSizeLimit(): number;
    /** If found, returns the names of the parent category and the specified subcategory */
    function GetCatalogCategoryAndSubcategoryNames(subcategoryID: number): LuaMultiReturn<[categoryName: string | undefined, subcategoryName: string | undefined]>;
    function GetCatalogCategoryInfo(categoryID: number): HousingCatalogCategoryInfo | undefined;
    function GetCatalogEntryInfo(entryID: HousingCatalogEntryID): HousingCatalogEntryInfo | undefined;
    function GetCatalogEntryInfoByItem(itemInfo: ItemInfo): HousingCatalogEntryInfo | undefined;
    function GetCatalogEntryInfoByRecordID(entryType: Enum.HousingCatalogEntryType, recordID: number): HousingCatalogEntryInfo | undefined;
    function GetCatalogEntryRefundTimeStampByRecordID(entryType: Enum.HousingCatalogEntryType, recordID: number): number | undefined;
    function GetCatalogEntryVariantInfo(entryVariantID: HousingCatalogEntryVariantID): HousingCatalogEntryVariantInfo | undefined;
    function GetCatalogSubcategoryInfo(subcategoryID: number): HousingCatalogSubcategoryInfo | undefined;
    /** Returns the maximum total number of decor that can be in storage/in the house chest; Note that not all decor entries in storage count towards this limit (see GetDecorTotalOwnedCount) */
    function GetDecorMaxOwnedCount(): number;
    function GetDecorTotalOwnedCount(): LuaMultiReturn<[totalOwnedCount: number, exemptDecorCount: number]>;
    /** Returns the number of instances that can be to be destroyed in storage; These instances count towards the max storage limit */
    function GetDestroyableInstanceCount(entryVariantID: HousingCatalogEntryVariantID): number;
    function GetFeaturedBundles(): HousingBundleInfo[];
    function GetFeaturedSmallProducts(): HousingFeaturedSmallProductInfo[];
    /** Returns market info for a specific decor. This is decor-only for now but should be extended to support entry type and recordID generically */
    function GetMarketInfoForDecor(decorID: number): HousingMarketInfo | undefined;
    function HasFeaturedEntries(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function HousingMarketActionAddToCart(productID: number, withPreview: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function HousingMarketActionClearCart(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function HousingMarketActionRemoveFromCart(productID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function HousingMarketActionViewBundle(productID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function HousingMarketActionViewInStore(productID: number): void;
    function IsPreviewCartItemShown(decorGUID: string): boolean;
    function PromotePreviewDecor(decorID: number, previewDecorGUID: string): boolean;
    function RequestHousingMarketInfoRefresh(): void;
    function RequestHousingMarketRefundInfo(): void;
    function SearchCatalogCategories(searchParams: HousingCategorySearchInfo): number[];
    function SearchCatalogSubcategories(searchParams: HousingCategorySearchInfo): number[];
    function SetPreviewCartItemShown(decorGUID: string, shown: boolean): void;
}

declare namespace C_HousingCleanupMode {
    function GetHoveredDecorInfo(): HousingDecorInstanceInfo | undefined;
    function IsHoveringDecor(): boolean;
    function RemoveSelectedDecor(): void;
}

declare namespace C_HousingCustomizeMode {
    /** If a dyeable decor is selected, applies a specific dye color in a specific slot as a preview; See CommitDyesForSelectedDecor to actually save applied dye changes */
    function ApplyDyeToSelectedDecor(dyeSlotID: number, dyeColorID?: number): void;
    /** If a decor is selected that supports pets, applies a specific petID to be shown on that decor */
    function ApplyPetToSelectedDecor(petID: string | undefined, petBehavior: Enum.HousingPetBehaviorType): void;
    /** Attempt to apply a specific theme set (aka style) to all applicable room components in the current room */
    function ApplyThemeToRoom(themeSetID: number): void;
    /** Attempt to apply a specific theme set (aka style) to the currently selected room component only */
    function ApplyThemeToSelectedRoomComponent(themeSetID: number): void;
    /** Attempt to apply a specific wallpaper (aka material/texture) to all applicable room components in the current room */
    function ApplyWallpaperToAllWalls(roomComponentTextureRecID: number): void;
    /** Attempt to apply a specific wallpaper (aka material/texture) to the currently selected room component only */
    function ApplyWallpaperToSelectedRoomComponent(roomComponentTextureRecID: number): void;
    /** Cancels all in-progress editing of the selected target, which will reset any unapplied customization changes and deselect the active target */
    function CancelActiveEditing(): void;
    /** Clears all previewed dye changes on the selected decor; Does not clear any already saved dyes that were previously applied */
    function ClearDyesForSelectedDecor(): void;
    /** Deselect the currently selected room component, if there is one */
    function ClearTargetRoomComponent(): void;
    /** Attempt to save all previewed dye changes made to the selected decor */
    function CommitDyesForSelectedDecor(): boolean;
    /** Returns info for the placed decor instance currently being hovered, if there is one */
    function GetHoveredDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns info for the room component currently being hovered, if there is one */
    function GetHoveredRoomComponentInfo(): HousingRoomComponentInstanceInfo | undefined;
    /** If a dyeable decor instance is selected, returns how many dye slots would be cleared on applying all currently previewed dye changes */
    function GetNumDyesToRemoveOnSelectedDecor(): number;
    /** If a dyeable decor instance is selected, returns how many dye items would be spent on applying all currently previewed dye changes */
    function GetNumDyesToSpendOnSelectedDecor(): number;
    /** If a dyeable decor instance is selected, returns info structs for each new/changed dye currently being previewed */
    function GetPreviewDyesOnSelectedDecor(): PreviewDyeSlotInfo[];
    /** Returns a list of ids for the dyes most recently applied by the player, if any */
    function GetRecentlyUsedDyes(): number[];
    /** Returns a list of ids for the theme sets (aka styles) most recently applied by the player, if any */
    function GetRecentlyUsedThemeSets(): number[];
    /** Returns a list of ids for the wallpapers most recently applied by the player, if any */
    function GetRecentlyUsedWallpapers(): number[];
    /** Returns info for the decor instance that's currently selected, if there is one */
    function GetSelectedDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** If a decor is selected that supports pets, gets petID and behavior type from decor */
    function GetSelectedDecorPetInfo(): LuaMultiReturn<[petID: string | undefined, petBehavior: Enum.HousingPetBehaviorType]>;
    /** Returns info for the currently selected room component, if there is one */
    function GetSelectedRoomComponentInfo(): HousingRoomComponentInstanceInfo | undefined;
    /** Returns the name of the specified theme set (aka style) if it exists */
    function GetThemeSetInfo(themeSetID: number): string | undefined;
    /** Get all wallpapers (aka materials/textures) available for the selected room component type, if any */
    function GetWallpapersForRoomComponentType(type: Enum.HousingRoomComponentType): RoomComponentWallpaper[];
    /** Returns true if a decor instance is currently selected for customization */
    function IsDecorSelected(): boolean;
    /** Returns true if the entry door of the house's exterior is currently being hovered */
    function IsHouseExteriorDoorHovered(): boolean;
    /** Returns true if a placed decor instance is currently being hovered */
    function IsHoveringDecor(): boolean;
    /** Returns true if a room component is currently being hovered */
    function IsHoveringRoomComponent(): boolean;
    /** Returns true if a room component is currently selected for customization */
    function IsRoomComponentSelected(): boolean;
    /** Check whether a specific room component supports a particular variant; What kind of id or enum 'variant' equates to is complicated, as it depends on the component type */
    function RoomComponentSupportsVariant(componentID: number, variant: number): boolean;
    /** Check whether a specific room component, within a specific room, supports a particular doorType */
    function RoomConnectionSupportsDoorType(roomGUID: string, componentID: number, newDoortype: Enum.HousingRoomComponentDoorType): boolean;
    /** Attempt to set a specific ceiling component, within a specific room, to a specific new ceiling type */
    function SetRoomComponentCeilingType(roomGUID: string, componentID: number, ceilingType: Enum.HousingRoomComponentCeilingType): void;
    /** Attempt to set a specific door component, within a specific room, to a specific new door type */
    function SetRoomComponentDoorType(roomGUID: string, componentID: number, newDoortype: Enum.HousingRoomComponentDoorType): void;
}

declare namespace C_HousingDecor {
    /** Returns true if any decor objects are placed in a given room */
    function AnyDecorPlacedInRoom(roomGUID: string): boolean;
    /** Cancels all in-progress editing of the selected target, which will reset any unsaved changes and deselect the active target */
    function CancelActiveEditing(): void;
    /** Attempt to save the changes made to the currently selected decor instance */
    function CommitDecorMovement(): void;
    function EnterPreviewState(): void;
    function ExitPreviewState(): void;
    /** Returns the interior and exterior max decor placement budgets for the current owned house interior or plot; Can be increased via house level */
    function GetAllMaxPlacementBudgets(): LuaMultiReturn<[interiorMaxBudgets: LuaTable<Enum.HousingBudgetType, number> | undefined, exteriorMaxBudgets: LuaTable<Enum.HousingBudgetType, number> | undefined]>;
    /**
     * Placed Decor List APIs currently restricted due to being potentially very expensive operations, may be reworked & opened up in the future
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function GetAllPlacedDecor(): HousingDecorInstanceListEntry[];
    /** Returns how much of the interior and exterior placement budgets for the current owned house interior or plot's decor budget have been spent */
    function GetAllSpentPlacementBudgets(): LuaMultiReturn<[interiorSpentBudgets: LuaTable<Enum.HousingBudgetType, number> | undefined, exteriorSpentBudgets: LuaTable<Enum.HousingBudgetType, number> | undefined]>;
    /** Returns pet name for the placed decor instance associated with the passed Decor GUID, if there is one */
    function GetDecorAssignedPetName(decorGUID: string): string | undefined;
    function GetDecorCanAttachPet(decorID: number): boolean;
    function GetDecorHyperlink(decorID: number): string | undefined;
    function GetDecorIcon(decorID: number): number | undefined;
    /** Returns info for the placed decor instance associated with the passed Decor GUID, if there is one */
    function GetDecorInstanceInfoForGUID(decorGUID: string): HousingDecorInstanceInfo | undefined;
    function GetDecorName(decorID: number): string | undefined;
    /** Returns info for the placed decor instance currently being hovered, if there is one */
    function GetHoveredDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns the max pet decor placement budget for the current owned house interior or plot */
    function GetMaxPetPlacementBudget(): number | undefined;
    /** Returns the max decor placement budget for the current owned house interior or plot; Can be increased via house level */
    function GetMaxPlacementBudget(): number | undefined;
    /** Returns the number of individual decor objects placed in the current house or plot; This is NOT the value used in placement budget calculations, see GetSpentPlacementBudget for that */
    function GetNumDecorPlaced(): number;
    function GetNumPreviewDecor(): number;
    /** Returns info for the placed decor instance that's currently selected, if there is one */
    function GetSelectedDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns how much of the current owned house interior or plot's pet decor placement budget has been spent */
    function GetSpentPetPlacementBudget(): number | undefined;
    /** Returns how much of the current owned house interior or plot's decor placement budget has been spent; Different kinds of decor take up different budget amounts, so this value isn't an individual decor count, see GetNumDecorPlaced for that */
    function GetSpentPlacementBudget(): number | undefined;
    /** Returns whether there's a max decor placement budget available and active for the current player, in the current house interior or plot */
    function HasMaxPlacementBudget(): boolean;
    /** Returns true if a placed decor instance is currently selected */
    function IsDecorSelected(): boolean;
    function IsGridVisible(): boolean;
    /** Returns true if the entry door of the house's exterior is currently being hovered */
    function IsHouseExteriorDoorHovered(): boolean;
    /** Returns true if the house's exterior is currently being hovered */
    function IsHouseExteriorHovered(): boolean;
    /** Returns true if a placed decor instance is currently being hovered */
    function IsHoveringDecor(): boolean;
    function IsModeDisabledForPreviewState(mode: Enum.HouseEditorMode): boolean;
    function IsPreviewState(): boolean;
    /**
     * Placed Decor List APIs currently restricted due to being potentially very expensive operations, may be reworked & opened up in the future
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function RemovePlacedDecorEntry(decorGUID: string): void;
    /** Attempt to return the currently selected decor instance back to the house chest */
    function RemoveSelectedDecor(): void;
    function SetGridVisible(gridVisible: boolean): void;
    /**
     * Placed Decor List APIs currently restricted due to being potentially very expensive operations, may be reworked & opened up in the future
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetPlacedDecorEntryHovered(decorGUID: string, hovered: boolean): void;
    /**
     * Placed Decor List APIs currently restricted due to being potentially very expensive operations, may be reworked & opened up in the future
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetPlacedDecorEntrySelected(decorGUID: string, selected: boolean): void;
}

declare namespace C_HousingExpertMode {
    /** Cancels all in-progress editing of the selected target, which will reset any unsaved changes and deselect the active target; Will not reset any already-applied changes */
    function CancelActiveEditing(): void;
    /** Attempt to save the changes made to the currently selected decor instance */
    function CommitDecorMovement(): void;
    /** Attempt to save the changes made to the House Exterior's position within the plot */
    function CommitHouseExteriorPosition(): void;
    /** Returns info for the placed decor instance currently being hovered, if there is one */
    function GetHoveredDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns the currently active Expert submode, if there is one */
    function GetPrecisionSubmode(): Enum.HousingPrecisionSubmode | undefined;
    /** Returns the type of restriction currently active on the submode; Will return HousingExpertSubmodeRestriction:None if submode is not currently restricted */
    function GetPrecisionSubmodeRestriction(subMode: Enum.HousingPrecisionSubmode): Enum.HousingExpertSubmodeRestriction;
    /** Returns info for the placed decor instance that's currently selected, if there is one */
    function GetSelectedDecorInfo(): HousingDecorInstanceInfo | undefined;
    /** Returns true if a placed decor instance is currently selected */
    function IsDecorSelected(): boolean;
    function IsGridVisible(): boolean;
    /** Returns true if the house's exterior is currently being hovered */
    function IsHouseExteriorHovered(): boolean;
    /** Returns true if the house's exterior is currently selected */
    function IsHouseExteriorSelected(): boolean;
    /** Returns true if a placed decor instance is currently being hovered */
    function IsHoveringDecor(): boolean;
    /** Attempt to return the currently selected decor instance back to the house chest */
    function RemoveSelectedDecor(): void;
    /** Reset the selected target's transform back to default values; This is NOT an undo, meaning it will completely reset the transform value to default, NOT just recently-made changes */
    function ResetPrecisionChanges(activeSubmodeOnly: boolean): void;
    /** In the rotation submode, swaps the selected axis to the next available one, in order of X -> Y -> Z (wrapping back around to X again, etc); If no axis is selected, selects the first available one, also in that order */
    function SelectNextRotationAxis(): void;
    function SetGridVisible(gridVisible: boolean): void;
    /** Sets a specific type of incremental change active or inactive; Whilever that type is active and target stays selected, incremental changes of that type will continue to be made every frame */
    function SetPrecisionIncrementingActive(incrementType: Enum.HousingIncrementType, active: boolean): void;
    /** Activate a specific Expert submode */
    function SetPrecisionSubmode(subMode: Enum.HousingPrecisionSubmode): void;
}

declare namespace C_HousingInspectMode {
    /** Enters inspect mode, enabling decor inspection */
    function EnterInspectMode(): void;
    /** Exits inspect mode, disabling decor inspection */
    function ExitInspectMode(): void;
    /** Returns the GUID of the decor instance currently being hovered, if there is one */
    function GetHoveredDecorGUID(): string;
    /** Returns true if a decor instance is currently being hovered in inspect mode */
    function IsHoveringDecor(): boolean;
    /** Returns true if the player is currently in inspect mode */
    function IsInInspectMode(): boolean;
}

declare namespace C_HousingLayout {
    function AnyRoomsOnFloor(floor: number): boolean;
    function CancelActiveLayoutEditing(): void;
    function CanSetViewedFloor(floor: number): boolean;
    function ConfirmStairChoice(choice?: Enum.HousingLayoutStairDirection): void;
    function DeselectFloorplan(): void;
    function DeselectRoomOrDoor(): void;
    function GetBaseRoomFloor(): number;
    function GetHighestOccupiedFloorIndex(): number;
    function GetLowestOccupiedFloorIndex(): number;
    function GetNumActiveRooms(): number;
    /** Returns the max room placement budget for the current owned house's interior; Can be increased via house level */
    function GetRoomPlacementBudget(): number | undefined;
    /** Returns the guid of the interior room the player is standing in, or nil if not currently standing in one */
    function GetRoomPlayerIsIn(): string | undefined;
    function GetSelectedBlueprintFloorplan(): LuaMultiReturn<[roomID: number | undefined, shareCode: string | undefined]>;
    /** If a door is selected, returns its component id and the guid of the room it belongs to; Otherwise returns nothing */
    function GetSelectedDoor(): LuaMultiReturn<[selectedDoorComponentID: number | undefined, roomGUID: string | undefined]>;
    function GetSelectedFloorplan(): number | undefined;
    /** If a Room is selected, returns the room's guid; Otherwise returns nothing */
    function GetSelectedRoom(): string | undefined;
    function GetSelectedStairwellRoomCount(): number;
    /** Returns how much of the current owned house's room placement budget has been spent; Different kinds of rooms take up different budget amounts, so this value isn't an individual room count, see GetNumActiveRooms for that */
    function GetSpentPlacementBudget(): number | undefined;
    function GetViewedFloor(): number;
    /** Returns true if any room, door, or floorplan is currently selected or being dragged */
    function HasAnySelections(): boolean;
    /** Returns whether there's a max room placement budget available and active for the current player, in the current house's interior */
    function HasRoomPlacementBudget(): boolean;
    function HasSelectedBlueprintFloorplan(): boolean;
    /** Returns true if a door component is currently selected */
    function HasSelectedDoor(): boolean;
    function HasSelectedFloorplan(): boolean;
    /** Returns true if a room is selected, will NOT return true if a door is selected */
    function HasSelectedRoom(): boolean;
    function HasStairs(roomRecordID: number): boolean;
    function HasValidConnection(roomGUID: string, componentID: number, roomId: number): boolean;
    function IsBaseRoom(roomGUID: string): boolean;
    function IsDraggingRoom(): LuaMultiReturn<[isDragging: boolean, isAccessibleDrag: boolean]>;
    /** Attempt to move the room currently being dragged to a specific connection point on a specific other room */
    function MoveDraggedRoom(sourceDoorIndex: number, destRoom: string, destDoorIndex: number): void;
    function MoveLayoutCamera(direction: Enum.HousingLayoutCameraDirection, isPressed: boolean): void;
    /** Attempt to return a previously placed room to the House Chest */
    function RemoveRoom(roomGUID: string): void;
    /** Returns true of the provided roomGUID is a stairwell. Returns false if roomGUID is invalid */
    function RoomHasStairs(roomGUID: string): boolean;
    /** Rotates either the currently dragged or currently selected room, if either exist */
    function RotateFocusedRoom(isLeft: boolean): void;
    /** Attempt to rotate an already placed room */
    function RotateRoom(roomGUID: string, isLeft: boolean): void;
    function SelectFloorplan(roomID: number): void;
    function SetViewedFloor(floor: number): void;
    function StartDrag(): void;
    function StopDrag(): void;
    function StopDraggingRoom(): void;
    function ZoomLayoutCamera(zoomIn: boolean): boolean;
}

declare namespace C_HousingNeighborhood {
    /** Only available when interacting with a bulletin board game object */
    function CancelInviteToNeighborhood(playerName: string): void;
    function CanReturnAfterVisitingHouse(): boolean;
    /** Only available when interacting with a bulletin board game object */
    function DemoteToResident(playerGUID: string): void;
    /** Only available when interacting with a cornerstone game object */
    function GetCornerstoneHouseInfo(): HouseInfo;
    /** Only available when interacting with a cornerstone game object */
    function GetCornerstoneNeighborhoodInfo(): NeighborhoodInfo;
    /** Only available when interacting with a cornerstone game object */
    function GetCornerstonePurchaseMode(): Enum.CornerstonePurchaseMode;
    function GetCurrentNeighborhoodTextureSuffix(): string;
    /** Only available when interacting with a cornerstone game object */
    function GetDiscountedMovePrice(): number;
    /** Only available when interacting with a cornerstone game object */
    function GetMoveCooldownTime(): number;
    function GetNeighborhoodMapData(): NeighborhoodPlotMapInfo[];
    function GetNeighborhoodName(): string;
    function GetNeighborhoodPlotName(plotIndex: number): string;
    /** Only available when interacting with a cornerstone game object */
    function GetPreviousHouseIdentifier(): string;
    /** Only available when interacting with a cornerstone game object */
    function HasPermissionToPurchase(): PurchaseHouseDisabledReason;
    /** Only available when interacting with a bulletin board game object */
    function InvitePlayerToNeighborhood(playerName: string): void;
    function IsNeighborhoodManager(): boolean;
    function IsNeighborhoodOwner(): boolean;
    /** This returns true if the player is in a plot that is owned by another player */
    function IsPlayerInOtherPlayersPlot(): boolean;
    /** Only available when interacting with a cornerstone game object */
    function IsPlotAvailableForPurchase(): boolean;
    /** Only available when interacting with a cornerstone game object */
    function IsPlotOwnedByPlayer(): boolean;
    function OnBulletinBoardClosed(): void;
    function OnCornerstoneClosed(): void;
    /** Only available when interacting with a bulletin board game object */
    function PromoteToManager(playerGUID: string): void;
    function RequestNeighborhoodInfo(): void;
    /** Only available when interacting with a bulletin board game object */
    function RequestNeighborhoodRoster(): void;
    /** Only available when interacting with a bulletin board game object */
    function RequestPendingNeighborhoodInvites(): void;
    /** Only available when interacting with a bulletin board game object */
    function TransferNeighborhoodOwnership(playerGUID: string): void;
    /** Only available when interacting with a bulletin board game object */
    function TryEvictPlayer(plotID: number): void;
    /** Only available when interacting with a cornerstone game object */
    function TryMoveHouse(): void;
    /** Only available when interacting with a cornerstone game object */
    function TryPurchasePlot(): void;
}

declare namespace C_ImmersiveInteraction {
    function HasImmersiveInteraction(): boolean;
}

declare namespace C_IncomingSummon {
    function HasIncomingSummon(unit: UnitToken): boolean;
    function IncomingSummonStatus(unit: UnitToken): Enum.SummonStatus;
}

declare namespace C_InputInterfaceStyle {
    function GetCurrentStyle(): Enum.InputDeviceInterfaceType;
}

declare namespace C_InstanceEncounter {
    function IsEncounterInProgress(): boolean;
    function IsEncounterLimitingResurrections(): boolean;
    function IsEncounterSuppressingRelease(): boolean;
    function ShouldShowTimelineForEncounter(): boolean;
}

declare namespace C_InstanceLeaver {
    /** Returns whether the player is considered a leaver for repeatedly abandoning mythic+ groups. */
    function IsPlayerLeaver(): boolean;
}

declare namespace C_InterfaceFileManifest {
    function GetInterfaceArtFiles(): string[] | undefined;
}

declare namespace C_Intl {
    /** Compares two UTF-8 strings using the options specified on a collator. */
    function CompareStrings(left: string, right: string, strength: Enum.CollationStrength): number | undefined;
    /** Creates a locale context object for locale-scoped internationalization operations. */
    function CreateLocaleContext(locale: string): LuaLocaleContext;
    /** Opens a break iterator for locating text boundaries in a specified locale. */
    function FindBreaks(text: string, breakType: Enum.BreakType): number[] | undefined;
    /** Creates a string search iterator using a collator and returns every match position. */
    function FindStringMatches(text: string, pattern: string, strength: Enum.CollationStrength): number[] | undefined;
    /** Case-folds the characters in a string; case-folding is locale-independent and not context-sensitive. */
    function FoldCase(text: string): string | undefined;
    /** Formats a double as a localized currency value using the provided ISO 4217 currency code. */
    function FormatCurrency(number: number, currencyCode: string): string | undefined;
    /** Formats Unix time as localized date text using locale date patterns, symbols, style, and optional time zone. */
    function FormatDate(unixTimeSeconds: number, style: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Formats Unix time as localized date and time text using locale patterns, symbols, styles, and optional time zone. */
    function FormatDateTime(unixTimeSeconds: number, dateStyle: Enum.DateTimeStyle, timeStyle: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Formats a double with locale number formatting using locale symbols, grouping, and the selected non-currency style. */
    function FormatNumber(number: number, style: Enum.NumberStyle): string | undefined;
    /** Formats Unix time as localized time text using locale time patterns, symbols, style, and optional time zone. */
    function FormatTime(unixTimeSeconds: number, style: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Returns Unicode property values for the first code point in a string. */
    function GetCharacterProperties(text: string): CharacterProperties | undefined;
    /** Returns the number of fraction digits that should be displayed for the given currency. */
    function GetCurrencyFractionDigits(currencyCode: string): number | undefined;
    /** Returns the display name for a currency in the given locale. */
    function GetCurrencyName(currencyCode: string, nameStyle: Enum.CurrencyNameStyle): string | undefined;
    /** Gets the current locale used by C_Intl. */
    function GetCurrentLocale(): string;
    /** Gets a display name suitable for the specified locale. */
    function GetDisplayName(displayLocale: string): string | undefined;
    /** Transforms a string into a collation sort key. */
    function GetSortKey(text: string, strength: Enum.CollationStrength): string | undefined;
    /** Tests if the string is normalized according to the specified normalization form. */
    function IsNormalized(text: string, form: Enum.NormalizationForm): boolean;
    /** Counts character break boundaries in UTF-8 text. */
    function Length(text: string): number | undefined;
    /** Writes the normalized form of the source string to the destination string. */
    function Normalize(text: string, form: Enum.NormalizationForm): string | undefined;
    /** Parses an entire localized currency string into a double amount and ISO 4217 currency code. */
    function ParseCurrency(text: string): CurrencyParseResult | undefined;
    /** Parses an entire localized number string into a double using the selected non-currency number formatter. */
    function ParseNumber(text: string, style: Enum.NumberStyle): number | undefined;
    /** Returns the keyword of the first plural rule that applies to a number. */
    function SelectPlural(number: number, pluralType: Enum.PluralType): string | undefined;
    /** Lowercases the characters in a string; casing is locale-dependent and context-sensitive. */
    function ToLower(text: string): string | undefined;
    /** Titlecases a string using titlecase positions determined by the default Unicode algorithm. */
    function ToTitle(text: string): string | undefined;
    /** Uppercases the characters in a string; casing is locale-dependent and context-sensitive. */
    function ToUpper(text: string): string | undefined;
    /** Applies a locale transform to the current locale and returns the transformed locale string. */
    function TransformLocale(transform: Enum.LocaleTransform): string | undefined;
    /** Opens a system transliterator by ID and transliterates the text in place. */
    function Transliterate(text: string, transliteratorID: string): string | undefined;
}

declare namespace C_InvasionInfo {
    /** Returns true if invasions are active in the same physical area as the player. */
    function AreInvasionsAvailable(): boolean;
    function GetInvasionForUiMapID(uiMapID: number): number | undefined;
    function GetInvasionInfo(invasionID: number): InvasionMapInfo | undefined;
    function GetInvasionTimeLeft(invasionID: number): number | undefined;
}

declare namespace C_IslandsQueue {
    function CloseIslandsQueueScreen(): void;
    function GetIslandDifficultyInfo(): IslandsQueueDifficultyInfo[];
    function GetIslandsMaxGroupSize(): number;
    function GetIslandsWeeklyQuestID(): number | undefined;
    function QueueForIsland(difficultyID: number): void;
    function RequestPreloadRewardData(questId: number): void;
}

declare namespace C_Item {
    function ActionBindsItem(): void;
    function BindEnchant(): void;
    function CanBeRefunded(itemLocation: ItemLocationMixin): boolean;
    function CanItemTransmogAppearance(itemLoc: ItemLocationMixin): LuaMultiReturn<[canTransmog: boolean, errorCode: Enum.TransmogOutfitSlotError]>;
    function CanScrapItem(itemLoc: ItemLocationMixin): boolean;
    function CanViewItemPowers(itemLoc: ItemLocationMixin): boolean;
    function ConfirmBindOnUse(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ConfirmDeleteItem(itemGUID: string): void;
    function ConfirmNoRefundOnUse(): void;
    function ConfirmOnUse(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DeleteItem(itemGUID: string): void;
    function DoesItemContainSpec(itemInfo: ItemInfo, classID: number, specID?: number): boolean;
    function DoesItemExist(emptiableItemLocation: ItemLocationMixin): boolean;
    function DoesItemExistByID(itemInfo: ItemInfo): boolean;
    function DoesItemMatchBonusTreeReplacement(itemLoc: ItemLocationMixin): boolean;
    function DoesItemMatchSpellItemCondition(itemLoc: ItemLocationMixin): boolean;
    function DoesItemMatchTargetEnchantingSpell(itemLoc: ItemLocationMixin): boolean;
    function DoesItemMatchTrackJump(itemLoc: ItemLocationMixin): boolean;
    function DropItemOnUnit(unitGUID: UnitToken): void;
    function EndBoundTradeable(type: string): void;
    function EndRefund(type: number): void;
    function EquipItemByName(itemInfo: ItemInfo, dstSlot?: number): void;
    function GetAppliedItemTransmogInfo(itemLoc: ItemLocationMixin): ItemTransmogInfoMixin | undefined;
    function GetBaseItemTransmogInfo(itemLoc: ItemLocationMixin): ItemTransmogInfoMixin | undefined;
    function GetCurrentItemLevel(itemLocation: ItemLocationMixin): number | undefined;
    function GetCurrentItemTransmogInfo(itemLoc: ItemLocationMixin): ItemTransmogInfoMixin | undefined;
    function GetDelvePreviewItemLink(itemID: number, context: ItemCreationContext): string | undefined;
    function GetDelvePreviewItemQuality(itemID: number, context: ItemCreationContext): Enum.ItemQuality;
    function GetDetailedItemLevelInfo(itemInfo: ItemInfo): LuaMultiReturn<[actualItemLevel: number | undefined, previewLevel: boolean | undefined, sparseItemLevel: number | undefined]>;
    function GetFirstTriggeredSpellForItem(itemID: number, itemQuality: number): number | undefined;
    function GetItemChildInfo(itemInfo: ItemInfo, slotID?: number): number[];
    function GetItemClassInfo(itemClassID: number): string;
    function GetItemConversionOutputIcon(itemLoc: ItemLocationMixin): number | undefined;
    function GetItemCooldown(itemInfo: ItemInfo): LuaMultiReturn<[startTimeSeconds: number, durationSeconds: number, enableCooldownTimer: boolean]>;
    function GetItemCount(itemInfo: ItemInfo, includeBank?: boolean, includeUses?: boolean, includeReagentBank?: boolean, includeAccountBank?: boolean): number;
    function GetItemCreationContext(itemInfo: ItemInfo): LuaMultiReturn<[itemID: number, creationContext: string]>;
    function GetItemFamily(itemInfo: ItemInfo): number | undefined;
    function GetItemGem(hyperlink: string, index: number): LuaMultiReturn<[gemName: string | undefined, gemLink: string | undefined]>;
    function GetItemGemID(itemInfo: ItemInfo, index: number): number | undefined;
    function GetItemGUID(itemLocation: ItemLocationMixin): string;
    function GetItemIcon(itemLocation: ItemLocationMixin): number | undefined;
    function GetItemIconByID(itemInfo: ItemInfo): number | undefined;
    function GetItemID(itemLocation: ItemLocationMixin): number;
    function GetItemIDByGUID(itemGUID: string): number | undefined;
    function GetItemIDForItemInfo(itemInfo: ItemInfo): number;
    function GetItemInfo(itemInfo: ItemInfo): LuaMultiReturn<[itemName: string | undefined, itemLink: string | undefined, itemQuality: Enum.ItemQuality | undefined, itemLevel: number | undefined, itemMinLevel: number | undefined, itemType: string | undefined, itemSubType: string | undefined, itemStackCount: number | undefined, itemEquipLoc: string | undefined, itemTexture: number | undefined, sellPrice: number | undefined, classID: number | undefined, subclassID: number | undefined, bindType: number | undefined, expansionID: number | undefined, setID: number | undefined, isCraftingReagent: boolean | undefined, itemDescription: string | undefined]>;
    function GetItemInfoInstant(itemInfo: ItemInfo): LuaMultiReturn<[itemID: number | undefined, itemType: string | undefined, itemSubType: string | undefined, itemEquipLoc: string | undefined, icon: number | undefined, classID: number | undefined, subClassID: number | undefined]>;
    function GetItemInventorySlotInfo(inventorySlot: Enum.InventoryType): string;
    function GetItemInventorySlotKey(inventorySlot: Enum.InventoryType): string;
    function GetItemInventoryType(itemLocation: ItemLocationMixin): Enum.InventoryType | undefined;
    function GetItemInventoryTypeByID(itemInfo: ItemInfo): Enum.InventoryType | undefined;
    function GetItemLearnTransmogSet(itemInfo: ItemInfo): number | undefined;
    function GetItemLink(itemLocation: ItemLocationMixin): string | undefined;
    function GetItemLinkByGUID(itemGUID: string): string | undefined;
    function GetItemLocation(itemGUID: string): ItemLocationMixin | undefined;
    function GetItemMaxStackSize(itemLocation: ItemLocationMixin): number | undefined;
    function GetItemMaxStackSizeByID(itemInfo: ItemInfo): number | undefined;
    function GetItemName(itemLocation: ItemLocationMixin): string | undefined;
    function GetItemNameByID(itemInfo: ItemInfo): string | undefined;
    function GetItemNumAddedSockets(itemInfo: ItemInfo): number;
    function GetItemNumSockets(itemInfo: ItemInfo): number;
    function GetItemQuality(itemLocation: ItemLocationMixin): Enum.ItemQuality | undefined;
    function GetItemQualityByID(itemInfo: ItemInfo): Enum.ItemQuality | undefined;
    function GetItemQualityColor(quality: Enum.ItemQuality): LuaMultiReturn<[colorRGBR: number, colorRGBG: number, colorRGBB: number, qualityString: string]>;
    function GetItemSetInfo(setID: number): string;
    function GetItemSpecInfo(itemInfo: ItemInfo): number[] | undefined;
    function GetItemSpell(itemInfo: ItemInfo): LuaMultiReturn<[spellName: string | undefined, spellID: number | undefined]>;
    function GetItemStatDelta(itemLink1: string, itemLink2: string): any | undefined;
    function GetItemStats(itemLink: string): any | undefined;
    function GetItemSubClassInfo(itemClassID: number, itemSubClassID: number): LuaMultiReturn<[subClassName: string | undefined, subClassUsesInvType: boolean | undefined]>;
    function GetItemUniqueness(itemInfo: ItemInfo): LuaMultiReturn<[limitCategory: number | undefined, limitMax: number | undefined]>;
    function GetItemUniquenessByID(itemInfo: ItemInfo): LuaMultiReturn<[isUnique: boolean | undefined, limitCategoryName: string | undefined, limitCategoryCount: number | undefined, limitCategoryID: number | undefined]>;
    function GetItemUpgradeInfo(itemInfo: ItemInfo): ItemUpgradeInfo | undefined;
    function GetLimitedCurrencyItemInfo(itemInfo: ItemInfo): LuaMultiReturn<[name: string | undefined, icon: number | undefined, quantity: number | undefined, maxQuantity: number | undefined, totalEarned: number | undefined]>;
    function GetSetBonusesForSpecializationByItemID(specID: number, itemID: number): number[] | undefined;
    function GetStackCount(itemLocation: ItemLocationMixin): number;
    function GetWeaponEnchantInfo(weaponSlot: Enum.WeaponSlot): WeaponEnchantInfo[];
    function IsAnimaItemByID(itemInfo: ItemInfo): boolean;
    function IsArtifactPowerItem(itemInfo: ItemInfo): boolean;
    function IsBound(itemLocation: ItemLocationMixin): boolean;
    /** You can use IsItemBindToAccountUntilEquip instead if the item is not in your inventory */
    function IsBoundToAccountUntilEquip(itemLocation: ItemLocationMixin): boolean;
    function IsConsumableItem(itemInfo: ItemInfo): boolean;
    function IsCorruptedItem(itemInfo: ItemInfo): boolean | undefined;
    function IsCosmeticItem(itemInfo: ItemInfo): boolean | undefined;
    /** Returns whether the item is a consumable curio that can be applied to a delves companion. */
    function IsCurioItem(itemInfo: ItemInfo): boolean | undefined;
    function IsCurrentItem(itemInfo: ItemInfo): boolean;
    /** Returns whether the item is a consumable decor item. */
    function IsDecorItem(itemInfo: ItemInfo): boolean | undefined;
    function IsDressableItemByID(itemInfo: ItemInfo): boolean;
    function IsEquippableItem(itemInfo: ItemInfo): boolean;
    function IsEquippedItem(itemInfo: ItemInfo): boolean;
    function IsEquippedItemType(type: string): boolean;
    function IsHarmfulItem(itemInfo: ItemInfo): boolean;
    function IsHelpfulItem(itemInfo: ItemInfo): boolean;
    function IsItemBindToAccount(itemInfo: ItemInfo): boolean;
    /** You can use IsBoundToAccountUntilEquip instead if the item exists in your inventory */
    function IsItemBindToAccountUntilEquip(itemInfo: ItemInfo): boolean;
    function IsItemConduit(itemLoc: ItemLocationMixin): boolean;
    function IsItemConvertibleAndValidForPlayer(itemLoc: ItemLocationMixin): boolean;
    function IsItemCorrupted(itemLoc: ItemLocationMixin): boolean;
    function IsItemCorruptionRelated(itemLoc: ItemLocationMixin): boolean;
    function IsItemCorruptionResistant(itemLoc: ItemLocationMixin): boolean;
    function IsItemDataCached(itemLocation: ItemLocationMixin): boolean;
    function IsItemDataCachedByID(itemInfo: ItemInfo): boolean;
    function IsItemGUIDInInventory(itemGUID: string): boolean;
    function IsItemInRange(itemInfo: ItemInfo, targetToken: string): boolean | undefined;
    function IsItemKeystoneByID(itemInfo: ItemInfo): boolean;
    function IsItemSpecificToPlayerClass(itemInfo: ItemInfo): boolean;
    function IsLocked(itemLocation: ItemLocationMixin): boolean;
    /** Returns whether the item is a consumable relic  that can be applied to an artifact weapon. */
    function IsRelicItem(itemInfo: ItemInfo): boolean | undefined;
    function IsUsableItem(itemInfo: ItemInfo): LuaMultiReturn<[usable: boolean, noMana: boolean]>;
    function ItemHasRange(itemInfo: ItemInfo): boolean;
    function LockItem(itemLocation: ItemLocationMixin): void;
    function LockItemByGUID(itemGUID: string): void;
    function PickupItem(itemInfo: ItemInfo): void;
    function ReplaceEnchant(): void;
    function ReplaceTradeEnchant(): void;
    function ReplaceTradeskillEnchant(): void;
    function RequestLoadItemData(itemLocation: ItemLocationMixin): void;
    function RequestLoadItemDataByID(itemInfo: ItemInfo): void;
    function UnlockItem(itemLocation: ItemLocationMixin): void;
    function UnlockItemByGUID(itemGUID: string): void;
    function UseItemByName(itemInfo: ItemInfo, target?: string): void;
}

declare namespace C_ItemInteraction {
    function ClearPendingItem(): void;
    function CloseUI(): void;
    function GetChargeInfo(): ItemInteractionChargeInfo;
    function GetItemConversionCurrencyCost(item: ItemLocationMixin): ConversionCurrencyCost;
    function GetItemInteractionInfo(): ItemInteractionFrameInfo | undefined;
    function GetItemInteractionSpellId(): number;
    function InitializeFrame(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PerformItemInteraction(): void;
    function Reset(): void;
    function SetPendingItem(item?: ItemLocationMixin): boolean;
}

declare namespace C_ItemSocketInfo {
    function AcceptSockets(): void;
    function ClickSocketButton(index: number): void;
    function CloseSocketInfo(): void;
    function CompleteSocketing(): void;
    function GetCurrUIType(): Enum.ItemSocketInfoUIType;
    function GetExistingSocketInfo(index: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, gemMatchesSocket: boolean]>;
    function GetExistingSocketLink(index: number): string | undefined;
    function GetNewSocketInfo(index: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, gemMatchesSocket: boolean]>;
    function GetNewSocketLink(index: number): string | undefined;
    function GetNumSockets(): number;
    function GetSocketItemBoundTradeable(): boolean;
    function GetSocketItemInfo(): LuaMultiReturn<[name: string | undefined, icon: number | undefined, quality: Enum.ItemQuality]>;
    function GetSocketItemRefundable(): boolean;
    function GetSocketTypes(index: number): string | undefined;
    function HasBoundGemProposed(): boolean;
    function IsArtifactRelicItem(info: ItemInfo): boolean;
}

declare namespace C_ItemUpgrade {
    function CanUpgradeItem(baseItem: ItemLocationMixin): boolean;
    function ClearItemUpgrade(): void;
    function CloseItemUpgrade(): void;
    function GetHighWatermarkForItem(itemInfo: ItemInfo): LuaMultiReturn<[characterHighWatermark: number | undefined, accountHighWatermark: number | undefined]>;
    function GetHighWatermarkForSlot(itemRedundancySlot: number): LuaMultiReturn<[characterHighWatermark: number | undefined, accountHighWatermark: number | undefined]>;
    function GetHighWatermarkSlotForItem(itemInfo: ItemInfo): number | undefined;
    function GetItemHyperlink(): string | undefined;
    function GetItemUpgradeCurrentLevel(): LuaMultiReturn<[itemLevel: number | undefined, isPvpItemLevel: boolean | undefined]>;
    function GetItemUpgradeEffect(effectIndex: number, numUpgradeLevels?: number): LuaMultiReturn<[outBaseEffect: string | undefined, outUpgradedEffect: string | undefined]>;
    function GetItemUpgradeItemInfo(): ItemUpgradeItemInfo | undefined;
    function GetItemUpgradePvpItemLevelDeltaValues(numUpgradeLevels: number): LuaMultiReturn<[currentPvPItemLevel: number | undefined, upgradedPvPItemLevel: number | undefined]>;
    function GetNumItemUpgradeEffects(): number;
    function IsItemBound(): boolean;
    function SetItemUpgradeFromCursorItem(): void;
    function SetItemUpgradeFromLocation(itemToSet: ItemLocationMixin): void;
    function UpgradeItem(numUpgrades?: number): void;
}

declare namespace C_KeyBindings {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ActivateBindingContext(newContext: Enum.BindingContext): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DeactivateBindingContext(context: Enum.BindingContext): void;
    function GetBindingByKey(action: string, context?: Enum.BindingContext): string;
    function GetBindingContextForAction(action: string): Enum.BindingContext | undefined;
    function GetBindingIndex(action: string): number | undefined;
    function GetCustomBindingType(bindingIndex: number): Enum.CustomBindingType | undefined;
    function GetSearchTagsForAction(action: string): string[] | undefined;
    function GetTurnStrafeStyle(): Enum.TurnStrafeStyle;
    function IsBindingContextActive(context: Enum.BindingContext): boolean;
    /** Can only set to Modern or Legacy. */
    function SetTurnStrafeStyle(style: Enum.TurnStrafeStyle): void;
    function UpdateTurnStrafeBindingsForCharacter(): void;
}

declare namespace C_LegendaryCrafting {
    function CloseRuneforgeInteraction(): void;
    function CraftRuneforgeLegendary(description: RuneforgeLegendaryCraftDescription): void;
    function GetRuneforgeItemPreviewInfo(baseItem: ItemLocationMixin, runeforgePowerID?: number, modifiers?: number[]): RuneforgeItemPreviewInfo | undefined;
    function GetRuneforgeLegendaryComponentInfo(runeforgeLegendary: ItemLocationMixin): RuneforgeLegendaryComponentInfo;
    function GetRuneforgeLegendaryCost(baseItem: ItemLocationMixin): CurrencyCost[];
    function GetRuneforgeLegendaryCraftSpellID(): number;
    function GetRuneforgeLegendaryCurrencies(): number[];
    function GetRuneforgeLegendaryUpgradeCost(runeforgeLegendary: ItemLocationMixin, upgradeItem: ItemLocationMixin): CurrencyCost[];
    function GetRuneforgeModifierInfo(baseItem: ItemLocationMixin, powerID: number | undefined, addedModifierIndex: number, modifiers: number[]): LuaMultiReturn<[name: string, description: string[]]>;
    function GetRuneforgeModifiers(): number[];
    function GetRuneforgePowerInfo(runeforgePowerID: number): RuneforgePower;
    function GetRuneforgePowers(baseItem?: ItemLocationMixin, filter?: Enum.RuneforgePowerFilter): LuaMultiReturn<[primaryRuneforgePowerIDs: number[], otherRuneforgePowerIDs: number[]]>;
    function GetRuneforgePowersByClassSpecAndCovenant(classID?: number, specID?: number, covenantID?: number, filter?: Enum.RuneforgePowerFilter): number[];
    function GetRuneforgePowerSlots(runeforgePowerID: number): string[];
    function IsRuneforgeLegendary(item: ItemLocationMixin): boolean;
    function IsRuneforgeLegendaryMaxLevel(runeforgeLegendary: ItemLocationMixin): boolean;
    function IsUpgradeItemValidForRuneforgeLegendary(runeforgeLegendary: ItemLocationMixin, upgradeItem: ItemLocationMixin): boolean;
    function IsValidRuneforgeBaseItem(baseItem: ItemLocationMixin): boolean;
    function MakeRuneforgeCraftDescription(baseItem: ItemLocationMixin, runeforgePowerID: number, modifiers: number[]): RuneforgeLegendaryCraftDescription;
    function UpgradeRuneforgeLegendary(runeforgeLegendary: ItemLocationMixin, upgradeItem: ItemLocationMixin): void;
}

declare namespace C_LevelLink {
    function IsActionLocked(actionID: number): boolean;
    function IsSpellLocked(spellID: number): boolean;
}

declare namespace C_LevelSquish {
    function ConvertFollowerLevel(level: number, maxFollowerLevel: number): number;
    function ConvertPlayerLevel(level: number): number;
}

declare namespace C_LFGInfo {
    function AreCrossFactionGroupQueuesAllowed(lfgDungeonID: number): boolean;
    function CanPlayerUseGroupFinder(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseLFD(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseLFR(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUsePremadeGroup(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUsePVP(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseScenarioFinder(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function ConfirmLfgExpandSearch(): void;
    function DoesActivePartyMeetPremadeLaunchCount(lfgDungeonID: number): boolean;
    function DoesCrossFactionQueueRequireFullPremade(lfgDungeonID: number): boolean;
    function GetActiveLFGDungeonName(): string;
    function GetAllEntriesForCategory(category: number): number[];
    function GetDungeonInfo(lfgDungeonID: number): LFGDungeonInfo | undefined;
    function GetLevelUpInstances(currPlayerLevel: number, isRaid: boolean): number[];
    function GetLFDLockStates(): LFGLockInfo[];
    function GetRoleCheckDifficultyDetails(): LuaMultiReturn<[maxLevel: number | undefined, isLevelReduced: boolean]>;
    function HideNameFromUI(dungeonID: number): boolean;
    function IsGroupFinderEnabled(): boolean;
    function IsInLFGFollowerDungeon(): boolean;
    function IsInMatchmadeRaidWithoutRoleRequirements(): boolean;
    function IsLFDEnabled(): boolean;
    function IsLFGFollowerDungeon(dungeonID: number): boolean;
    function IsLFREnabled(): boolean;
}

declare namespace C_LFGList {
    function CanActiveEntryUseAutoAccept(): boolean;
    function CanCreateQuestGroup(questID: number): boolean;
    function CanCreateScenarioGroup(scenarioID: number): boolean;
    function ClearApplicationTextFields(): void;
    function ClearCreationTextFields(): void;
    function ClearSearchTextFields(): void;
    function ConfirmCensoredActiveEntry(): void;
    function CopyActiveEntryInfoToCreationFields(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CreateListing(createData: LfgListingCreateData): boolean;
    function CreateScenarioListing(activityID: number, itemLevel: number, autoAccept: boolean, privateGroup: boolean, scenarioID: number): boolean;
    function DoesCensoredTextMatch(name: string, comment: string): boolean;
    function DoesEntryTitleMatchPrebuiltTitle(activityID: number, groupID: number, playstyle?: Enum.LFGEntryPlaystyle, generalPlaystyle?: Enum.LFGEntryGeneralPlaystyle): boolean;
    function GetActiveEntryInfo(): LfgEntryData | undefined;
    function GetActivityFullName(activityID: number, questID?: number, showWarmode?: boolean): string;
    function GetActivityGroupInfo(groupID: number): LuaMultiReturn<[name: string | undefined, orderIndex: number | undefined]>;
    function GetActivityInfoTable(activityID: number, questID?: number, showWarmode?: boolean): GroupFinderActivityInfo | undefined;
    function GetAdvancedFilter(): AdvancedFilterOptions;
    function GetApplicantBestDungeonScore(localID: number, applicantIndex: number): BestDungeonScoreMapInfo | undefined;
    function GetApplicantDungeonScoreForListing(localID: number, applicantIndex: number, activityID: number): BestDungeonScoreMapInfo | undefined;
    function GetApplicantInfo(applicantID: number): LfgApplicantData | undefined;
    function GetApplicantPvpRatingInfoForListing(localID: number, applicantIndex: number, activityID: number): PvpRatingInfo | undefined;
    function GetAvailableActivityGroups(categoryID: number, filter?: number): number[];
    function GetFilteredSearchResults(): LuaMultiReturn<[totalResultsFound: number, filteredResults: number[]]>;
    function GetGroupLeaverCountsByRole(): LuaMultiReturn<[tankLeavers: number, healerLeavers: number, damageLeavers: number]>;
    function GetKeystoneForActivity(activityID: number): number | undefined;
    function GetLfgCategoryInfo(categoryID: number): LfgCategoryData | undefined;
    function GetOwnedKeystoneActivityAndGroupAndLevel(getTimewalking?: boolean): LuaMultiReturn<[activityID: number | undefined, groupID: number | undefined, keystoneLevel: number | undefined]>;
    function GetPlaystyleString(playstyle: Enum.LFGEntryPlaystyle, generalPlaystyle: Enum.LFGEntryGeneralPlaystyle, activityInfo: GroupFinderActivityInfo): string;
    function GetPremadeGroupFinderStyle(): Enum.PremadeGroupFinderStyle;
    function GetSearchResultInfo(searchResultID: number): LfgSearchResultData | undefined;
    function GetSearchResultLeaderInfo(searchResultID: number): LfgSearchResultPlayerInfo | undefined;
    function GetSearchResultPlayerInfo(searchResultID: number, memberIndex: number): LfgSearchResultPlayerInfo | undefined;
    function GetSearchResults(): LuaMultiReturn<[totalResultsFound: number, results: number[]]>;
    function HasActiveEntryInfo(): boolean;
    function HasSearchResultInfo(searchResultID: number): boolean;
    function IsCensoredActiveEntryUnresolved(): boolean;
    function IsPlayerAuthenticatedForLFG(activityCategoryID?: number): boolean;
    function IsPlayerValidForEndgameFieldEdits(): boolean;
    function IsPremadeGroupFinderEnabled(): boolean;
    function ListingUsesEndgameEditRestrictions(activityID: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ReportGroupAsAdvertisement(searchResultID: number): void;
    function RevealCensoredActiveEntry(): void;
    function RevealCensoredSearchResult(searchResultID: number): void;
    function SaveAdvancedFilter(options: AdvancedFilterOptions): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function Search(categoryID: number, filter?: number, preferredFilters?: number, languageFilter?: WowLocale, searchCrossFactionListings?: boolean, advancedFilter?: AdvancedFilterOptions, activityIDsFilter?: number[]): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetEntryTitle(activityID: number, groupID: number, playstyle?: Enum.LFGEntryPlaystyle, generalPlaystyle?: Enum.LFGEntryGeneralPlaystyle): void;
    function SetSearchToActivity(activityID: number): void;
    function SetSearchToQuestID(questID: number): void;
    function SetSearchToScenarioID(scenarioID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function UpdateListing(createData: LfgListingCreateData): boolean;
    function ValidateRequiredDungeonScore(dungeonScore: number): boolean;
    function ValidateRequiredPvpRatingForActivity(activityID: number, rating: number): boolean;
}

declare namespace C_LFGListRoles {
    function GetRoles(): LFGRoles | undefined;
    function GetSavedRoles(): LFGRoles | undefined;
    function SetRoles(roles: LFGRoles, limitToClassRoles?: boolean): boolean;
}

declare namespace C_LimitedInput {
    function LimitedInputAllowed(type: Enum.LimitedInputType): boolean;
}

declare namespace C_LiveEvent {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnLiveEventBannerClicked(timerunningSeasonID: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OnLiveEventPopupClicked(timerunningSeasonID: number): void;
}

declare namespace C_LobbyMatchmakerInfo {
    function AbandonQueue(): void;
    function EnterQueue(playlistEntry: PartyPlaylistEntry): void;
    function GetCurrQueuePlaylistEntry(): PartyPlaylistEntry;
    function GetCurrQueueState(): Enum.PlunderstormQueueState;
    function GetQueueFromMainlineEnabled(): boolean;
    function GetQueueStartTime(): number;
    function IsInQueue(): boolean;
    function RespondToQueuePop(acceptQueue: boolean): void;
}

declare namespace C_Log {
    function LogErrorMessage(message: string): void;
    function LogMessage(message: string): void;
    function LogMessageWithPriority(priority: Enum.LogPriority, message: string): void;
    function LogWarningMessage(message: string): void;
}

declare namespace C_Loot {
    function GetLootRollDuration(rollID: number): number | undefined;
    function IsLegacyLootModeEnabled(): boolean;
}

declare namespace C_LootFrame {
    function TryAutoLoot(): void;
}

declare namespace C_LootHistory {
    function GetAllEncounterInfos(): EncounterLootInfo[];
    function GetInfoForEncounter(encounterID: number): EncounterLootInfo | undefined;
    function GetLootHistoryTime(): number;
    function GetSortedDropsForEncounter(encounterID: number): EncounterLootDropInfo[] | undefined;
    function GetSortedInfoForDrop(encounterID: number, lootListKey: number): EncounterLootDropInfo | undefined;
}

declare namespace C_LootJournal {
    function GetItemSetItems(setID: number): LootJournalItemInfo[] | undefined;
    function GetItemSets(classID?: number, specID?: number): LootJournalItemSetInfo[] | undefined;
}

declare namespace C_LoreText {
    function RequestLoreTextForCampaignID(campaignID: number): void;
}

declare namespace C_LossOfControl {
    function GetActiveLossOfControlData(index: number): LossOfControlData | undefined;
    function GetActiveLossOfControlDataByUnit(unitToken: UnitToken, index: number): LossOfControlData | undefined;
    function GetActiveLossOfControlDataCount(): number;
    function GetActiveLossOfControlDataCountByUnit(unitToken: UnitToken): number;
    function GetActiveLossOfControlDuration(unitToken: UnitToken, index: number): LuaDurationObject | undefined;
}

declare namespace C_MacOptions {
    function AreOSShortcutsDisabled(): LuaMultiReturn<[osShortcutsDisabledCVar: boolean | undefined, osShortcutsDisabled: boolean]>;
    function GetGameBundleName(): string;
    function HasNewStyleInputMonitoring(): boolean;
    function IsInputMonitoringEnabled(): boolean;
    function IsMicrophoneEnabled(): boolean;
    function IsUniversalAccessEnabled(): boolean;
    function OpenInputMonitoring(): void;
    function OpenMicrophoneRequestDialogue(): void;
    function OpenUniversalAccess(): void;
    function SetOSShortcutsDisabled(disable: boolean): void;
}

declare namespace C_Macro {
    function GetMacroName(macroId: number): string | undefined;
    function GetSelectedMacroIcon(macroId: number): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RunMacroText(text: string, button: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetMacroExecuteLineCallback(cb: MacroExecuteLineCallback): void;
}

declare namespace C_Mail {
    function CanCheckInbox(): LuaMultiReturn<[canCheckInbox: boolean, secondsUntilAllowed: number]>;
    function GetCraftingOrderMailInfo(inboxIndex: number): CraftingOrderMailInfo | undefined;
    function HasInboxMoney(inboxIndex: number): boolean;
    function IsCommandPending(): boolean;
    function SetOpeningAll(openingAll: boolean): void;
}

declare namespace C_MajorFactions {
    function GetCurrentRenownLevel(majorFactionID: number): number;
    function GetMajorFactionData(majorFactionID: number): MajorFactionData | undefined;
    function GetMajorFactionIDs(expansionID?: number): number[];
    function GetMajorFactionProgressionInfo(majorFactionID: number): MajorFactionProgressionInfo | undefined;
    function GetMajorFactionRenownInfo(majorFactionID: number): MajorFactionRenownInfo | undefined;
    function GetRenownLevels(majorFactionID: number): MajorFactionRenownLevelInfo[];
    function GetRenownNPCFactionID(): number;
    function GetRenownRewardsForLevel(majorFactionID: number, renownLevel: number): MajorFactionRenownRewardInfo[];
    function GetTotalReputationForRenownLevel(majorFactionID: number, renownLevel: number): number;
    function HasMaximumRenown(majorFactionID: number): boolean;
    function IsMajorFactionHiddenFromExpansionPage(majorFactionID: number): boolean;
    function IsWeeklyRenownCapped(majorFactionID: number): boolean;
    function ShouldDisplayMajorFactionAsJourney(majorFactionID: number): boolean;
    function ShouldUseJourneyRewardTrack(majorFactionID: number): boolean;
}

declare namespace C_Map {
    function CanSetUserWaypointOnMap(uiMapID: number): boolean;
    function ClearUserWaypoint(): void;
    function CloseWorldMapInteraction(): void;
    function GetAreaInfo(areaID: number): string;
    /** Only works for the player and party members. */
    function GetBestMapForUnit(unitToken: UnitToken): number | undefined;
    function GetBountySetMaps(bountySetID: number): number[];
    function GetFallbackWorldMapID(): number;
    function GetMapArtBackgroundAtlas(uiMapID: number): string;
    function GetMapArtHelpTextPosition(uiMapID: number): Enum.MapCanvasPosition;
    function GetMapArtID(uiMapID: number): number | undefined;
    function GetMapArtLayers(uiMapID: number): UiMapLayerInfo[] | undefined;
    function GetMapArtLayerTextures(uiMapID: number, layerIndex: number): number[] | undefined;
    function GetMapArtZoneTextPosition(uiMapID: number): Enum.MapCanvasPosition;
    function GetMapBannersForMap(uiMapID: number): MapBannerInfo[];
    function GetMapChildrenInfo(uiMapID: number, mapType?: Enum.UIMapType, allDescendants?: boolean): UiMapDetails[] | undefined;
    function GetMapDisplayInfo(uiMapID: number): boolean | undefined;
    function GetMapGroupID(uiMapID: number): number | undefined;
    function GetMapGroupMembersInfo(uiMapGroupID: number): UiMapGroupMemberInfo[] | undefined;
    function GetMapHighlightInfoAtPosition(uiMapID: number, x: number, y: number): LuaMultiReturn<[fileDataID: number | undefined, atlasID: string | undefined, texturePercentageX: number | undefined, texturePercentageY: number | undefined, textureX: number | undefined, textureY: number | undefined, scrollChildX: number | undefined, scrollChildY: number | undefined]>;
    function GetMapHighlightPulseInfo(uiMapID: number): LuaMultiReturn<[fileDataID: number | undefined, atlasID: string | undefined, texturePercentageX: number | undefined, texturePercentageY: number | undefined, textureX: number | undefined, textureY: number | undefined, scrollChildX: number | undefined, scrollChildY: number | undefined]>;
    function GetMapInfo(uiMapID: number): UiMapDetails | undefined;
    function GetMapInfoAtPosition(uiMapID: number, x: number, y: number, ignoreZoneMapPositionData?: boolean): UiMapDetails | undefined;
    function GetMapLevels(uiMapID: number): LuaMultiReturn<[playerMinLevel: number | undefined, playerMaxLevel: number | undefined, petMinLevel: number | undefined, petMaxLevel: number | undefined]>;
    function GetMapLinksForMap(uiMapID: number): MapLinkInfo[];
    function GetMapPosFromWorldPos(continentID: number, worldPosition: Vector2DMixin, overrideUiMapID?: number): LuaMultiReturn<[uiMapID: number | undefined, mapPosition: Vector2DMixin | undefined]>;
    function GetMapRectOnMap(uiMapID: number, topUiMapID: number): LuaMultiReturn<[minX: number | undefined, maxX: number | undefined, minY: number | undefined, maxY: number | undefined]>;
    /** Returns the size in yards of the area represented by the map. */
    function GetMapWorldSize(uiMapID: number): LuaMultiReturn<[width: number, height: number]>;
    /** Only works for the player and party members. */
    function GetPlayerMapPosition(uiMapID: number, unitToken: UnitToken): Vector2DMixin | undefined;
    function GetUserWaypoint(): UiMapPoint | undefined;
    function GetUserWaypointFromHyperlink(hyperlink: string): UiMapPoint | undefined;
    function GetUserWaypointHyperlink(): string | undefined;
    function GetUserWaypointPositionForMap(uiMapID: number): Vector2DMixin | undefined;
    function GetWorldPosFromMapPos(uiMapID: number, mapPosition: Vector2DMixin): LuaMultiReturn<[continentID: number | undefined, worldPosition: Vector2DMixin | undefined]>;
    function HasUserWaypoint(): boolean;
    function IsCityMap(uiMapID: number): boolean;
    function IsMapValidForNavBarDropdown(uiMapID: number): boolean;
    function MapHasArt(uiMapID: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OpenWorldMap(uiMapID?: number): void;
    function RequestPreloadMap(uiMapID: number): void;
    function SetUserWaypoint(point: UiMapPoint): boolean;
}

declare namespace C_MapExplorationInfo {
    function GetExploredAreaIDsAtPosition(uiMapID: number, normalizedPosition: Vector2DMixin): number[] | undefined;
    function GetExploredMapTextures(uiMapID: number): UiMapExplorationInfo[] | undefined;
}

declare namespace C_MerchantFrame {
    function GetBuybackItemID(buybackSlotIndex: number): number | undefined;
    function GetItemInfo(index: number): MerchantItemInfo | undefined;
    function GetMerchantCurrencies(): number[] | undefined;
    function GetNumJunkItems(): number;
    function IsMerchantItemRefundable(index: number): boolean;
    function IsSellAllJunkEnabled(): boolean;
    function SellAllJunkItems(): void;
}

declare namespace C_Minimap {
    function CanTrackBattlePets(): boolean;
    function ClearAllTracking(): void;
    function ClearMinimapInsetInfo(): void;
    function GetDefaultTrackingValue(filterType: Enum.MinimapTrackingFilter): boolean;
    function GetDrawGroundTextures(): boolean;
    function GetNumQuestPOIWorldEffects(): number;
    function GetNumTrackingTypes(): number;
    function GetPOITextureCoords(index?: number): LuaMultiReturn<[textureCoordsX: number, textureCoordsY: number, textureCoordsZ: number, textureCoordsW: number]>;
    function GetTrackingFilter(spellIndex: number): MinimapScriptTrackingFilter;
    function GetTrackingInfo(spellIndex: number): MinimapScriptTrackingInfo | undefined;
    function GetUiMapID(): number | undefined;
    function GetViewRadius(): number;
    function IsFilteredOut(filterType: Enum.MinimapTrackingFilter): boolean;
    function IsInsideQuestBlob(questID: number): boolean;
    function IsRotateMinimapIgnored(): boolean;
    function IsTrackingAccountCompletedQuests(): boolean;
    function IsTrackingBattlePets(): boolean;
    function IsTrackingHiddenQuests(): boolean;
    function SetDrawGroundTextures(draw: boolean): void;
    function SetIgnoreRotateMinimap(ignore: boolean): void;
    function SetMinimapInsetInfo(minAngle: number, maxAngle: number, scalar: number): void;
    function SetTracking(index: number, on: boolean): void;
    function ShouldUseHybridMinimap(): boolean;
}

declare namespace C_ModelInfo {
    /** This function does nothing in public clients */
    function AddActiveModelScene(modelSceneFrame: ModelScene, modelSceneID: number): void;
    /** This function does nothing in public clients */
    function AddActiveModelSceneActor(modelSceneFrameActor: ModelSceneActor, modelSceneActorID: number): void;
    /** This function does nothing in public clients */
    function ClearActiveModelScene(modelSceneFrame: ModelScene): void;
    /** This function does nothing in public clients */
    function ClearActiveModelSceneActor(modelSceneFrameActor: ModelSceneActor): void;
    function GetModelSceneActorDisplayInfoByID(modelActorDisplayID: number): UIModelSceneActorDisplayInfo | undefined;
    function GetModelSceneActorInfoByID(modelActorID: number): UIModelSceneActorInfo | undefined;
    function GetModelSceneCameraInfoByID(modelSceneCameraID: number): UIModelSceneCameraInfo | undefined;
    function GetModelSceneInfoByID(modelSceneID: number): LuaMultiReturn<[modelSceneType: Enum.ModelSceneType | undefined, modelCameraIDs: number[] | undefined, modelActorsIDs: number[] | undefined, flags: number | undefined]>;
}

declare namespace C_ModifiedInstance {
    function GetModifiedInstanceInfoFromMapID(mapID: number): ModifiedInstanceInfo | undefined;
}

declare namespace C_MountJournal {
    function ApplyMountEquipment(itemLocation: ItemLocationMixin): boolean;
    function AreMountEquipmentEffectsSuppressed(): boolean;
    function ClearFanfare(mountID: number): void;
    function ClearRecentFanfares(): void;
    function Dismiss(): void;
    function GetAllCreatureDisplayIDsForMountID(mountID: number): number[];
    function GetAppliedMountEquipmentID(): number | undefined;
    function GetCollectedDragonridingMounts(): number[];
    function GetCollectedFilterSetting(filterIndex: number): boolean;
    function GetDisplayedMountAllCreatureDisplayInfo(mountIndex: number): MountCreatureDisplayInfo[] | undefined;
    function GetDisplayedMountID(displayIndex: number): number;
    function GetDisplayedMountInfo(displayIndex: number): LuaMultiReturn<[name: string | undefined, spellID: number | undefined, icon: number | undefined, isActive: boolean | undefined, isUsable: boolean | undefined, sourceType: number | undefined, isFavorite: boolean | undefined, isFactionSpecific: boolean | undefined, faction: Enum.PvPFaction | undefined, shouldHideOnChar: boolean | undefined, isCollected: boolean | undefined, mountID: number | undefined, isSteadyFlight: boolean | undefined]>;
    function GetDisplayedMountInfoExtra(mountIndex: number): LuaMultiReturn<[creatureDisplayInfoID: number | undefined, description: string | undefined, source: string | undefined, isSelfMount: boolean | undefined, mountTypeID: number | undefined, uiModelSceneID: number | undefined, animID: number | undefined, spellVisualKitID: number | undefined, disablePlayerMountPreview: boolean | undefined]>;
    function GetDynamicFlightModeSpellID(): number;
    function GetIsFavorite(mountIndex: number): LuaMultiReturn<[isFavorite: boolean, canSetFavorite: boolean]>;
    function GetMountAllCreatureDisplayInfoByID(mountID: number): MountCreatureDisplayInfo[] | undefined;
    function GetMountEquipmentUnlockLevel(): number;
    function GetMountFromItem(itemID: number): number | undefined;
    function GetMountFromSpell(spellID: number | string): number | undefined;
    function GetMountIDs(): number[];
    function GetMountInfoByID(mountID: number): LuaMultiReturn<[name: string | undefined, spellID: number | undefined, icon: number | undefined, isActive: boolean | undefined, isUsable: boolean | undefined, sourceType: number | undefined, isFavorite: boolean | undefined, isFactionSpecific: boolean | undefined, faction: Enum.PvPFaction | undefined, shouldHideOnChar: boolean | undefined, isCollected: boolean | undefined, mountID: number | undefined, isSteadyFlight: boolean | undefined]>;
    function GetMountInfoExtraByID(mountID: number): LuaMultiReturn<[creatureDisplayInfoID: number | undefined, description: string | undefined, source: string | undefined, isSelfMount: boolean | undefined, mountTypeID: number | undefined, uiModelSceneID: number | undefined, animID: number | undefined, spellVisualKitID: number | undefined, disablePlayerMountPreview: boolean | undefined]>;
    function GetMountLink(spellID: number): string | undefined;
    function GetMountUsabilityByID(mountID: number, checkIndoors: boolean): LuaMultiReturn<[isUsable: boolean | undefined, useError: string | undefined]>;
    function GetNumDisplayedMounts(): number;
    function GetNumMounts(): number;
    function GetNumMountsNeedingFanfare(): number;
    function HasDisplayableMount(): boolean;
    /** Returns whether the player has unlocked the ability to switch between Skyriding and steady flight styles for flying mounts . */
    function IsDragonridingUnlocked(): boolean;
    /** Determines if the item is mount equipment based on its class and subclass. */
    function IsItemMountEquipment(itemLocation: ItemLocationMixin): boolean;
    function IsMountEquipmentApplied(): boolean;
    function IsSourceChecked(filterIndex: number): boolean;
    function IsTypeChecked(filterIndex: number): boolean;
    function IsUsingDefaultFilters(): boolean;
    function IsValidSourceFilter(filterIndex: number): boolean;
    function IsValidTypeFilter(filterIndex: number): boolean;
    function MountEquipmentAvailable(): boolean;
    function NeedsFanfare(mountID: number): boolean;
    function Pickup(displayIndex: number): void;
    function PickupDynamicFlightMode(): void;
    function SetAllSourceFilters(isChecked: boolean): void;
    function SetAllTypeFilters(isChecked: boolean): void;
    function SetCollectedFilterSetting(filterIndex: number, isChecked: boolean): void;
    function SetDefaultFilters(): void;
    function SetIsFavorite(mountIndex: number, isFavorite: boolean): void;
    function SetSearch(searchValue: string): void;
    function SetSourceFilter(filterIndex: number, isChecked: boolean): void;
    function SetTypeFilter(filterIndex: number, isChecked: boolean): void;
    function SummonByID(mountID: number): void;
    function SwapDynamicFlightMode(): void;
}

declare namespace C_MythicPlus {
    function GetCurrentAffixes(): MythicPlusKeystoneAffix[] | undefined;
    function GetCurrentSeason(): number;
    function GetCurrentSeasonValues(): LuaMultiReturn<[displaySeasonID: number, milestoneSeasonID: number, rewardSeasonID: number]>;
    function GetCurrentUIDisplaySeason(): number | undefined;
    function GetEndOfRunGearSequenceLevel(keystoneLevel: number): number | undefined;
    function GetLastWeeklyBestInformation(): LuaMultiReturn<[challengeMapId: number | undefined, level: number | undefined]>;
    function GetOwnedKeystoneChallengeMapID(): number | undefined;
    function GetOwnedKeystoneLevel(): number | undefined;
    function GetOwnedKeystoneMapID(): number | undefined;
    function GetRewardLevelForDifficultyLevel(difficultyLevel: number): LuaMultiReturn<[weeklyRewardLevel: number, endOfRunRewardLevel: number]>;
    function GetRewardLevelFromKeystoneLevel(keystoneLevel: number): number | undefined;
    function GetRunHistory(includePreviousWeeks?: boolean, includeIncompleteRuns?: boolean, currentSeasonOnly?: boolean): MythicPlusRunInfo[];
    /** Gets the active players best runs by the seasonal tracked affixes as well as their overall score for the current season. */
    function GetSeasonBestAffixScoreInfoForMap(mapChallengeModeID: number): LuaMultiReturn<[affixScores: MythicPlusAffixScoreInfo[] | undefined, bestOverAllScore: number | undefined]>;
    function GetSeasonBestForMap(mapChallengeModeID: number): LuaMultiReturn<[intimeInfo: MapSeasonBestInfo | undefined, overtimeInfo: MapSeasonBestInfo | undefined]>;
    function GetSeasonBestMythicRatingFromThisExpansion(): LuaMultiReturn<[bestSeasonScore: number | undefined, bestSeason: number | undefined]>;
    function GetWeeklyBestForMap(mapChallengeModeID: number): LuaMultiReturn<[durationSec: number | undefined, level: number | undefined, completionDate: CalendarTime | undefined, affixIDs: number[] | undefined, members: MythicPlusMember[] | undefined, dungeonScore: number | undefined]>;
    function GetWeeklyChestRewardLevel(): LuaMultiReturn<[currentWeekBestLevel: number, weeklyRewardLevel: number, nextDifficultyWeeklyRewardLevel: number, nextBestLevel: number]>;
    function IsMythicPlusActive(): boolean;
    function RequestCurrentAffixes(): void;
    function RequestMapInfo(): void;
    function RequestRewards(): void;
}

declare namespace C_NamePlate {
    function GetNamePlateForUnit(unitToken: UnitToken, includeForbidden?: boolean): NamePlate;
    function GetNamePlates(): NamePlate[];
    function GetNamePlateSize(): LuaMultiReturn<[width: number, height: number]>;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetNamePlateSize(width: number, height: number): void;
}

declare namespace C_NamePlateManager {
    /** Returns the values used to adjust the hit testing area for nameplates. */
    function GetNamePlateHitTestInsets(type: Enum.NamePlateType): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    /** Returns whether the unit to which the nameplate is attached is behind the player's camera. */
    function IsNamePlateUnitBehindCamera(unitToken: UnitToken): boolean;
    /**
     * Provide values to adjust the hit testing area for nameplates. Positive values will decrease the hit test area, negative values will increase it. Note that all hit testing is clamped to the bounds of the nameplate and can not be moved outside it.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetNamePlateHitTestInsets(type: Enum.NamePlateType, left: number, right: number, top: number, bottom: number): void;
    /** Set whether the nameplate attached to a unit is considered simplified, which can change the way it's displayed. */
    function SetNamePlateSimplified(unitToken: UnitToken, isSimplified: boolean): void;
}

declare namespace C_NameUtil {
    /** Replaces the character surname separator with a link separator in a full name string. */
    function ReplaceSurnameSeparatorWithLinkSeparator(fullName: string): string;
}

declare namespace C_Navigation {
    function GetDistance(): number;
    function GetFrame(): ScriptRegion | undefined;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetNearestPartyMemberToken(): string;
    function GetNextWaypointForMap(uiMapID: number): LuaMultiReturn<[x: number | undefined, y: number | undefined, waypointDescription: string | undefined]>;
    function GetTargetState(): Enum.NavigationState;
    function HasValidScreenPosition(): boolean;
    function WasClampedToScreen(): boolean;
}

declare namespace C_NeighborhoodInitiative {
    function AddTrackedInitiativeTask(initiativeTaskID: number): void;
    function GetActiveNeighborhood(): string;
    function GetAvailableHouseXP(): number;
    function GetInitiativeActivityLogInfo(): InitiativeActivityLogInfo | undefined;
    function GetInitiativeTaskChatLink(initiativeTaskID: number): string;
    function GetInitiativeTaskInfo(initiativeTaskID: number): InitiativeTaskInfo | undefined;
    function GetInitiativeTaskRewardScaling(taskID: number, numItems: number): number;
    function GetNeighborhoodInitiativeInfo(): NeighborhoodInitiativeInfo | undefined;
    function GetRequiredLevel(): number;
    function GetTrackedInitiativeTasks(): InitiativeTasksTracked;
    function IsInitiativeEnabled(): boolean;
    function IsPlayerInNeighborhoodGroup(): boolean;
    function IsViewingActiveNeighborhood(): boolean;
    function PlayerHasInitiativeAccess(): boolean;
    function PlayerMeetsRequiredLevel(): boolean;
    function RemoveTrackedInitiativeTask(initiativeTaskID: number): void;
    function RequestInitiativeActivityLog(): void;
    function RequestNeighborhoodInitiativeInfo(): void;
    function SetActiveNeighborhood(neighborhoodGUID: string): void;
    function SetViewingNeighborhood(neighborhoodGUID: string): void;
}

declare namespace C_NewItems {
    function ClearAll(): void;
    function IsNewItem(containerIndex: Enum.BagIndex, slotIndex: number): boolean;
    function RemoveNewItem(containerIndex: Enum.BagIndex, slotIndex: number): void;
}

declare namespace C_PaperDollInfo {
    function AmmoNeeded(): boolean;
    function CanAutoEquipCursorItem(): boolean;
    /**
     * Cancels active temporary enchantments on inventory slot items. Imbue enchants take priority over temporary enchants.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function CancelTemporaryEnchantment(slot: number): void;
    function CursorCanGoInSlot(slotIndex: number): boolean;
    function GetArmorEffectiveness(armor: number, attackerLevel: number): number;
    function GetArmorEffectivenessAgainstTarget(armor: number): number | undefined;
    function GetInspectAzeriteItemEmpoweredChoices(unit: UnitToken, equipmentSlotIndex: number): number[] | undefined;
    function GetInspectGuildInfo(unitString: string): LuaMultiReturn<[achievementPoints: number, numMembers: number, guildName: string, realmName: string]>;
    function GetInspectItemLevel(unit: UnitToken): number;
    function GetInspectRatedBGBlitzData(): InspectPVPData;
    function GetInspectRatedBGData(): InspectRatedBGData;
    function GetInspectRatedSoloShuffleData(): InspectPVPData;
    function GetInventorySlotInfo(slotName: string): LuaMultiReturn<[invSlot: number | undefined, slotTexture: number | undefined, checkRelic: boolean | undefined]>;
    function GetInventorySlotInfoForInvSlot(invSlotValue: number): LuaMultiReturn<[invSlot: number | undefined, slotTexture: number | undefined, checkRelic: boolean | undefined, slotName: string | undefined]>;
    function GetMinItemLevel(): number | undefined;
    function GetStaggerPercentage(unit: UnitToken): LuaMultiReturn<[stagger: number, staggerAgainstTarget: number | undefined]>;
    /** Queries information about active temporary enchants on inventory slot items. Imbue enchants take priority over temporary enchants. */
    function GetTemporaryEnchantmentInfo(slot: number): TemporaryItemEnchantInfo | undefined;
    function IsInventorySlotEnabled(slotName: string): boolean;
    function IsRangedSlotShown(): boolean;
    function OffhandHasShield(): boolean;
    function OffhandHasWeapon(): boolean;
}

declare namespace C_PartyInfo {
    function AllowedToDoPartyConversion(toRaid: boolean): boolean;
    function CanFormCrossFactionParties(): boolean;
    function CanInvite(): boolean;
    /** Returns whether it's possible to start a vote at this time */
    function CanStartInstanceAbandonVote(): boolean;
    function ChallengeModeRestrictionsActive(): boolean;
    /**
     * Immediately convert to raid with no regard for potentially destructive actions.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function ConfirmConvertToRaid(): void;
    function ConfirmInviteTravelPass(targetName: string, targetGUID: string): void;
    /** Immediately invites the named unit to a party, with no regard for potentially destructive actions. */
    function ConfirmInviteUnit(targetName: string): void;
    /** Immediately leave the party with no regard for potentially destructive actions */
    function ConfirmLeaveParty(category?: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ConfirmReadyCheck(isReady: boolean): void;
    /** Immediately request an invite into the target party, this is the confirmation function to call after RequestInviteFromUnit, or if you would like to skip the confirmation process. */
    function ConfirmRequestInviteFromUnit(targetName: string, tank?: boolean, healer?: boolean, dps?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ConvertToParty(): void;
    /**
     * Usually this will convert to raid immediately. In some cases (e.g. PartySync) the user will be prompted to confirm converting to raid, because it's potentially destructive.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function ConvertToRaid(): void;
    function DelveTeleportOut(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DemoteAssistant(name: string, exactNameMatch?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DoCountdown(seconds: number): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DoReadyCheck(): void;
    function GetActiveCategories(): number[] | undefined;
    function GetAvailableLootMethods(): Enum.LootMethod[];
    /** Returns the total duration of the shutdown time after a vote passes and how much time is left before it ends */
    function GetInstanceAbandonShutdownTime(): LuaMultiReturn<[durationSeconds: number, timeLeftSeconds: number]>;
    /** Returns the total duration of the abandon vote cooldown and how much time is left before it ends */
    function GetInstanceAbandonVoteCooldownTime(): LuaMultiReturn<[durationSeconds: number | undefined, timeLeftSeconds: number | undefined]>;
    /** Returns values controlling the vote */
    function GetInstanceAbandonVoteRequirements(): LuaMultiReturn<[votesRequired: number, keystoneOwnerVoteWeight: number]>;
    /** Returns how the player voted, nil for not yet */
    function GetInstanceAbandonVoteResponse(): boolean | undefined;
    /** Returns the total duration of the vote and how much time is left before it ends */
    function GetInstanceAbandonVoteTime(): LuaMultiReturn<[durationSeconds: number, timeLeftSeconds: number]>;
    function GetInviteConfirmationInvalidQueues(inviteGUID: string): QueueSpecificInfo[] | undefined;
    function GetInviteReferralInfo(inviteGUID: string): LuaMultiReturn<[outReferredByGuid: string | undefined, outReferredByName: string | undefined, outRelationType: Enum.PartyRequestJoinRelation | undefined, outIsQuickJoin: boolean | undefined, outClubId: string | undefined]>;
    function GetLootMethod(): LuaMultiReturn<[method: Enum.LootMethod, masterLootPartyID: number | undefined, masterLooterRaidID: number | undefined]>;
    function GetLootMethodStyle(): Enum.LootMethodStyles;
    function GetMinItemLevel(avgItemLevelCategory: Enum.AvgItemLevelCategories): LuaMultiReturn<[minItemLevel: number, playerNameWithLowestItemLevel: string]>;
    function GetMinLevel(category?: number): number;
    /** Returns how many players have voted either way */
    function GetNumInstanceAbandonGroupVoteResponses(): number;
    function GetRestrictPings(): Enum.RestrictPingsTo;
    /** Attempt to invite the named unit to a party, requires confirmation in some cases (e.g. the party will convert to a raid, or if there is a party sync in progress). */
    function InviteUnit(targetName: string): void;
    function IsChallengeModeActive(): boolean;
    function IsChallengeModeKeystoneOwner(): boolean;
    function IsCrossFactionParty(category?: number): boolean;
    function IsDelveComplete(): boolean;
    function IsDelveInProgress(): boolean;
    function IsGUIDInGroup(guid: string, category?: number): boolean;
    function IsLootMethodAvailable(method: Enum.LootMethod): boolean;
    function IsPartyFull(category?: number): boolean;
    function IsPartyInJailersTower(): boolean;
    function IsPartyWalkIn(): boolean;
    function IsRaidListEnabled(): boolean;
    function IsRaidListSupported(): boolean;
    /** Usually this will leave the party immediately. In some cases (e.g. PartySync) the user will be prompted to confirm leaving the party, because it's potentially destructive */
    function LeaveParty(category?: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PromoteToAssistant(name: string, exactNameMatch?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PromoteToLeader(name: string, exactNameMatch?: boolean): void;
    /** Attempt to request an invite into the target party, requires confirmation in some cases (e.g. there is a party sync in progress). */
    function RequestInviteFromUnit(targetName: string, tank?: boolean, healer?: boolean, dps?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetEveryoneIsAssistant(isAssistant: boolean): boolean;
    /**
     * Vote on whether to abandon instance, true for yes, false for no
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetInstanceAbandonVoteResponse(response: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetLootMethod(method: Enum.LootMethod, lootMaster?: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetRestrictPings(restrictTo: Enum.RestrictPingsTo): void;
    /**
     * Start the vote
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function StartInstanceAbandonVote(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function UninviteUnit(name: string, reason?: string, exactNameMatch?: boolean): void;
}

declare namespace C_PartyPose {
    function ExtraAction(partyPoseID: number): void;
    function GetPartyPoseInfoByID(mapID: number): PartyPoseInfo | undefined;
    function GetPartyPoseInfoByMapID(mapID: number): PartyPoseInfo | undefined;
    function HasExtraAction(partyPoseID: number): boolean;
}

declare namespace C_PerksActivities {
    function AddTrackedPerksActivity(perksActivityID: number): void;
    function ClearPerksActivitiesPendingCompletion(): void;
    function GetAllPerksActivityTags(): PerksActivityTags;
    function GetPerksActivitiesInfo(): PerksActivitiesInfo;
    function GetPerksActivitiesPendingCompletion(): PerksActivitiesPending;
    function GetPerksActivityChatLink(perksActivityID: number): string;
    function GetPerksActivityInfo(perksActivityID: number): PerksActivityInfo | undefined;
    function GetPerksUIThemePrefix(): string;
    function GetTrackedPerksActivities(): PerksActivitiesTracked;
    function RemoveTrackedPerksActivity(perksActivityID: number): void;
}

declare namespace C_PerksProgram {
    function ClearFrozenPerksVendorItem(): void;
    function CloseInteraction(): void;
    function GetAvailableCategoryIDs(): number[];
    function GetAvailableVendorItemIDs(): number[];
    function GetCategoryInfo(categoryID: number): PerksVendorCategoryInfo;
    function GetCurrencyAmount(): number;
    function GetDraggedPerksVendorItem(): number;
    function GetFrozenPerksVendorItemInfo(): PerksVendorItemInfo | undefined;
    function GetPendingChestRewards(): PerksProgramPendingChestRewards[];
    function GetPerksProgramItemDisplayInfo(id: number): PerksProgramItemDisplayInfo;
    function GetTimeRemaining(vendorItemID: number): number;
    function GetVendorItemInfo(vendorItemID: number): PerksVendorItemInfo;
    function GetVendorItemInfoRefundTimeLeft(vendorItemID: number): number;
    function IsAttackAnimToggleEnabled(): boolean;
    function IsFrozenPerksVendorItem(perksVendorItemID: number): boolean;
    function IsMountSpecialAnimToggleEnabled(): boolean;
    function ItemSelectedTelemetry(perksVendorItemID: number): void;
    function PickupPerksVendorItem(perksVendorItemID: number): void;
    function RequestCartCheckout(perksVendorItemIDs: number[]): void;
    function RequestPendingChestRewards(): void;
    function RequestPurchase(perksVendorItemID: number): void;
    function RequestRefund(perksVendorItemID: number): void;
    function ResetHeldItemDragAndDrop(): void;
    function SetFrozenPerksVendorItem(): void;
}

declare namespace C_PetBattles {
    function GetBreedQuality(petOwner: Enum.BattlePetOwner, slot: number): Enum.BattlePetBreedQuality;
    function GetIcon(petOwner: Enum.BattlePetOwner, slot: number): number | undefined;
    function GetName(petOwner: Enum.BattlePetOwner, slot: number): LuaMultiReturn<[customName: string | undefined, speciesName: string | undefined]>;
    function IsPlayerNPC(): boolean;
    function IsWildBattle(): boolean;
}

declare namespace C_PetInfo {
    function CanPetEatItem(itemID: number): boolean;
    function GetPetFoodTypes(): string[];
    function GetPetHappiness(): LuaMultiReturn<[happiness: number | undefined, damagePercentage: number | undefined, loyaltyRate: number | undefined]>;
    function GetPetLoyalty(): string | undefined;
    function GetPetTalentTree(): string | undefined;
    function GetPetTamersForMap(uiMapID: number): PetTamerMapInfo[];
    function GetPetTrainingPoints(): LuaMultiReturn<[totalPoints: number, usedPoints: number]>;
    function GetPetUIModelSceneID(): number;
    function GetSpellForPetAction(actionID: number): number | undefined;
    function IsPetActionPassive(actionID: number): boolean;
    function IsPetOrderMoveToPending(): boolean;
    function PetAbandon(petNumber?: number): void;
    function PetAssistMode(): void;
    function PetRename(name: string, petNumber?: number, declensions?: string[]): void;
}

declare namespace C_PetJournal {
    function ClearHoveredBattlePet(): void;
    function ClearSearchFilter(): void;
    function DismissSummonedPet(petID: string): void;
    function GetDisplayIDByIndex(speciesID: number, index: number): number | undefined;
    function GetDisplayProbabilityByIndex(speciesID: number, index: number): number | undefined;
    function GetNonBattlePetLinkByIndex(index: number): string;
    function GetNumDisplays(speciesID: number): number | undefined;
    function GetNumPetsInJournal(creatureID: number): LuaMultiReturn<[maxAllowed: number, numPets: number]>;
    function GetOwnedPetIDs(): string[];
    function GetPetAbilityInfo(abilityID: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined, petType: number | undefined]>;
    function GetPetAbilityListTable(speciesID: number): PetAbilityLevelInfo[] | undefined;
    function GetPetInfoTableByPetID(petID: string): PetJournalPetInfo | undefined;
    function GetPetInfoTableBySpeciesID(speciesID: number): PetJournalPetInfo | undefined;
    function GetPetLoadOutInfo(slot: number): LuaMultiReturn<[petID: string | undefined, ability1ID: number | undefined, ability2ID: number | undefined, ability3ID: number | undefined, locked: boolean | undefined]>;
    function GetPetSummonInfo(battlePetGUID: string): LuaMultiReturn<[isSummonable: boolean, error: Enum.PetJournalError, errorText: string]>;
    function GetSearchFilter(): string;
    function HasFavoritePets(): boolean;
    function IsCurrentlySummoned(petID: string): boolean;
    function IsUsingDefaultFilters(): boolean;
    function PetIsSummonable(battlePetGUID: string): boolean;
    function PetUsesRandomDisplay(speciesID: number): boolean | undefined;
    function SetDefaultFilters(): void;
    function SetHoveredBattlePet(battlePetGUID: string): void;
    function SetSearchFilter(filterText: string): void;
    function SpellTargetBattlePet(battlePetGUID: string): void;
}

declare namespace C_PhotoSharing {
    function BeginAuthorizationFlow(): void;
    function ClearAuthorization(): void;
    function CompleteAuthorizationFlow(callbackURL: string): void;
    function GetCropRatio(): number;
    function GetPhotoSharingAuthURL(): string;
    function GetStatus(): Enum.PhotoSharingStatus;
    function IsAuthorized(): boolean;
    function IsEnabled(): boolean;
    function SetScreenshotPreviewTexture(textureObject: Texture): void;
    function TakePhoto(): void;
    function UploadPhotoToService(optionalTitle?: string, optionalDescription?: string): void;
}

declare namespace C_Ping {
    function GetCooldownInfo(): PingCooldownInfo;
    function GetDefaultPingOptions(): PingTypeInfo[];
    function GetTextureKitForType(type: Enum.PingSubjectType): string;
    function IsPingSystemEnabled(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendMacroPing(macroInfo: PingMacroInfo): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function TogglePingListener(down: boolean): void;
}

declare namespace C_PingSecure {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ClearHitTestPingInfo(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CreateFrame(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function DisplayError(error: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetTargetPingReceiver(mousePosX: number, mousePosY: number): ScriptRegion;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendHitTestPing(type?: Enum.PingSubjectType): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendPlayerItemPing(itemID: number): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendPlayerSpellCategoryPing(spellCategoryID: number): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendPlayerSpellPing(spellID: number): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendUnitPing(target: string, type?: Enum.PingSubjectType, isPlayerResource?: boolean): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetHitTestPingTarget(mousePosX: number, mousePosY: number, forcePointPing?: boolean): Enum.PingSetTargetState;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetHitTestTargetAndSendPing(): SendPingResult;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPendingPingOffScreenCallback(cb: PendingPingOffScreenCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPingCooldownStartedCallback(cb: PingCooldownStartedCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPingPinFrameAddedCallback(cb: PingPinFrameAddedCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPingPinFrameRemovedCallback(cb: PingPinFrameRemovedCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPingPinFrameScreenClampStateUpdatedCallback(cb: PingPinFrameScreenClampStateUpdatedCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPingRadialWheelCreatedCallback(cb: PingRadialWheelCreatedCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetSendMacroPingCallback(cb: SendMacroPingCallback): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetTogglePingListenerCallback(cb: TogglePingListenerCallback): void;
}

declare namespace C_PlayerChoice {
    function GetCurrentPlayerChoiceInfo(): PlayerChoiceInfo | undefined;
    function GetNumRerolls(): number;
    function GetRemainingTime(): number | undefined;
    function IsWaitingForPlayerChoiceResponse(): boolean;
    function OnUIClosed(): void;
    function RequestRerollPlayerChoice(): void;
    function SendPlayerChoiceResponse(responseID: number): void;
}

declare namespace C_PlayerInfo {
    function CanPlayerEnterChromieTime(): boolean;
    function CanPlayerUseAreaLoot(): boolean;
    function CanPlayerUseMountEquipment(): LuaMultiReturn<[canUseMountEquipment: boolean, failureReason: string]>;
    function CanUseItem(itemID: number): boolean;
    function GetAlternateFormInfo(): LuaMultiReturn<[hasAlternateForm: boolean, inAlternateForm: boolean]>;
    function GetClass(playerLocation: PlayerLocationMixin): LuaMultiReturn<[className: string | undefined, classFilename: string | undefined, classID: number | undefined]>;
    function GetContentDifficultyCreatureForPlayer(unitToken: UnitToken): Enum.RelativeContentDifficulty;
    function GetContentDifficultyQuestForPlayer(questID: number): Enum.RelativeContentDifficulty;
    function GetDisplayID(): number;
    function GetGlidingInfo(): LuaMultiReturn<[isGliding: boolean, canGlide: boolean, forwardSpeed: number]>;
    function GetInstancesUnlockedAtLevel(level: number, isRaid: boolean): number[] | undefined;
    function GetName(playerLocation: PlayerLocationMixin): string | undefined;
    function GetNativeDisplayID(): number;
    function GetPetStableCreatureDisplayInfoID(index: number): number;
    function GetPlayerCharacterData(): PlayerInfoCharacterData | undefined;
    /** Returns the players mythic+ rating summary which includes the runs they've completed as well as their current season m+ rating */
    function GetPlayerMythicPlusRatingSummary(playerToken: UnitToken): MythicPlusRatingSummary | undefined;
    function GetRace(playerLocation: PlayerLocationMixin): number | undefined;
    function GetSex(playerLocation: PlayerLocationMixin): Enum.UnitSex | undefined;
    function GUIDIsPlayer(guid: string): boolean;
    function HasAccountInventoryLock(): boolean;
    function HasVisibleInvSlot(slot: number): boolean;
    function IsAccountBankEnabled(): boolean;
    function IsCharacterBankEnabled(): boolean;
    function IsConnected(playerLocation?: PlayerLocationMixin): boolean | undefined;
    function IsDisplayRaceNative(): boolean;
    function IsExpansionLandingPageUnlockedForPlayer(expansionID: number): boolean;
    function IsMirrorImage(): boolean;
    function IsPlayerEligibleForNPE(): LuaMultiReturn<[isEligible: boolean, failureReason: string]>;
    function IsPlayerEligibleForNPEv2(): LuaMultiReturn<[isEligible: boolean, failureReason: string]>;
    function IsPlayerInChromieTime(): boolean;
    function IsPlayerInRPE(): boolean;
    function IsPlayerInTimerunningHeroicWorldTier(): boolean;
    function IsPlayerNPERestricted(): boolean;
    function IsReturningCharacter(): boolean;
    function IsSelfFoundActive(): boolean;
    function IsTradingPostAvailable(): boolean;
    function IsTravelersLogAvailable(): boolean;
    function IsTutorialsTabAvailable(): boolean;
    function ShouldDisplaySurname(): boolean;
    function UnitIsSameServer(playerLocation: PlayerLocationMixin): boolean;
}

declare namespace C_PlayerInteractionManager {
    function ClearInteraction(type?: Enum.PlayerInteractionType): void;
    function ConfirmationInteraction(type?: Enum.PlayerInteractionType): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function InteractUnit(unit: string, exactMatch?: boolean, looseTargeting?: boolean): boolean;
    function IsInteractingWithNpcOfType(type: Enum.PlayerInteractionType): boolean;
    function IsReplacingUnit(): boolean;
    function IsValidNPCInteraction(type: Enum.PlayerInteractionType): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ReopenInteraction(): void;
    function ShardTransferConfirm(): void;
}

declare namespace C_PlayerMentorship {
    function GetMentorLevelRequirement(): number | undefined;
    function GetMentorRequirements(): LuaMultiReturn<[achievementIDs: number[], optionalAchievementIDs: number[], optionalCompleteAtLeastCount: number]>;
    function GetMentorshipStatus(playerLocation: PlayerLocationMixin): Enum.PlayerMentorshipStatus;
    function IsActivePlayerConsideredNewcomer(): boolean;
    function IsMentorRestricted(): boolean;
}

declare namespace C_ProfSpecs {
    function CanRefundPath(pathID: number, configID: number): boolean;
    function CanUnlockTab(tabTreeID: number, configID: number): boolean;
    function GetChildrenForPath(pathID: number): number[];
    function GetConfigIDForSkillLine(skillLineID: number): number;
    function GetCurrencyInfoForSkillLine(skillLineID: number): SpecializationCurrencyInfo;
    function GetDefaultSpecSkillLine(): number | undefined;
    function GetDescriptionForPath(pathID: number): string;
    function GetDescriptionForPerk(perkID: number): string;
    function GetEntryIDForPerk(perkID: number): number;
    function GetNewSpecReminderProfName(): string | undefined;
    function GetPerksForPath(pathID: number): SpecPerkInfo[];
    function GetRootPathForTab(tabTreeID: number): number | undefined;
    function GetSourceTextForPath(pathID: number, configID: number): string;
    function GetSpecTabIDsForSkillLine(skillLineID: number): number[];
    function GetSpecTabInfo(): SpecializationTabInfo;
    function GetSpendCurrencyForPath(pathID: number): number | undefined;
    function GetSpendEntryForPath(pathID: number): number;
    function GetStateForPath(pathID: number, configID: number): Enum.ProfessionsSpecPathState;
    function GetStateForPerk(perkID: number, configID: number): Enum.ProfessionsSpecPerkState;
    function GetStateForTab(tabTreeID: number, configID: number): Enum.ProfessionsSpecTabState;
    function GetTabInfo(tabTreeID: number): ProfTabInfo | undefined;
    function GetUnlockEntryForPath(pathID: number): number;
    function GetUnlockRankForPerk(perkID: number): number | undefined;
    function ShouldShowPointsReminder(): boolean;
    function ShouldShowPointsReminderForSkillLine(skillLineID: number): boolean;
    function ShouldShowSpecTab(): boolean;
    function SkillLineHasSpecialization(skillLineID: number): boolean;
}

declare namespace C_PvP {
    function ArePvpTalentsUnlocked(): boolean;
    function AreTrainingGroundsEnabled(): boolean;
    function CanDisplayDeaths(): boolean;
    function CanDisplayHonorableKills(): boolean;
    function CanPlayerUseRatedPVPUI(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseTrainingGroundsUI(): LuaMultiReturn<[canUseTrainingGroundsUI: boolean, failureReason: string]>;
    function CanSurrenderArena(): boolean;
    function CanToggleWarMode(toggle: boolean): boolean;
    function CanToggleWarModeInArea(): boolean;
    function DoesMatchOutcomeAffectRating(): boolean;
    function GetActiveBrawlInfo(): PvpBrawlInfo | undefined;
    function GetActiveMatchBracket(): number;
    function GetActiveMatchDuration(): number;
    function GetActiveMatchState(): Enum.PvPMatchState;
    function GetActiveMatchWinner(): number;
    function GetArenaCrowdControlDuration(playerToken: UnitToken): LuaDurationObject;
    function GetArenaCrowdControlInfo(playerToken: UnitToken): LuaMultiReturn<[spellID: number | undefined, startTime: number | undefined, duration: number | undefined]>;
    function GetArenaOpponentSpec(index: number): LuaMultiReturn<[specializationID: number | undefined, gender: number | undefined]>;
    function GetArenaRewards(teamSize: number): LuaMultiReturn<[honor: number | undefined, experience: number | undefined, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetArenaSkirmishRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetAssignedSpecForBattlefieldQueue(queueID: number): number | undefined;
    /** If nil is returned, PVP_BRAWL_INFO_UPDATED event will be sent when the data is ready. */
    function GetAvailableBrawlInfo(): PvpBrawlInfo | undefined;
    function GetBattlefieldFlagPosition(flagIndex: number, uiMapId: number): LuaMultiReturn<[uiPosx: number | undefined, uiPosy: number | undefined, flagTexture: number]>;
    function GetBattlefieldVehicleInfo(vehicleIndex: number, uiMapID: number): BattlefieldVehicleInfo | undefined;
    function GetBattlefieldVehicles(uiMapID: number): BattlefieldVehicleInfo[] | undefined;
    function GetBattlegroundInfo(battlegroundIndex: number): BattlegroundInfo | undefined;
    function GetBrawlRewards(brawlType: Enum.BrawlType): LuaMultiReturn<[honor: number | undefined, experience: number | undefined, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined, hasWon: boolean | undefined]>;
    function GetBrawlSoloRBGMinItemLevel(): number;
    function GetCustomVictoryStatID(): number;
    function GetGlobalPvpScalingInfoForSpecID(specializationID: number): PvpScalingData[] | undefined;
    function GetHonorRewardInfo(honorLevel: number): HonorRewardInfo | undefined;
    function GetLevelUpBattlegrounds(level: number): LevelUpBattlegroundInfo[];
    function GetMatchPVPStatColumn(pvpStatID: number): MatchPVPStatColumn | undefined;
    function GetMatchPVPStatColumns(): MatchPVPStatColumn[];
    function GetNextHonorLevelForReward(honorLevel: number): number | undefined;
    function GetOutdoorPvPWaitTime(uiMapID: number): number;
    function GetPersonalRatedBGBlitzSpecStats(): RatedBGBlitzSpecStats | undefined;
    function GetPersonalRatedSoloShuffleSpecStats(): RatedSoloShuffleSpecStats | undefined;
    function GetPostMatchCurrencyRewards(): PVPPostMatchCurrencyReward[];
    function GetPostMatchItemRewards(): PVPPostMatchItemReward[];
    function GetPVPActiveMatchPersonalRatedInfo(): PVPPersonalRatedInfo | undefined;
    function GetPVPActiveRatedMatchDeserterPenalty(): RatedMatchDeserterPenalty | undefined;
    function GetPVPSeasonRewardAchievementID(): number | undefined;
    function GetPvpTalentsUnlockedLevel(): number;
    function GetPvpTierID(tierEnum: number, bracketEnum: number): number | undefined;
    function GetPvpTierInfo(tierID: number): PvpTierInfo | undefined;
    function GetRandomBGInfo(): RandomBGInfo;
    function GetRandomBGRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRandomEpicBGInfo(): RandomBGInfo;
    function GetRandomEpicBGRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRandomTrainingGroundArenaRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRandomTrainingGroundBGRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRatedBGRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRatedSoloRBGMinItemLevel(): number;
    function GetRatedSoloRBGRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRatedSoloShuffleMinItemLevel(): number;
    function GetRatedSoloShuffleRewards(): LuaMultiReturn<[honor: number, experience: number, itemRewards: BattlefieldItemReward[] | undefined, currencyRewards: BattlefieldCurrencyReward[] | undefined, roleShortageBonus: RoleShortageReward | undefined]>;
    function GetRewardItemLevelsByTierEnum(pvpTierEnum: number): LuaMultiReturn<[activityItemLevel: number, weeklyItemLevel: number]>;
    function GetScoreInfo(offsetIndex: number): PVPScoreInfo | undefined;
    function GetScoreInfoByPlayerGuid(guid: string): PVPScoreInfo | undefined;
    function GetSeasonBestInfo(): LuaMultiReturn<[tierID: number, nextTierID: number | undefined]>;
    function GetSkirmishInfo(pvpBracket: number): BattlemasterListInfo | undefined;
    function GetSpecialEventBrawlInfo(): PvpBrawlInfo | undefined;
    function GetTeamInfo(factionIndex: number): PVPTeamInfo | undefined;
    function GetTrainingGrounds(): BattlegroundInfo[];
    function GetUIDisplaySeason(): number;
    function GetWarModeRewardBonus(): number;
    function GetWarModeRewardBonusDefault(): number;
    function GetWeeklyChestInfo(): LuaMultiReturn<[rewardAchieved: boolean, lastWeekRewardAchieved: boolean, lastWeekRewardClaimed: boolean, pvpTierMaxFromWins: number]>;
    function GetZonePVPInfo(): LuaMultiReturn<[pvpType: string | undefined, isSubZonePvP: boolean | undefined, factionName: string | undefined]>;
    function HasArenaSkirmishWinToday(): boolean;
    /** Returns true if a match is either active or complete. */
    function HasMatchStarted(): boolean;
    function HasRandomTrainingGroundArenaWinToday(): boolean;
    function HasRandomTrainingGroundBGWinToday(): boolean;
    function IsActiveBattlefield(): boolean;
    function IsActiveMatchRegistered(): boolean;
    function IsArena(): boolean;
    function IsBattleground(): boolean;
    function IsBattlegroundEnlistmentBonusActive(): LuaMultiReturn<[battlegroundActive: boolean, brawlActive: boolean]>;
    function IsBrawlSoloRBG(): boolean;
    function IsBrawlSoloShuffle(): boolean;
    function IsInBrawl(): boolean;
    function IsInRatedMatchWithDeserterPenalty(): boolean;
    function IsMatchActive(): boolean;
    function IsMatchComplete(): boolean;
    function IsMatchConsideredArena(): boolean;
    function IsMatchFactional(): boolean;
    function IsPVPMap(): boolean;
    function IsRatedArena(): boolean;
    function IsRatedBattleground(): boolean;
    function IsRatedMap(): boolean;
    function IsRatedSoloRBG(): boolean;
    function IsRatedSoloShuffle(): boolean;
    function IsSoloRBG(): boolean;
    function IsSoloShuffle(): boolean;
    function IsSubZonePVPPOI(): boolean;
    function IsTrainingGroundsArena(lfgDungeonsID: number): boolean;
    function IsTrainingGroundsBG(lfgDungeonsID: number): boolean;
    function IsWarModeActive(): boolean;
    function IsWarModeDesired(): boolean;
    function IsWarModeFeatureEnabled(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function JoinBattlefield(battlemasterListId: number): void;
    function JoinBrawl(isSpecialBrawl?: boolean): void;
    function JoinRandomTrainingGroundArena(): void;
    function JoinRandomTrainingGroundBG(): void;
    function JoinRatedBGBlitz(): void;
    function JoinTrainingGround(trainingGroundID: number): void;
    function RequestCrowdControlSpell(playerToken: UnitToken): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetPVP(enablePVP?: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetWarModeDesired(warModeDesired: boolean): void;
    function StartSoloRBGWarGameByName(args: string): number;
    function StartSpectatorSoloRBGWarGame(opaqueID1: number, opaqueID2: number, specifiedMap: string, tournamentRules: boolean): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function TogglePVP(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ToggleWarMode(): void;
}

declare namespace C_QuestHub {
    function IsAreaPOICurrentlyRelatedToHub(areaPoiID: number, hubAreaPoiID: number): boolean;
    function IsQuestCurrentlyRelatedToHub(questID: number, hubAreaPoiID: number): boolean;
}

declare namespace C_QuestInfoSystem {
    function GetQuestClassification(questID?: number, questInfoID?: number): Enum.QuestClassification;
    function GetQuestHasShortExpirationWarning(questID?: number): boolean;
    function GetQuestLogRewardFavor(questID?: number, clampFavorToCycleCap?: boolean): number;
    function GetQuestRewardCurrencies(questID?: number): QuestRewardCurrencyInfo[] | undefined;
    function GetQuestRewardSpellInfo(questID: number | undefined, spellID: number): QuestRewardSpellInfo | undefined;
    function GetQuestRewardSpells(questID?: number): number[] | undefined;
    function GetQuestShouldToastCompletion(questID?: number): boolean;
    function HasQuestRewardCurrencies(questID?: number): boolean;
    function HasQuestRewardSpells(questID?: number): boolean;
}

declare namespace C_QuestItemUse {
    function CanUseQuestItemOnObject(item: ItemLocationMixin, unit: UnitToken, checkRange?: boolean): boolean;
}

declare namespace C_QuestLine {
    function GetAvailableQuestLines(uiMapID: number): QuestLineInfo[];
    function GetForceVisibleQuests(uiMapID: number): number[];
    function GetQuestLineInfo(questID: number, uiMapID?: number, displayableOnly?: boolean): QuestLineInfo | undefined;
    function GetQuestLineQuests(questLineID: number): number[];
    function IsComplete(questLineID: number): boolean;
    function QuestLineIgnoresAccountCompletedFiltering(uiMapID: number, questLineID: number): boolean;
    function RequestQuestLinesForMap(uiMapID: number): void;
}

declare namespace C_QuestLog {
    function AbandonQuest(): void;
    function AddQuestWatch(questID: number): boolean;
    function AddWorldQuestWatch(questID: number, watchType?: Enum.QuestWatchType): boolean;
    function CanAbandonQuest(questID: number): boolean;
    function DoesQuestAwardReputationWithFaction(questID: number, targetFactionID: number): boolean;
    function GetAbandonQuest(): number;
    function GetAbandonQuestItems(): number[] | undefined;
    function GetActivePreyQuest(): number | undefined;
    function GetActiveThreatMaps(): number[] | undefined;
    function GetAllCompletedQuestIDs(): number[];
    function GetBountiesForMapID(uiMapID: number): BountyInfo[] | undefined;
    function GetBountySetInfoForMapID(uiMapID: number): LuaMultiReturn<[displayLocation: Enum.MapOverlayDisplayLocation | undefined, lockQuestID: number | undefined, bountySetID: number | undefined, isActivitySet: boolean | undefined]>;
    function GetDistanceSqToQuest(questID: number): LuaMultiReturn<[distanceSq: number | undefined, onContinent: boolean | undefined]>;
    function GetHeaderIndexForQuest(questID: number): number | undefined;
    function GetInfo(questLogIndex: number): QuestInfo | undefined;
    /** Only returns a log index for actual quests, not headers */
    function GetLogIndexForQuestID(questID: number): number | undefined;
    function GetMapForQuestPOIs(): number;
    /** This is the maximum number of quests a player can be on, including hidden quests, world quests, emissaries etc */
    function GetMaxNumQuests(): number;
    /** This is the maximum number of standard quests a player can accept. These are quests that are normally visible in the quest log. */
    function GetMaxNumQuestsCanAccept(): number;
    function GetNextWaypoint(questID: number): LuaMultiReturn<[mapID: number | undefined, x: number | undefined, y: number | undefined]>;
    function GetNextWaypointForMap(questID: number, uiMapID: number): LuaMultiReturn<[x: number | undefined, y: number | undefined]>;
    function GetNextWaypointText(questID: number): string | undefined;
    function GetNumQuestLogEntries(): LuaMultiReturn<[numShownEntries: number, numQuests: number]>;
    function GetNumQuestObjectives(questID: number): number;
    function GetNumQuestWatches(): number;
    function GetNumWorldQuestWatches(): number;
    function GetQuestAdditionalHighlights(questID: number): LuaMultiReturn<[uiMapID: number, worldQuests: boolean, worldQuestsElite: boolean, dungeons: boolean, treasures: boolean]>;
    function GetQuestDetailsTheme(questID: number): QuestTheme | undefined;
    function GetQuestDifficultyLevel(questID: number): number;
    /** Only returns a questID for actual quests, not headers */
    function GetQuestIDForLogIndex(questLogIndex: number): number | undefined;
    function GetQuestIDForQuestWatchIndex(questWatchIndex: number): number | undefined;
    function GetQuestIDForWorldQuestWatchIndex(questWatchIndex: number): number | undefined;
    function GetQuestLogMajorFactionReputationRewards(questID: number): QuestRewardReputationInfo[] | undefined;
    function GetQuestLogPortraitGiver(questLogIndex?: number): LuaMultiReturn<[portraitGiver: number | undefined, portraitGiverText: string | undefined, portraitGiverName: string | undefined, portraitGiverMount: number | undefined, portraitGiverModelSceneID: number | undefined]>;
    function GetQuestObjectives(questID: number): QuestObjectiveInfo[] | undefined;
    function GetQuestRewardCurrencies(questID: number): QuestRewardCurrencyInfo[];
    function GetQuestRewardCurrencyInfo(questID: number, currencyIndex: number, isChoice: boolean): QuestRewardCurrencyInfo | undefined;
    function GetQuestsOnMap(uiMapID: number): QuestPOIMapInfo[] | undefined;
    function GetQuestTagInfo(questID: number): QuestTagInfo | undefined;
    function GetQuestTimers(): QuestTimerInfo[];
    function GetQuestType(questID: number): number | undefined;
    function GetQuestWatchType(questID: number): Enum.QuestWatchType | undefined;
    /** Uses the selected quest if no questID is provided */
    function GetRequiredMoney(questID?: number): number;
    function GetSelectedQuest(): number;
    function GetSuggestedGroupSize(questID: number): number;
    function GetTimeAllowed(questID: number): LuaMultiReturn<[totalTime: number | undefined, elapsedTime: number | undefined]>;
    /** Returns a valid title for anything that is in the quest log. */
    function GetTitleForLogIndex(questLogIndex: number): string | undefined;
    /** Only returns a valid title for quests, header titles cannot be discovered using this. */
    function GetTitleForQuestID(questID: number): string | undefined;
    function GetTrivialRange(): number;
    function GetZoneStoryInfo(uiMapID: number): LuaMultiReturn<[achievementID: number | undefined, storyMapID: number | undefined]>;
    function HasActiveThreats(): boolean;
    function IsAccountQuest(questID: number): boolean;
    function IsComplete(questID: number): boolean;
    function IsEliteQuest(questID: number): boolean;
    function IsFailed(questID: number): boolean;
    function IsImportantQuest(questID: number): boolean;
    function IsMetaQuest(questID: number): boolean;
    function IsOnMap(questID: number): LuaMultiReturn<[onMap: boolean, hasLocalPOI: boolean]>;
    function IsOnQuest(questID: number): boolean;
    function IsPushableQuest(questID: number): boolean;
    function IsQuestBounty(questID: number): boolean;
    function IsQuestCalling(questID: number): boolean;
    function IsQuestCriteriaForBounty(questID: number, bountyQuestID: number): boolean;
    function IsQuestDisabledForSession(questID: number): boolean;
    function IsQuestFlaggedCompleted(questID: number): boolean;
    function IsQuestFlaggedCompletedOnAccount(questID: number): boolean;
    function IsQuestFromContentPush(questID: number): boolean;
    function IsQuestInvasion(questID: number): boolean;
    function IsQuestReplayable(questID: number): boolean;
    function IsQuestReplayedRecently(questID: number): boolean;
    function IsQuestTask(questID: number): boolean;
    function IsQuestTrivial(questID: number): boolean;
    function IsRepeatableQuest(questID: number): boolean;
    function IsThreatQuest(questID: number): boolean;
    function IsUnitOnQuest(unit: UnitToken, questID: number): boolean;
    function IsWorldQuest(questID: number): boolean;
    /** Tests whether a quest is eligible for warmode bonuses (e.g. most world quests, some daily quests */
    function QuestCanHaveWarModeBonus(questID: number): boolean;
    function QuestContainsFirstTimeRepBonusForPlayer(questID: number): boolean;
    function QuestHasQuestSessionBonus(questID: number): boolean;
    /** Tests whether a quest in the player's quest log that is eligible for warmode bonuses (see 'QuestCanHaveWarModeBOnus') has been completed in warmode (including accepting it) */
    function QuestHasWarModeBonus(questID: number): boolean;
    function QuestIgnoresAccountCompletedFiltering(questID: number): boolean;
    function ReadyForTurnIn(questID: number): boolean | undefined;
    function RemoveQuestWatch(questID: number): boolean;
    function RemoveWorldQuestWatch(questID: number): boolean;
    function RequestLoadQuestByID(questID: number): void;
    function SetAbandonQuest(): void;
    function SetMapForQuestPOIs(uiMapID: number): void;
    function SetSelectedQuest(questID: number): void;
    function ShouldDisplayTimeRemaining(questID: number): boolean;
    function ShouldShowQuestRewards(questID: number): boolean;
    function SortQuestWatches(): void;
    function UnitIsRelatedToActiveQuest(unit: UnitToken): boolean;
    function UpdateCampaignHeaders(): void;
}

declare namespace C_QuestOffer {
    function GetHideRequiredItems(): boolean;
    function GetQuestOfferMajorFactionReputationRewards(): QuestRewardReputationInfo[] | undefined;
    function GetQuestRequiredCurrencyInfo(questRewardIndex: number): QuestRequiredCurrencyInfo | undefined;
    function GetQuestRewardCurrencyInfo(questInfoType: string, questRewardIndex: number): QuestRewardCurrencyInfo | undefined;
}

declare namespace C_QuestSession {
    function CanStart(): boolean;
    function CanStop(): boolean;
    function Exists(): boolean;
    function GetAvailableSessionCommand(): Enum.QuestSessionCommand;
    function GetPendingCommand(): Enum.QuestSessionCommand;
    function GetProposedMaxLevelForSession(): number;
    function GetSessionBeginDetails(): QuestSessionPlayerDetails | undefined;
    function GetSuperTrackedQuest(): number | undefined;
    function HasJoined(): boolean;
    function HasPendingCommand(): boolean;
    function RequestSessionStart(): void;
    function RequestSessionStop(): void;
    function SendSessionBeginResponse(beginSession: boolean): void;
    function SetQuestIsSuperTracked(questID: number, superTrack: boolean): void;
}

declare namespace C_RaidLocks {
    function GetRedirectedDifficultyID(mapID: number, difficultyID: number): number;
    function IsEncounterComplete(mapID: number, encounterID: number, difficultyID?: number): boolean;
    function IsRaidLockExtendFeatureEnabled(): boolean;
    function IsRaidLockExtendFeatureSupported(): boolean;
}

declare namespace C_RecentAllies {
    function CanSetRecentAllyNote(characterGUID: string): boolean;
    function GetRecentAllies(): RecentAllyData[];
    function GetRecentAllyByFullName(fullCharacterName: string): RecentAllyData | undefined;
    function GetRecentAllyByGUID(characterGUID: string): RecentAllyData | undefined;
    function IsInteractionCategoryFilterSupportedForCurrentGameType(interactionCategoryFilter: Enum.RecentAlliesInteractionCategoryFilter): boolean;
    function IsRecentAllyByFullName(fullCharacterName: string): boolean;
    function IsRecentAllyByGUID(characterGUID: string): boolean;
    function IsRecentAllyDataReady(): boolean;
    function IsRecentAllyPinned(characterGUID: string): boolean;
    function IsSystemEnabled(): boolean;
    function IsSystemSupported(): boolean;
    function SearchRecentAllies(searchInfo: RecentAlliesSearchInfo): RecentAllyData[];
    function SetRecentAllyNote(characterGUID: string, note: string): void;
    function SetRecentAllyPinned(characterGUID: string, isPinned: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function TryRequestRecentAlliesData(): void;
}

declare namespace C_RecruitAFriend {
    function CanSummonFriend(guid: string): LuaMultiReturn<[canSummon: boolean | undefined, reason: Enum.RecruitAFriendFailure | undefined]>;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ClaimActivityReward(activityID: number, acceptanceID: RecruitAcceptanceID): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ClaimNextReward(rafVersion?: Enum.RecruitAFriendRewardsVersion): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GenerateRecruitmentLink(): boolean;
    function GetRAFInfo(): RafInfo;
    function GetRAFSystemInfo(): RafSystemInfo;
    function GetRecruitActivityRequirementsText(activityID: number, acceptanceID: RecruitAcceptanceID): string[];
    function GetRecruitInfo(): LuaMultiReturn<[active: boolean, faction: number]>;
    function GetSummonFriendCooldown(): LuaMultiReturn<[startTimeSeconds: number, durationSeconds: number, enableCooldownTimer: boolean]>;
    function IsRecruitAFriendLinked(guid: string): boolean;
    function IsRecruitingEnabled(): boolean;
    function IsSystemEnabled(): boolean;
    function IsSystemSupported(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RemoveRAFRecruit(wowAccountGUID: string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function RequestUpdatedRecruitmentInfo(): boolean;
    function SummonFriend(target: string, name: string): void;
}

declare namespace C_RemixArtifactUI {
    function ClearRemixArtifactItem(): void;
    function GetAppearanceInfoByID(artifactAppearanceID: number): LuaMultiReturn<[uiCameraID: number | undefined, altHandUICameraID: number | undefined]>;
    function GetArtifactArtInfo(): RemixArtifactArtInfo | undefined;
    function GetArtifactItemInfo(): LuaMultiReturn<[itemID: number | undefined, altItemID: number | undefined, artifactAppearanceID: number | undefined, appearanceModID: number | undefined, itemAppearanceID: number | undefined, altItemAppearanceID: number | undefined, altOnTop: boolean | undefined]>;
    function GetCurrArtifactItemID(): number | undefined;
    function GetCurrItemSpecIndex(): number | undefined;
    function GetCurrTraitTreeID(): number | undefined;
    function ItemInSlotIsRemixArtifact(invSlot: number): boolean;
}

declare namespace C_ReportSystem {
    function CanReportPlayer(playerLocation: PlayerLocationMixin): boolean;
    function CanReportPlayerForLanguage(playerLocation: PlayerLocationMixin): boolean;
    function GetMajorCategoriesForReportType(reportType: Enum.ReportType): Enum.ReportMajorCategory[];
    function GetMajorCategoryString(majorCategory: Enum.ReportMajorCategory): string;
    function GetMinorCategoriesForReportTypeAndMajorCategory(reportType: Enum.ReportType, majorCategory: Enum.ReportMajorCategory): Enum.ReportMinorCategory[];
    function GetMinorCategoryString(minorCategory: Enum.ReportMinorCategory): string;
    function ReportServerLag(): void;
    function ReportStuckInCombat(): void;
    function RequiresScreenshotForReportType(reportType: Enum.ReportType, majorCategory: Enum.ReportMajorCategory): boolean;
    /**
     * Not allowed to be called by addons
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SendReport(reportInfo: ReportInfoMixin, playerLocation?: PlayerLocationMixin): void;
    function SetScreenshotPreviewTexture(textureObject: Texture): void;
    function TakeReportScreenshot(): void;
}

declare namespace C_Reputation {
    function AreLegacyReputationsShown(): boolean;
    function CollapseAllFactionHeaders(): void;
    function CollapseFactionHeader(factionSortIndex: number): void;
    function ExpandAllFactionHeaders(): void;
    function ExpandFactionHeader(factionSortIndex: number): void;
    function GetFactionDataByID(factionID: number): FactionData | undefined;
    function GetFactionDataByIndex(factionSortIndex: number): FactionData | undefined;
    function GetFactionParagonInfo(factionID: number): LuaMultiReturn<[currentValue: number | undefined, threshold: number | undefined, rewardQuestID: number | undefined, hasRewardPending: boolean | undefined, tooLowLevelForParagon: boolean | undefined, paragonStorageLevel: number | undefined]>;
    function GetGuildFactionData(): FactionData | undefined;
    function GetGuildRepExpirationTime(): number | undefined;
    function GetNumFactions(): number;
    function GetReputationSortType(): Enum.ReputationSortType;
    function GetSelectedFaction(): number;
    function GetWatchedFactionData(): FactionData | undefined;
    function IsAccountWideReputation(factionID: number): boolean;
    function IsFactionActive(factionSortIndex: number): boolean;
    function IsFactionParagon(factionID: number): boolean;
    function IsFactionParagonForCurrentPlayer(factionID: number): boolean;
    function IsMajorFaction(factionID: number): boolean;
    function RequestFactionParagonPreloadRewardData(factionID: number): void;
    function SetFactionActive(factionSortIndex: number, setActive: boolean): void;
    function SetLegacyReputationsShown(showLegacyReputations: boolean): void;
    function SetReputationSortType(sortType: Enum.ReputationSortType): void;
    function SetSelectedFaction(factionSortIndex: number): void;
    function SetWatchedFactionByID(factionID: number): void;
    function SetWatchedFactionByIndex(factionSortIndex: number): void;
    function ToggleFactionAtWar(factionSortIndex: number): void;
}

declare namespace C_ResearchInfo {
    function GetDigSitesForMap(uiMapID: number): DigSiteMapInfo[];
}

declare namespace C_RestrictedActions {
    /** Returns true if the calling context has permissions to call protected functions on the supplied object. */
    function CheckAllowProtectedFunctions(object: FrameScriptObject, silent?: boolean): boolean;
    /** Returns the current state of an addon restriction type. */
    function GetAddOnRestrictionState(type: Enum.AddOnRestrictionType): Enum.AddOnRestrictionState;
    function InCombatLockdown(): boolean;
    /** Returns true if an addon restriction type is in an active state. Will always return false during dispatch of ADDON_RESTRICTION_STATE_CHANGED. */
    function IsAddOnRestrictionActive(type: Enum.AddOnRestrictionType): boolean;
}

declare namespace C_Roleset {
    /**
     * Sets or clears both blocklist and allowlist filters atomically with a single visibility reevaluation. Pass an empty table to clear the corresponding filter. Blocked for tainted callers while in combat lockdown.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function ApplyRolesetFilters(blockedRolesets: string[], allowedRolesets: string[]): void;
    /** Returns the rolesets in the currently active allowlist. */
    function GetActiveAllowedRolesets(): string[];
    /** Returns the rolesets in the currently active blocklist. */
    function GetActiveBlockedRolesets(): string[];
}

declare namespace C_ScenarioInfo {
    function GetCriteriaInfo(criteriaIndex: number): ScenarioCriteriaInfo | undefined;
    function GetCriteriaInfoByStep(stepID: number, criteriaIndex: number): ScenarioCriteriaInfo | undefined;
    function GetDisplayInfo(): ScenarioDisplayInfo | undefined;
    function GetJailersTowerTypeString(runType: Enum.JailersTowerType): string | undefined;
    function GetScenarioIconInfo(uiMapID: number): ScenarioIconInfo[] | undefined;
    function GetScenarioInfo(): ScenarioInformation | undefined;
    function GetScenarioStepInfo(scenarioStepID?: number): ScenarioStepInfo | undefined;
    /** Returns list of active challenge spells if inside a tiered entrance scenario */
    function GetTieredEntranceActiveSpells(): number[] | undefined;
    function GetUnitCriteriaProgressValues(unit: UnitToken): LuaMultiReturn<[actualValue: number | undefined, percentValue: number | undefined, percentValueString: string | undefined]>;
    function IsTieredEntranceScenario(): boolean;
}

declare namespace C_ScrappingMachineUI {
    function CloseScrappingMachine(): void;
    function DropPendingScrapItemFromCursor(index: number): void;
    function GetCurrentPendingScrapItemLocationByIndex(index: number): ItemLocationMixin | undefined;
    function GetScrappingMachineName(): string | undefined;
    function GetScrapSpellID(): number;
    function HasScrappableItems(): boolean;
    function RemoveAllScrapItems(): void;
    function RemoveCurrentScrappingItem(): void;
    function RemoveItemToScrap(index: number): void;
    function ScrapItems(): void;
    function ValidateScrappingList(): void;
}

declare namespace C_ScriptedAnimations {
    function GetAllScriptedAnimationEffects(): ScriptedAnimationEffect[];
}

declare namespace C_SeasonInfo {
    function GetCurrentDisplaySeasonExpansion(): number | undefined;
    function GetCurrentDisplaySeasonID(): number;
    function GetTimeUntilCurrentPVPSeasonEnd(): number;
}

declare namespace C_Secrets {
    /** Returns true if queries to compare two input unit tokens are permitted. If this returns false, APIs guarded by the RequiresComparableUnitTokens predicate will fail. */
    function CanCompareUnitTokens(unit1: UnitToken, unit2: UnitToken): boolean;
    /** Queries the base secrecy for a power type. */
    function GetPowerTypeSecrecy(powerType: Enum.PowerType): Enum.SecrecyLevel;
    /** Queries the base secrecy for a spell if queried as an aura. */
    function GetSpellAuraSecrecy(spellIdentifier: number | string): Enum.SecrecyLevel;
    /** Queries the base secrecy for a spell if queried as a cast. */
    function GetSpellCastSecrecy(spellIdentifier: number | string): Enum.SecrecyLevel;
    /** Queries the base secrecy for a spell if queried as a cooldown. */
    function GetSpellCooldownSecrecy(spellIdentifier: number | string): Enum.SecrecyLevel;
    /** Returns true if this client build has secret value restrictions enabled. If false, all APIs that are tagged as potentially returning secrets will never do so. */
    function HasSecretRestrictions(): boolean;
    /** Returns true if a given action bar slot ID will produce secret values for cooldowns if queried. */
    function ShouldActionCooldownBeSecret(actionID: number): boolean;
    /** Returns true if queries for aura data will generally produce secret values. */
    function ShouldAurasBeSecret(): boolean;
    /** Returns true if queries for cooldown data will generally produce secret values. */
    function ShouldCooldownsBeSecret(): boolean;
    /** Returns true if a given spell identifier would, if applied as an aura, produce secret values when queried. */
    function ShouldSpellAuraBeSecret(spellIdentifier: number | string): boolean;
    /** Returns true if a given spellbook item will produce secret values for cooldowns if queried. */
    function ShouldSpellBookItemCooldownBeSecret(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if a given spell identifier will produce secret values for cooldowns if queried. */
    function ShouldSpellCooldownBeSecret(spellIdentifier: number | string): boolean;
    /** Returns true if information about a totem slot will produce secret values if queried. */
    function ShouldTotemSlotBeSecret(slot: number): boolean;
    /** Returns true if information about a spell when associated with a totem slot will produce secret values if queried. */
    function ShouldTotemSpellBeSecret(spellID: number): boolean;
    /** Returns true if a given aura index will produce secret values if queried. */
    function ShouldUnitAuraIndexBeSecret(unit: UnitToken, index: number, filter?: AuraFilters): boolean;
    /** Returns true if a given aura instance ID will produce secret values if queried. */
    function ShouldUnitAuraInstanceBeSecret(unit: UnitToken, auraInstanceID: number): boolean;
    /** Returns true if a given aura slot ID will produce secret values if queried. */
    function ShouldUnitAuraSlotBeSecret(unit: UnitToken, slot: number): boolean;
    /** Returns true if queries that compare units will produce secret values. */
    function ShouldUnitComparisonBeSecret(unit1: UnitToken, unit2: UnitToken): boolean;
    /** Returns true if queries for maximum unit health will produce secret values. */
    function ShouldUnitHealthMaxBeSecret(unit: UnitToken): boolean;
    /** Returns true if queries for unit identity (such as name or GUID) will produce secret values. */
    function ShouldUnitIdentityBeSecret(unit: UnitToken): boolean;
    /** Returns true if queries for unit power will produce secret values. */
    function ShouldUnitPowerBeSecret(unit: UnitToken, powerType?: Enum.PowerType): boolean;
    /** Returns true if queries for maximum unit power will produce secret values. */
    function ShouldUnitPowerMaxBeSecret(unit: UnitToken, powerType?: Enum.PowerType): boolean;
    /** Returns true if queries for spell casting information for a unit would produce secret values when queried. */
    function ShouldUnitSpellCastBeSecret(unit: UnitToken, spellIdentifier: number | string): boolean;
    /** Returns true if queries for spell casting information for a specific unit will generally produce secret values. */
    function ShouldUnitSpellCastingBeSecret(unit: UnitToken): boolean;
    /** Returns true if queries for unit statistics will produce secret values. */
    function ShouldUnitStatsBeSecret(): boolean;
    /** Returns true if queries for unit threat status will produce secret values. */
    function ShouldUnitThreatStateBeSecret(unit: UnitToken, mobUnit?: UnitToken): boolean;
    /** Returns true if queries for unit threat values will produce secret values. */
    function ShouldUnitThreatValuesBeSecret(unit: UnitToken, mobUnit: UnitToken): boolean;
}

declare namespace C_SecureTransfer {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AcceptTrade(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function Cancel(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CompleteHousingPurchase(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CompleteHousingVCPurchase(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetHousingPurchaseCost(): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetHousingPurchaseQuantity(): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetHousingVCPurchaseProductID(): number;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetMailReceiveInfo(): MailReceiveInfo;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetMailSendInfo(): MailSendInfo;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function GetTradePartner(): string | undefined;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendMail(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ShouldShowTradeOfferWarning(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function ShouldShowTradeRMTWarning(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function TakeMailMoney(): void;
}

declare namespace C_SettingsUtil {
    function NotifySettingsLoaded(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OpenSettingsPanel(openToCategoryID?: number, scrollToElementName?: string): void;
}

declare namespace C_SkillInfo {
    function AbandonSkill(skillLineID: number): void;
    function CollapseSkillHeader(index: number): void;
    function ExpandSkillHeader(index: number): void;
    function GetNumSkillLines(): number;
    function GetSelectedSkill(): number;
    function GetSkillLineInfo(index: number): SkillLineAttributes | undefined;
    function GetSkillLineInfoByID(ID: number): SkillLineAttributes | undefined;
    function SetSelectedSkill(index: number): void;
}

declare namespace C_SocialQueue {
    function GetAllGroups(allowNonJoinable?: boolean, allowNonQueuedGroups?: boolean): string[];
    function GetConfig(): SocialQueueConfig | undefined;
    function GetGroupForPlayer(playerGUID: string): LuaMultiReturn<[groupGUID: string | undefined, isSoloQueueParty: boolean | undefined]>;
    function GetGroupInfo(groupGUID: string): LuaMultiReturn<[canJoin: boolean | undefined, numQueues: number | undefined, needTank: boolean | undefined, needHealer: boolean | undefined, needDamage: boolean | undefined, isSoloQueueParty: boolean | undefined, questSessionActive: boolean | undefined, leaderGUID: string | undefined]>;
    function GetGroupMembers(groupGUID: string): SocialQueuePlayerInfo[] | undefined;
    function GetGroupQueues(groupGUID: string): SocialQueueGroupQueueInfo[] | undefined;
    function IsSystemEnabled(): boolean;
    function IsSystemSupported(): boolean;
    function RequestToJoin(groupGUID: string, applyAsTank?: boolean, applyAsHealer?: boolean, applyAsDamage?: boolean): boolean;
    function SignalToastDisplayed(groupGUID: string, priority: number): void;
}

declare namespace C_SocialRestrictions {
    function AcknowledgeAgeVerificationRestriction(): void;
    function AcknowledgeRegionalChatDisabled(): void;
    /** Returns true if the player meets all conditions that allow them to receive chat messages. */
    function CanReceiveChat(): boolean;
    /** Returns true if the player meets all conditions that allow them to send chat messages. */
    function CanSendChat(): boolean;
    /** Returns true if the account is restricted by the Age Verification feature. */
    function IsAgeVerificationRestricted(): boolean;
    /**
     * Returns true if the Age Verification restriction is because the account belongs to a minor, as opposed to an adult who has not yet verified their age.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function IsAgeVerificationRestrictedMinor(): boolean;
    function IsChatDisabled(): boolean;
    function IsFriendsDisabled(): boolean;
    function IsMuted(): boolean;
    function IsSilenced(): boolean;
    function IsSquelched(): boolean;
    function SetChatDisabled(disabled: boolean): void;
}

declare namespace C_SocialUI {
    function IsSystemEnabled(): boolean;
}

declare namespace C_Soulbinds {
    function ActivateSoulbind(soulbindID: number): void;
    function CanActivateSoulbind(soulbindID: number): LuaMultiReturn<[result: boolean, errorDescription: string | undefined]>;
    function CanModifySoulbind(): boolean;
    function CanResetConduitsInSoulbind(soulbindID: number): LuaMultiReturn<[result: boolean, errorDescription: string | undefined]>;
    function CanSwitchActiveSoulbindTreeBranch(): boolean;
    function CloseUI(): void;
    function CommitPendingConduitsInSoulbind(soulbindID: number): void;
    function FindNodeIDActuallyInstalled(soulbindID: number, conduitID: number): number;
    function FindNodeIDAppearingInstalled(soulbindID: number, conduitID: number): number;
    function FindNodeIDPendingInstall(soulbindID: number, conduitID: number): number;
    function FindNodeIDPendingUninstall(soulbindID: number, conduitID: number): number;
    function GetActiveSoulbindID(): number;
    function GetConduitCollection(conduitType: Enum.SoulbindConduitType): ConduitCollectionData[];
    function GetConduitCollectionCount(): number;
    function GetConduitCollectionData(conduitID: number): ConduitCollectionData | undefined;
    function GetConduitCollectionDataAtCursor(): ConduitCollectionData | undefined;
    function GetConduitCollectionDataByVirtualID(virtualID: number): ConduitCollectionData | undefined;
    function GetConduitDisplayed(nodeID: number): number;
    function GetConduitHyperlink(conduitID: number, rank: number): string;
    function GetConduitIDPendingInstall(nodeID: number): number;
    function GetConduitQuality(conduitID: number, rank: number): number;
    function GetConduitRank(conduitID: number): number;
    function GetConduitSpellID(conduitID: number, conduitRank: number): number;
    function GetInstalledConduitID(nodeID: number): number;
    function GetNode(nodeID: number): SoulbindNode;
    function GetSoulbindData(soulbindID: number): SoulbindData;
    function GetSpecsAssignedToSoulbind(soulbindID: number): number[];
    function GetTree(treeID: number): SoulbindTree;
    function HasAnyInstalledConduitInSoulbind(soulbindID: number): boolean;
    function HasAnyPendingConduits(): boolean;
    function HasPendingConduitsInSoulbind(soulbindID: number): boolean;
    function IsConduitInstalled(nodeID: number): boolean;
    function IsConduitInstalledInSoulbind(soulbindID: number, conduitID: number): boolean;
    function IsItemConduitByItemInfo(itemInfo: ItemInfo): boolean;
    function IsNodePendingModify(nodeID: number): boolean;
    function IsUnselectedConduitPendingInSoulbind(soulbindID: number): boolean;
    function ModifyNode(nodeID: number, conduitID: number, type: Enum.SoulbindConduitTransactionType): void;
    function SelectNode(nodeID: number): void;
    function UnmodifyNode(nodeID: number): void;
}

declare namespace C_Sound {
    function GetSoundScaledVolume(soundHandle: number): number;
    function IsPlaying(soundHandle: number): boolean;
    function PlayItemSound(soundType: ItemSoundType, itemLocation: ItemLocationMixin): void;
    function PlaySound(soundKitID: number, uiSoundSubType?: UISoundSubType, forceNoDuplicates?: boolean, runFinishCallback?: boolean, overridePriority?: number, volumeOverride?: number): LuaMultiReturn<[success: boolean | undefined, soundHandle: number | undefined]>;
    function PlaySoundWithOptions(params: PlaySoundParams): LuaMultiReturn<[success: boolean | undefined, soundHandle: number | undefined]>;
    function PlayVocalErrorSound(vocalErrorSoundID: Vocalerrorsounds): void;
}

declare namespace C_SpecializationInfo {
    function CanPlayerUsePVPTalentUI(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseTalentSpecUI(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function CanPlayerUseTalentUI(): LuaMultiReturn<[canUse: boolean, failureReason: string]>;
    function GetActiveSpecGroup(isInspect?: boolean, isPet?: boolean): number;
    function GetAllClassIDs(): number[];
    function GetAllSelectedPvpTalentIDs(): number[];
    function GetClassIDFromSpecID(specID: number): number | undefined;
    function GetCombatConfigIDForSpecGroup(groupIndex: number): number | undefined;
    function GetInspectSelectedPvpTalent(inspectedUnit: UnitToken, talentIndex: number): number | undefined;
    function GetInspectSpecialization(unit: UnitToken): number;
    function GetNumSpecializationsForClassID(classID: number): number;
    function GetPvpTalentAlertStatus(): LuaMultiReturn<[hasUnspentSlot: boolean, hasNewTalent: boolean]>;
    function GetPvpTalentInfo(talentID: number): PvpTalentInfo | undefined;
    function GetPvpTalentSlotInfo(talentIndex: number): PvpTalentSlotInfo | undefined;
    function GetPvpTalentSlotUnlockLevel(talentIndex: number): number | undefined;
    function GetPvpTalentUnlockLevel(talentID: number): number | undefined;
    function GetSpecialization(isInspect?: boolean, isPet?: boolean, specGroupIndex?: number): number;
    function GetSpecializationInfo(specializationIndex: number, isInspect?: boolean, isPet?: boolean, inspectTarget?: string, sex?: number, groupIndex?: number, classID?: number): LuaMultiReturn<[specId: number, name: string | undefined, description: string | undefined, icon: number | undefined, role: string | undefined, primaryStat: number | undefined, pointsSpent: number, background: string | undefined, previewPointsSpent: number, isUnlocked: boolean]>;
    function GetSpecializationMasterySpells(specializationIndex: number, isInspect?: boolean, isPet?: boolean): number[];
    function GetSpecIDs(specSetID: number): number[];
    function GetSpellsDisplay(specializationID: number): number[];
    function GetTalentInfo(query: TalentInfoQuery): TalentInfoResult | undefined;
    function HasPlayerEarnedATalentPoint(): boolean;
    function IsInitialized(): boolean;
    function IsPvpTalentLocked(talentID: number): boolean;
    function IsSpecSelectionEnabled(classID: number): boolean;
    function MatchesCurrentSpecSet(specSetID: number): boolean;
    function SetActiveSpecGroup(groupIndex: number): void;
    function SetPetSpecialization(specIndex: number, petNumber?: number): void;
    function SetPvpTalentLocked(talentID: number, locked: boolean): void;
    function SetSpecialization(specIndex: number): boolean;
}

declare namespace C_Spell {
    /**
     * Cancels the player's active auto repeat spell, if any
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function CancelAutoRepeatSpell(): boolean;
    /**
     * Cancel a temporary enchantment on an item
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function CancelItemTempEnchantment(weaponSlot: Enum.WeaponSlot, enchantmentType: Enum.ItemEnchantType): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CancelSpellByID(spellID: number): void;
    /** Returns true if the spell exists, regardless of whether the player has learned it */
    function DoesSpellExist(spellIdentifier: number | string): boolean;
    /** Used in conjunction with SpellRangeCheckUpdate to inform the UI when a spell goes in or out of range with the current target. */
    function EnableSpellRangeCheck(spellIdentifier: number | string, enable: boolean): void;
    function GetAuraStatChanges(spellID: number): LuaMultiReturn<[healthChange: number, powerTypeChanges: PowerTypeChange[]]>;
    function GetBaseSpell(spellIdentifier: number | string, spec?: number): number;
    function GetDeadlyDebuffInfo(spellIdentifier: number | string): DeadlyDebuffInfo | undefined;
    /** Returns nil if the item is not found or on cooldown */
    function GetItemCooldown(itemID: number): SpellCooldownInfo | undefined;
    function GetItemModifiedAppearancesApplied(spellID: number): number[];
    /** Searches for the most recent spellID and itemID that started a cooldown in this category */
    function GetLastCategoryCooldownSource(spellCategory: number): LuaMultiReturn<[spellID: number | undefined, itemID: number | undefined]>;
    function GetMawPowerLinkBySpellID(spellID: number | string): string | undefined;
    function GetMawPowerRarityInfoBySpellID(spellID: number | string): LuaMultiReturn<[rarityID: number | undefined, rarityBorderAtlas: string | undefined]>;
    function GetOverrideSpell(spellIdentifier: number | string, spec?: number, onlyKnown?: boolean, ignoreOverrideSpellID?: number): number;
    function GetSchoolString(schoolMask: number): string;
    /** Returns nil if spell is not found */
    function GetSpellAutoCast(spellIdentifier: number | string): LuaMultiReturn<[autoCastAllowed: boolean | undefined, autoCastEnabled: boolean | undefined]>;
    /** Returns number of times a spell can be cast, typically based on availability of things like required reagent items; Returns 0 if spell is not found */
    function GetSpellCastCount(spellIdentifier: number | string): number;
    /** Returns a duration object describing the active recharge time for a spell. */
    function GetSpellChargeDuration(spellIdentifier: number | string): LuaDurationObject | undefined;
    /** Returns a table of info about the charges of a charge-accumulating spell; May return nil if spell is not found or is not charge-based */
    function GetSpellCharges(spellIdentifier: number | string): SpellChargeInfo | undefined;
    /** Returns nil if spell is not found */
    function GetSpellCooldown(spellIdentifier: number | string): SpellCooldownInfo | undefined;
    /** Returns a duration object describing the active cooldown duration for a spell. */
    function GetSpellCooldownDuration(spellIdentifier: number | string, ignoreGCD?: boolean): LuaDurationObject | undefined;
    /** Returns nil if spell is not found */
    function GetSpellDescription(spellIdentifier: number | string): string | undefined;
    /** Returns nil if spell is not found */
    function GetSpellDescriptionForItemLocation(spellIdentifier: number | string, itemLocation: ItemLocationMixin): string | undefined;
    /** Depending on the spell, return a string that is either the use count or number of charges. If value is beyond the display count parameter, returns the replacementString (defaults to '*'). */
    function GetSpellDisplayCount(spellIdentifier: number | string, maxDisplayCount?: number, replacementString?: string): string;
    /** Meant primarily for getting a spell id from a spell name or link; Returns nothing if spell does not exist */
    function GetSpellIDForSpellIdentifier(spellIdentifier: number | string): number | undefined;
    /** Returns nil if spell is not found */
    function GetSpellInfo(spellIdentifier: number | string): SpellInfo | undefined;
    /** Returns the level the spell is learned at; May return a different value if the player is currently Level Linked with another player */
    function GetSpellLevelLearned(spellIdentifier: number | string): number;
    /** Returns nil if spell is not found */
    function GetSpellLink(spellIdentifier: number | string, glyphID?: number): string | undefined;
    /** Returns a duration object describing the active loss of control cooldown duration for a spell. */
    function GetSpellLossOfControlCooldownDuration(spellIdentifier: number | string): LuaDurationObject | undefined;
    /** Returns nil if spell is not found */
    function GetSpellLossOfControlCooldownInfo(spellIdentifier: number | string): SpellLossOfControlInfo | undefined;
    function GetSpellMaxCumulativeAuraApplications(spellID: number | string): number;
    /** Returns nil if spell is not found */
    function GetSpellName(spellIdentifier: number | string): string | undefined;
    /** Returns a table containing one or more SpellPowerCostInfos, one for each power type this spell costs; May return nil if spell is not found or has no resource costs */
    function GetSpellPowerCost(spellIdentifier: number | string): SpellPowerCostInfo[] | undefined;
    function GetSpellQueueWindow(): number;
    /** Returns the rank of a spell that corresponds to an ability within a ranked SkillLine (ex: a crafting Recipe); Returns nil if spell is not found, or isn't part of a ranked SkillLine */
    function GetSpellSkillLineAbilityRank(spellIdentifier: number | string): number | undefined;
    /** Returns nil if spell is not found */
    function GetSpellSubtext(spellIdentifier: number | string): string | undefined;
    /** Returns nothing if spell is not found */
    function GetSpellTexture(spellIdentifier: number | string): LuaMultiReturn<[iconID: number | undefined, originalIconID: number | undefined, conditionalIconID: number | undefined]>;
    /** Returns nil if spell is not associated with a trade skill */
    function GetSpellTradeSkillLink(spellIdentifier: number | string): string | undefined;
    function GetTargetSpellID(): number;
    function GetVisibilityInfo(spellID: number, visibilityType: Enum.SpellAuraVisibilityType): LuaMultiReturn<[hasCustom: boolean | undefined, alwaysShowMine: boolean | undefined, showForMySpec: boolean | undefined]>;
    /** Returns true if the spell is a currently active toggled spell */
    function IsActiveSpell(spellIdentifier: number | string, targetUnit?: UnitToken): boolean;
    /** Returns true if the spell is the player's melee Auto Attack spell */
    function IsAutoAttackSpell(spellIdentifier: number | string): boolean;
    /** Returns true if the spell is an auto repeat player spell */
    function IsAutoRepeatSpell(spellIdentifier: number | string): boolean;
    /** Returns true if the spell comes from a Class Talent */
    function IsClassTalentSpell(spellIdentifier: number | string): boolean;
    function IsConsumableSpell(spellIdentifier: number | string): boolean;
    /** Returns true if the spell is currently being cast or is queued to be cast */
    function IsCurrentSpell(spellIdentifier: number | string): boolean;
    /** Returns true if an aura is considered an external defensive. */
    function IsExternalDefensive(spellID: number): boolean;
    /** Returns true if the spell is an 'empower' type spell that is cast by pressing and holding, with the on-release cast typically being affected by time held */
    function IsPressHoldReleaseSpell(spellIdentifier: number | string): boolean;
    /** Returns true if an aura is considered high priority and should be ordered ahead of other auras in the UI. */
    function IsPriorityAura(spellID: number): boolean;
    /** Returns true if the spell comes from a PvP Talent */
    function IsPvPTalentSpell(spellIdentifier: number | string): boolean;
    /** Returns true if the spell is the player's ranged Auto Attack spell (ex: Shoot, Auto Shot, etc) */
    function IsRangedAutoAttackSpell(spellIdentifier: number | string): boolean;
    /** Returns true if an aura only applies effects to the player, and no other units. */
    function IsSelfBuff(spellID: number): boolean;
    /** Returns true if the spell causes a crowd control effect when cast on a valid target. */
    function IsSpellCrowdControl(spellIdentifier: number | string): boolean;
    /** Returns true if data for the spell has already been loaded and cached this session */
    function IsSpellDataCached(spellIdentifier: number | string): boolean;
    function IsSpellDisabled(spellIdentifier: number | string): boolean;
    /** Returns true if the spell can be cast on hostile targets */
    function IsSpellHarmful(spellIdentifier: number | string): boolean;
    /** Returns true if the spell can be cast on the player or other friendly targets */
    function IsSpellHelpful(spellIdentifier: number | string): boolean;
    /** Returns true if the spell is considered important. For example a spell that's lethal if not interrupted would be considered important. */
    function IsSpellImportant(spellIdentifier: number | string): boolean;
    /** Returns true if the current target is within range of the spell; False if out of range; Nil if range check was invalid */
    function IsSpellInRange(spellIdentifier: number | string, targetUnit?: UnitToken): boolean | undefined;
    function IsSpellPassive(spellIdentifier: number | string): boolean;
    /** Returns whether the spell is currently castable; Typically based on things like learned status, required resources, etc */
    function IsSpellUsable(spellIdentifier: number | string): LuaMultiReturn<[isUsable: boolean, insufficientPower: boolean]>;
    function PickupSpell(spellIdentifier: number | string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PlaceTargetingSpellAtCursor(): void;
    /** Requests data for the spell be loaded; Listen for SPELL_DATA_LOAD_RESULT to be notified when load is finished */
    function RequestLoadSpellData(spellIdentifier: number | string): void;
    function SetSpellAutoCastEnabled(spellIdentifier: number | string, enabled: boolean): void;
    /** Returns true if the spell has a min and/or max range greater than 0 */
    function SpellHasRange(spellIdentifier: number | string): boolean;
    function TargetSpellChecksItemCondition(): boolean;
    function TargetSpellIsEnchanting(): boolean;
    function TargetSpellJumpsUpgradeTrack(): boolean;
    function TargetSpellReplacesBonusTree(): boolean;
    /** Toggles whether spell's autoCast is enabled */
    function ToggleSpellAutoCast(spellIdentifier: number | string): void;
}

declare namespace C_SpellActivationOverlay {
    function IsSpellOverlayed(spellID: number): boolean;
}

declare namespace C_SpellBook {
    function AbortSpellIntro(spellID: number): void;
    function CastSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank, targetSelf?: boolean): void;
    /** Returns true if player knows any Disenchant spells */
    function ContainsAnyDisenchantSpell(): boolean;
    function FindBaseSpellByID(spellID: number): number | undefined;
    function FindFlyoutSlotBySpellID(spellID: number): number;
    /** If found, returns the first slot position of a SpellBookItem matching the specified spell and criteria */
    function FindSpellBookSlotForSpell(spellIdentifier: number | string, includeHidden?: boolean, includeFlyouts?: boolean, includeFutureSpells?: boolean, includeOffSpec?: boolean): LuaMultiReturn<[spellBookItemSlotIndex: number | undefined, spellBookItemSpellBank: Enum.SpellBookSpellBank | undefined]>;
    function FindSpellOverrideByID(spellID: number): number | undefined;
    function GetClassSkillLineInfo(): SpellBookSkillLineInfo | undefined;
    /** Returns general, class, and active spec spells that are learned at the specified level */
    function GetCurrentLevelSpells(level: number): number[] | undefined;
    function GetNumSpellBookSkillLines(): number;
    function GetSkillLineIndexByID(skillLineID: number): number | undefined;
    /** Returns nothing if item doesn't exist or isn't a spell */
    function GetSpellBookItemAutoCast(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaMultiReturn<[autoCastAllowed: boolean | undefined, autoCastEnabled: boolean | undefined]>;
    /** Returns number of times a SpellBookItem can be cast, typically based on availability of things like required reagent items; Always returns 0 if item is not found or is not a spell */
    function GetSpellBookItemCastCount(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): number;
    /** Returns a duration object describing the active recharge time for a spellbook item. */
    function GetSpellBookItemChargeDuration(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaDurationObject | undefined;
    /** Returns a table of info about the charges of a charge-accumulating SpellBookItem; May return nil if item is not found or is not charge-based */
    function GetSpellBookItemCharges(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): SpellChargeInfo | undefined;
    /** Returns nil if item doesn't exist or if this kind of item doesn't display cooldowns (ex: future or offspec spells) */
    function GetSpellBookItemCooldown(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): SpellCooldownInfo | undefined;
    /** Returns a duration object describing the active cooldown duration for a spellbook item. */
    function GetSpellBookItemCooldownDuration(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank, ignoreGCD?: boolean): LuaDurationObject | undefined;
    function GetSpellBookItemDescription(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): string | undefined;
    function GetSpellBookItemInfo(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): SpellBookItemInfo | undefined;
    /** Returns the level the spell is learned at; May return a different value if the player is currently Level Linked with another player; Returns 0 if item is not a Spell */
    function GetSpellBookItemLevelLearned(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): number;
    function GetSpellBookItemLink(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank, glyphID?: number): string | undefined;
    /** Returns a duration object describing the active loss of control cooldown duration for a spellbook item. */
    function GetSpellBookItemLossOfControlCooldownDuration(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaDurationObject | undefined;
    /** Returns nil if item doesn't exist or if this kind of item doesn't display cooldowns (ex: future or offspec spells) */
    function GetSpellBookItemLossOfControlCooldownInfo(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): SpellLossOfControlInfo | undefined;
    function GetSpellBookItemName(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaMultiReturn<[name: string | undefined, subName: string | undefined]>;
    /** Returns a table containing one or more SpellPowerCostInfos, one for each power type a SpellBookItem costs; May return nil if item is not found or has no resource costs */
    function GetSpellBookItemPowerCost(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): SpellPowerCostInfo[] | undefined;
    /** Get the index of the SkillLine this SpellBookItem is part of */
    function GetSpellBookItemSkillLineIndex(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): number | undefined;
    function GetSpellBookItemTexture(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): number | undefined;
    /** Returns nil if SpellBookItem is not associated with a trade skill */
    function GetSpellBookItemTradeSkillLink(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): string | undefined;
    function GetSpellBookItemType(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaMultiReturn<[itemType: Enum.SpellBookItemType | undefined, actionID: number | undefined, spellID: number | undefined]>;
    function GetSpellBookSkillLineInfo(skillLineIndex: number): SpellBookSkillLineInfo | undefined;
    /** Returns nothing if player has no pet spells */
    function HasPetSpells(): LuaMultiReturn<[numPetSpells: number | undefined, petNameToken: string | undefined]>;
    /** Returns true if the SpellBookItem is the player's melee Auto Attack spell */
    function IsAutoAttackSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem comes from a Class Talent */
    function IsClassTalentSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem comes from a PvP Talent */
    function IsPvPTalentSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem is the player's ranged Auto Attack spell (ex: Shoot, Auto Shot, etc) */
    function IsRangedAutoAttackSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookIem can be cast on hostile targets */
    function IsSpellBookItemHarmful(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookIem can be cast on the player or other friendly targets */
    function IsSpellBookItemHelpful(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the current target is within range of the SpellBookIem; False if out of range; Nil if range check was invalid */
    function IsSpellBookItemInRange(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank, targetUnit?: UnitToken): boolean | undefined;
    /** Returns true if the SpellBookItem is represented in a Flyout. */
    function IsSpellBookItemLooseFlyoutMember(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem is a lower rank of a known higher rank spell.  Returns false if there is only a single rank or it is the highest rank known. */
    function IsSpellBookItemLowRank(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem belongs to a non-active class specialization */
    function IsSpellBookItemOffSpec(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns true if the SpellBookItem is a passive spell; Will always return false if it is not a spell */
    function IsSpellBookItemPassive(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    /** Returns whether the SpellBookIem is currently castable; Typically based on things like learned status, required resources, etc */
    function IsSpellBookItemUsable(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): LuaMultiReturn<[isUsable: boolean, insufficientPower: boolean]>;
    /** Returns true if a spell should be found in the spellbook. This function can also return true for spells that aren't known, such as override spells granted by an aura linked to class talents */
    function IsSpellInSpellBook(spellID: number, spellBank?: Enum.SpellBookSpellBank, includeOverrides?: boolean): boolean;
    /** Returns true if a player knows a spell. This function can also return true for spells that aren't in the spellbook, such as temporarily-granted abilities */
    function IsSpellKnown(spellID: number, spellBank?: Enum.SpellBookSpellBank): boolean;
    /** Returns true if a spell is considered to be known or present in the spellbook */
    function IsSpellKnownOrInSpellBook(spellID: number, spellBank?: Enum.SpellBookSpellBank, includeOverrides?: boolean): boolean;
    function PickupSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): void;
    function SetBarSlotFromIntro(spellID: number, slotIndex: number): void;
    function SetSpellBookItemAutoCastEnabled(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank, enabled: boolean): void;
    /** Returns true if the SpellBookIem has a min and/or max range greater than 0; Will always return false if it is not a spell */
    function SpellBookItemHasRange(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): boolean;
    function ToggleSpellBookItemAutoCast(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): void;
}

declare namespace C_SpellDiminish {
    function GetAllSpellDiminishCategories(ruleset?: Enum.SpellDiminishRuleset): SpellDiminishCategoryInfo[];
    function GetSpellDiminishCategoryInfo(category: Enum.SpellDiminishCategory): SpellDiminishCategoryInfo | undefined;
    function IsSystemSupported(): boolean;
    function ShouldTrackSpellDiminishCategory(category: Enum.SpellDiminishCategory, ruleset: Enum.SpellDiminishRuleset): boolean;
}

declare namespace C_SplashScreen {
    function AcknowledgeSplash(): void;
    function CanViewSplashScreen(): boolean;
    function RequestLatestSplashScreen(fromGameMenu: boolean): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendSplashScreenActionLaunchedTelem(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendSplashScreenCloseTelem(): void;
}

declare namespace C_StableInfo {
    function BuyStableSlot(): void;
    function ClosePetStables(): void;
    function GetActivePetList(): PetInfo[];
    function GetAvailablePetSpecInfos(): PetSpecInfo[];
    function GetNextStableSlotCost(): number;
    function GetNumActivePets(): number;
    function GetNumStablePets(): number;
    function GetNumStableSlots(): number;
    function GetStabledPetList(): PetInfo[];
    function GetStablePetFoodTypes(index: number): string[];
    function GetStablePetInfo(index: number): PetInfo | undefined;
    function IsAtStableMaster(): boolean;
    function IsBonusPetSlotAvailable(): boolean;
    function IsPetFavorite(slot: number): boolean;
    function PickupStablePet(index: number): void;
    function SetPetFavorite(slot: number, isFavorite: boolean): void;
    function SetPetSlot(index: number, slot: number): void;
}

declare namespace C_StorePublic {
    function DoesGroupHavePurchaseableProducts(groupID: number): boolean;
    function EventStoreUISetShown(newShown: boolean, contextKey?: string): void;
    function IsEnabled(): boolean;
}

declare namespace C_StringUtil {
    /** Creates a numeric formatter that converts numbers to abbreviated strings, eg. 123456 -> '123k'. */
    function CreateAbbreviatedNumberFormatter(): AbbreviatedNumberFormatter;
    /** Creates a numeric formatter that converts numbers to strings with flexible rulesets. */
    function CreateNumericRuleFormatter(): NumericRuleFormatter;
    /** Creates a numeric formatter that converts numbers measuring durations in seconds to strings, eg. 93 -> '1m 33s'. */
    function CreateSecondsFormatter(): SecondsFormatter;
    /** Returns a string with ASCII control characters (except 
, , and 	) and invalid UTF-8 bytes replaced by decimal escape sequences (e.g. \127). */
    function EscapeDecimalNonPrintables(text: string): string;
    /** Returns a string with Lua format string tokens ('%') escaped. */
    function EscapeLuaFormatString(text: string): string;
    /** Returns a string with all Lua pattern characters escaped. */
    function EscapeLuaPatterns(text: string): string;
    /** Returns a string with all quoted code sequences ('|' characters) escaped. */
    function EscapeQuotedCodes(text: string): string;
    function FloorToNearestString(number: number): string;
    /** Returns a string with all contiguous occurrences of ASCII space characters truncated. */
    function RemoveContiguousSpaces(text: string, maxAllowedSpaces: number): string;
    function RoundToNearestString(number: number): string;
    function StripHyperlinks(text: string, maintainColor?: boolean, maintainBrackets?: boolean, stripNewlines?: boolean, maintainAtlases?: boolean, maintainTextures?: boolean): string;
    function StripTextureMarkupForLooseFiles(text: string): string;
    /** Formats the given number to a string as an integer (rounding down). If the integer is zero, returns an empty string. */
    function TruncateWhenZero(number: number): string;
    /** Returns a string with 'prefix' and 'suffix' joined to 'infix' iif 'infix' is not an empty string. Else, an empty string is returned. */
    function WrapString(infix: string, prefix?: string, suffix?: string): string;
}

declare namespace C_SummonInfo {
    function CancelSummon(): void;
    function ConfirmSummon(): void;
    function GetSummonConfirmAreaName(): string;
    function GetSummonConfirmSummoner(): string | undefined;
    function GetSummonConfirmTimeLeft(): number;
    function GetSummonReason(): number;
    function IsSummonSkippingStartExperience(): boolean;
}

declare namespace C_SuperTrack {
    function ClearAllSuperTracked(): void;
    function ClearSuperTrackedContent(): void;
    function ClearSuperTrackedMapPin(): void;
    function GetHighestPrioritySuperTrackingType(): Enum.SuperTrackingType | undefined;
    function GetSuperTrackedContent(): LuaMultiReturn<[trackableType: Enum.ContentTrackingType | undefined, trackableID: number | undefined]>;
    function GetSuperTrackedItemName(): LuaMultiReturn<[name: string | undefined, description: string | undefined]>;
    function GetSuperTrackedMapPin(): LuaMultiReturn<[type: Enum.SuperTrackingMapPinType | undefined, typeID: number | undefined]>;
    function GetSuperTrackedQuestID(): number | undefined;
    function GetSuperTrackedVignette(): string | undefined;
    function IsSuperTrackingAnything(): boolean;
    function IsSuperTrackingContent(): boolean;
    function IsSuperTrackingCorpse(): boolean;
    function IsSuperTrackingMapPin(): boolean;
    function IsSuperTrackingQuest(): boolean;
    function IsSuperTrackingUserWaypoint(): boolean;
    function SetSuperTrackedContent(trackableType: Enum.ContentTrackingType, trackableID: number): void;
    function SetSuperTrackedMapPin(type: Enum.SuperTrackingMapPinType, typeID: number): void;
    function SetSuperTrackedQuestID(questID: number): void;
    function SetSuperTrackedUserWaypoint(superTracked: boolean): void;
    function SetSuperTrackedVignette(vignetteGUID: string): void;
}

declare namespace C_SwingTimer {
    /** Used in conjunction with PlayerSwingRangeUpdate to inform the UI when the current target goes in or out of auto attack range. */
    function EnableRangeCheck(swingType: Enum.PlayerSwingType, enable: boolean): void;
    /** Whether the current target is within range of the player's auto attack for the given swing type. Auto attacks only ever apply to the current target, so no other unit can be queried. */
    function IsTargetWithinSwingRange(swingType: Enum.PlayerSwingType): boolean | undefined;
}

declare namespace C_System {
    function GetFrameStack(): ScriptRegion[];
}

declare namespace C_SystemVisibilityManager {
    function IsSystemVisible(system: Enum.UISystemType): boolean;
}

declare namespace C_TaskQuest {
    function DoesMapShowTaskQuestObjectives(uiMapID: number): boolean;
    function GetQuestInfoByQuestID(questID: number): LuaMultiReturn<[questTitle: string | undefined, factionID: number | undefined, capped: boolean | undefined, displayAsObjective: boolean | undefined]>;
    function GetQuestLocation(questID: number, uiMapID: number): LuaMultiReturn<[locationX: number | undefined, locationY: number | undefined]>;
    function GetQuestProgressBarInfo(questID: number): number | undefined;
    function GetQuestsOnMap(uiMapID: number): QuestPOIMapInfo[] | undefined;
    function GetQuestTimeLeftMinutes(questID: number): number | undefined;
    function GetQuestTimeLeftSeconds(questID: number): number | undefined;
    function GetQuestUIWidgetSetByType(questID: number, type: Enum.MapIconUIWidgetSetType): number | undefined;
    function GetQuestZoneID(questID: number): number | undefined;
    function GetThreatQuests(): number[];
    function IsActive(questID: number): boolean;
    function RequestPreloadRewardData(questID: number): void;
}

declare namespace C_TaxiMap {
    /** Returns information on taxi nodes at the current flight master. */
    function GetAllTaxiNodes(uiMapID: number): TaxiNodeInfo[];
    /** Returns information on taxi nodes for a given map, without considering the current flight master. */
    function GetTaxiNodesForMap(uiMapID: number): MapTaxiNodeInfo[];
    function ShouldMapShowTaxiNodes(uiMapID: number): boolean;
}

declare namespace C_Texture {
    function ClearTitleIconTexture(texture: Texture): void;
    function GetAtlasElementID(atlas: string): number;
    function GetAtlasElements(): string[];
    function GetAtlasExists(atlas: string): boolean;
    function GetAtlasID(atlas: string): number;
    function GetAtlasInfo(atlas: string): AtlasInfo | undefined;
    function GetFilenameFromFileDataID(fileDataID: number): string;
    function GetTitleIconTexture(titleID: string, version: Enum.TitleIconVersion, callback: GetTitleIconTextureCallback, subIcon?: string): void;
    function IsTitleIconTextureReady(titleID: string, version: Enum.TitleIconVersion, subIcon?: string): boolean;
    function SetTitleIconTexture(texture: Texture, titleID: string, version: Enum.TitleIconVersion, subIcon?: string): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetURLTexture(texture: Texture, url: string): void;
}

declare namespace C_Timer {
    function After(seconds: number, callback: TimerCallback): void;
    function NewTicker(seconds: number, callback: (this: void, ticker: TimerHandle) => void, iterations?: number): TimerHandle;
    /** Creates a new timed signal map that invokes the supplied callback with each key as it becomes due. */
    function NewTimedSignalMap(callback: TimedSignalMapCallback): TimedSignalMap;
    function NewTimer(seconds: number, callback: (this: void, timer: TimerHandle) => void): TimerHandle;
}

declare namespace C_TimerunningUI {
    function GetActiveTimerunningSeasonID(): number;
}

declare namespace C_TooltipComparison {
    /** @remarks Protected: only callable from secure (untainted) code. */
    function CompareItem(comparisonItem: TooltipComparisonItem, tooltip: GameTooltip, anchorFrame?: Frame): void;
    function GetItemComparisonDelta(comparisonItem: TooltipComparisonItem, equippedItem: TooltipComparisonItem, pairedItem?: TooltipComparisonItem, addPairedStats?: boolean): string[] | undefined;
    function GetItemComparisonInfo(comparisonItem: TooltipComparisonItem): TooltipItemComparisonInfo | undefined;
}

declare namespace C_TooltipInfo {
    function GetAchievementByID(achievementID: number): TooltipData | undefined;
    function GetAction(actionID: number): TooltipData | undefined;
    function GetArtifactItem(): TooltipData | undefined;
    function GetArtifactPowerByID(powerID: number): TooltipData | undefined;
    function GetAzeriteEssence(essenceID: number, rank?: number): TooltipData | undefined;
    function GetAzeriteEssenceSlot(slot: Enum.AzeriteEssenceSlot): TooltipData | undefined;
    function GetAzeritePower(itemID: number, itemLevel: number, powerID: number, owningItemLink?: string): TooltipData | undefined;
    function GetBackpackToken(index: number): TooltipData | undefined;
    function GetBagItem(bagIndex: Enum.BagIndex, slotIndex: number): TooltipData | undefined;
    function GetBagItemChild(bagIndex: Enum.BagIndex, slotIndex: number, equipSlotIndex: number): TooltipData | undefined;
    function GetBuybackItem(index: number): TooltipData | undefined;
    function GetCompanionPet(petGUID: string): TooltipData | undefined;
    function GetConduit(conduitID: number, conduitRank: number): TooltipData | undefined;
    function GetCurrencyByID(currencyID: number, amount?: number): TooltipData | undefined;
    function GetCurrencyToken(tokenIndex: number): TooltipData | undefined;
    function GetEnhancedConduit(conduitID: number, rank: number): TooltipData | undefined;
    function GetEquipmentSet(setID: number): TooltipData | undefined;
    function GetExistingSocketGem(index: number, toDestroy?: boolean): TooltipData | undefined;
    function GetGuildBankItem(tab: number, slot: number): TooltipData | undefined;
    function GetHeirloomByItemID(itemID: number): TooltipData | undefined;
    function GetHyperlink(hyperlink: string, optionalArg1?: number, optionalArg2?: number, hideVendorPrice?: boolean): TooltipData | undefined;
    function GetInboxItem(messageIndex: number, attachmentIndex?: number): TooltipData | undefined;
    function GetInstanceLockEncountersComplete(index: number): TooltipData | undefined;
    function GetInventoryItem(unit: UnitToken, slot: number, hideUselessStats?: boolean): TooltipData | undefined;
    function GetInventoryItemByID(itemID: number): TooltipData | undefined;
    function GetItemByGUID(guid: string): TooltipData | undefined;
    function GetItemByID(itemID: number, quality?: number, itemContext?: number, treasureContextLevel?: number): TooltipData | undefined;
    function GetItemByItemModifiedAppearanceID(itemModifiedAppearanceID: number): TooltipData | undefined;
    function GetItemInteractionItem(): TooltipData | undefined;
    function GetItemKey(itemID: number, itemLevel: number, itemSuffix: number, requiredLevel?: number): TooltipData | undefined;
    function GetLFGDungeonReward(dungeonID: number, lootIndex: number): TooltipData | undefined;
    function GetLFGDungeonShortageReward(dungeonID: number, shortageSeverity: number, lootIndex: number): TooltipData | undefined;
    function GetLootCurrency(slot: number): TooltipData | undefined;
    function GetLootItem(slot: number): TooltipData | undefined;
    function GetLootRollItem(id: number): TooltipData | undefined;
    function GetMerchantCostItem(slot: number, costIndex: number): TooltipData | undefined;
    function GetMerchantItem(slot: number): TooltipData | undefined;
    function GetMinimapMouseover(): TooltipData | undefined;
    function GetMountBySpellID(spellID: number | string, checkIndoors?: boolean): TooltipData | undefined;
    function GetOutfit(outfitID: number): TooltipData | undefined;
    function GetOwnedItemByID(itemID: number): TooltipData | undefined;
    function GetPetAction(slot: number): TooltipData | undefined;
    function GetPossession(slot: number): TooltipData | undefined;
    function GetPvpBrawl(isSpecial?: boolean): TooltipData | undefined;
    function GetPvpTalent(talentID: number, isInspect?: boolean, groupIndex?: number, talentIndex?: number): TooltipData | undefined;
    function GetQuestCurrency(type: string, currencyIndex: number): TooltipData | undefined;
    function GetQuestItem(type: string, itemIndex: number, allowCollectionText?: boolean): TooltipData | undefined;
    function GetQuestLogCurrency(type: string, currencyIndex: number, questID?: number): TooltipData | undefined;
    function GetQuestLogItem(type: string, itemIndex: number, questID?: number, allowCollectionText?: boolean): TooltipData | undefined;
    function GetQuestLogSpecialItem(questIndex: number): TooltipData | undefined;
    function GetQuestPartyProgress(questID: number, omitTitle?: boolean, ignoreActivePlayer?: boolean): TooltipData | undefined;
    function GetRecipeRankInfo(recipeID: number, rank: number): TooltipData | undefined;
    function GetRecipeReagentItem(recipeSpellID: number, dataSlotIndex: number): TooltipData | undefined;
    function GetRecipeResultItem(recipeID: number, reagentInfos?: CraftingReagentInfo[], recraftItemGUID?: string, recipeLevel?: number, overrideQualityID?: number): TooltipData | undefined;
    function GetRecipeResultItemForOrder(recipeID: number, reagentInfos?: CraftingReagentInfo[], orderID?: number, recipeLevel?: number, overrideQualityID?: number): TooltipData | undefined;
    function GetRuneforgeResultItem(itemGUID: string, itemLevel: number, powerID?: number, modifiers?: number[]): TooltipData | undefined;
    function GetSendMailItem(attachmentIndex?: number): TooltipData | undefined;
    function GetShapeshift(slot: number): TooltipData | undefined;
    function GetSlottedKeystone(): TooltipData | undefined;
    function GetSocketedItem(): TooltipData | undefined;
    function GetSocketedRelic(slotIndex: number): TooltipData | undefined;
    function GetSocketGem(index: number): TooltipData | undefined;
    function GetSpellBookItem(spellBookItemSlotIndex: number, spellBookItemSpellBank: Enum.SpellBookSpellBank): TooltipData | undefined;
    function GetSpellByID(spellID: number | string, isPet?: boolean, showSubtext?: boolean, dontOverride?: boolean, difficultyID?: number, isLink?: boolean): TooltipData | undefined;
    function GetTalent(talentID: number, isInspect?: boolean, groupIndex?: number): TooltipData | undefined;
    function GetTotem(slot: number): TooltipData | undefined;
    function GetToyByItemID(itemID: number): TooltipData | undefined;
    function GetTradePlayerItem(slot: number): TooltipData | undefined;
    function GetTradeTargetItem(slot: number): TooltipData | undefined;
    function GetTrainerService(serviceIndex: number): TooltipData | undefined;
    function GetTraitEntry(entryID: number, rank?: number): TooltipData | undefined;
    function GetUnit(unit: UnitToken, hideStatus?: boolean): TooltipData | undefined;
    function GetUnitAura(unitToken: UnitToken, index: number, filter?: AuraFilters): TooltipData | undefined;
    /** Obtains aura info like other functions with the caveat that the filters will always at least include the typically mutually exclusive HELPFUL|HARMFUL regardless of what the argument value is set to */
    function GetUnitAuraByAuraInstanceID(unitToken: UnitToken, auraInstanceID: number, filter?: AuraFilters): TooltipData | undefined;
    function GetUnitBuff(unitToken: UnitToken, index: number, filter?: AuraFilters): TooltipData | undefined;
    function GetUnitBuffByAuraInstanceID(unitToken: UnitToken, auraInstanceID: number, filter?: AuraFilters): TooltipData | undefined;
    function GetUnitDebuff(unitToken: UnitToken, index: number, filter?: AuraFilters): TooltipData | undefined;
    function GetUnitDebuffByAuraInstanceID(unitToken: UnitToken, auraInstanceID: number, filter?: AuraFilters): TooltipData | undefined;
    function GetUpgradeItem(): TooltipData | undefined;
    function GetWeeklyReward(itemDBID: WeeklyRewardItemDBID): TooltipData | undefined;
    function GetWorldCursor(): TooltipData | undefined;
    function GetWorldLootObject(unitTokenString: string): TooltipData | undefined;
}

declare namespace C_ToyBoxInfo {
    function ClearFanfare(itemID: number): void;
    function HasAnyToy(): boolean;
    function IsToySourceValid(source: number): boolean;
    function IsUsingDefaultFilters(): boolean;
    function NeedsFanfare(itemID: number): boolean;
    function SetDefaultFilters(): void;
}

declare namespace C_TradeInfo {
    /**
     * Adds any cursor-held money to the current trade offer.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function AddTradeMoney(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function PickupTradeMoney(amount: number): void;
    /**
     * Sets the amount of money in the current trade offer.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function SetTradeMoney(amount: number): void;
    function ShouldShowTradeOfferWarning(): boolean;
}

declare namespace C_TradeSkillUI {
    function CancelProfessionRespec(): void;
    function CanStoreEnchantInItem(itemGUID: string): boolean;
    function CanTradeSkillShowCraftingUI(tradeSkillSpellID: number): boolean;
    function CheckRespecNPC(): boolean;
    function CloseTradeSkill(): void;
    function ConfirmProfessionRespec(): void;
    function CraftEnchant(recipeSpellID: number, numCasts?: number, craftingReagents?: CraftingReagentInfo[], itemTarget?: ItemLocationMixin, applyConcentration?: boolean): void;
    function CraftRecipe(recipeSpellID: number, numCasts?: number, craftingReagents?: CraftingReagentInfo[], recipeLevel?: number, orderID?: number, applyConcentration?: boolean): void;
    function CraftSalvage(recipeSpellID: number, numCasts: number, itemTarget: ItemLocationMixin, craftingReagents?: CraftingReagentInfo[], applyConcentration?: boolean): void;
    function DoesRecraftingRecipeAcceptItem(itemLocation: ItemLocationMixin, recipeID: number): boolean;
    function GetAllProfessionTradeSkillLines(): number[];
    function GetBaseProfessionInfo(): ProfessionInfo;
    function GetChildProfessionInfo(): ProfessionInfo;
    function GetChildProfessionInfos(): ProfessionInfo[];
    function GetConcentrationCurrencyID(skillLineID: number): number;
    function GetCraftableCount(recipeSpellID: number, recipeLevel?: number): number;
    function GetCraftingOperationInfo(recipeID: number, craftingReagents: CraftingReagentInfo[], allocationItemGUID: string | undefined, applyConcentration: boolean): CraftingOperationInfo | undefined;
    function GetCraftingOperationInfoForOrder(recipeID: number, craftingReagents: CraftingReagentInfo[], orderID: number, applyConcentration: boolean): CraftingOperationInfo | undefined;
    function GetCraftingReagentBonusText(recipeSpellID: number, craftingReagentIndex: number, craftingReagents: CraftingReagentInfo[], allocationItemGUID?: string): string[];
    function GetCraftingTargetItems(itemIDs: number[]): CraftingTargetItem[];
    function GetDependentReagents(reagent: CraftingReagent): CraftingReagent[];
    function GetEnchantItems(recipeID: number, craftingReagents?: CraftingReagentInfo[]): string[];
    function GetFactionSpecificOutputItem(recipeSpellID: number): number | undefined;
    function GetGatheringOperationInfo(recipeID: number): GatheringOperationInfo | undefined;
    function GetHideUnownedFlags(recipeID: number): LuaMultiReturn<[cannotModifyHideUnowned: boolean, alwaysShowUnowned: boolean]>;
    function GetItemCraftedQualityByItemInfo(itemInfo: ItemInfo): number | undefined;
    function GetItemCraftedQualityInfo(itemInfo: ItemInfo): CraftingQualityInfo | undefined;
    function GetItemReagentQualityByItemInfo(itemInfo: ItemInfo): number | undefined;
    function GetItemReagentQualityInfo(itemInfo: ItemInfo): CraftingQualityInfo | undefined;
    function GetItemSlotModifications(itemGUID: string): CraftingItemSlotModification[];
    function GetItemSlotModificationsForOrder(orderID: number): CraftingItemSlotModification[];
    function GetOriginalCraftRecipeID(itemGUID: string): LuaMultiReturn<[recipeID: number | undefined, skillLineAbilityID: number | undefined]>;
    function GetProfessionByInventorySlot(slot: number): Enum.Profession | undefined;
    function GetProfessionChildSkillLineID(): number;
    function GetProfessionForCursorItem(): Enum.Profession | undefined;
    function GetProfessionInfoByRecipeID(recipeID: number): ProfessionInfo;
    function GetProfessionInfoBySkillLineID(skillLineID: number): ProfessionInfo;
    function GetProfessionInventorySlots(): InventorySlots[];
    function GetProfessionNameForSkillLineAbility(skillLineAbilityID: number): string;
    function GetProfessionSkillLineID(profession: Enum.Profession): number;
    function GetProfessionSlots(profession: Enum.Profession): number[];
    function GetProfessionSpells(professionID: number, skillLineID?: number): number[];
    function GetQualitiesForRecipe(recipeID: number): number[] | undefined;
    function GetReagentDifficultyText(craftingReagentIndex: number, craftingReagents: CraftingReagentInfo[]): string;
    function GetReagentSlotStatus(mcrSlotID: number, recipeSpellID: number, skillLineAbilityID: number): LuaMultiReturn<[locked: boolean, lockedReason: string]>;
    function GetRecipeDescription(recipeID: number, craftingReagents: CraftingReagentInfo[], allocationItemGUID?: string): string;
    function GetRecipeInfo(recipeSpellID: number, recipeLevel?: number): TradeSkillRecipeInfo | undefined;
    function GetRecipeInfoForSkillLineAbility(skillLineAbilityID: number, recipeLevel?: number): TradeSkillRecipeInfo | undefined;
    function GetRecipeItemQualityInfo(recipeID: number, quality: number): CraftingQualityInfo | undefined;
    function GetRecipeOutputItemData(recipeSpellID: number, reagents?: CraftingReagentInfo[], allocationItemGUID?: string, overrideQualityID?: number, recraftOrderID?: number): CraftingRecipeOutputInfo;
    function GetRecipeQualityItemIDs(recipeSpellID: number): number[] | undefined;
    function GetRecipeQualityReagentLink(recipeID: number, dataSlotIndex: number, qualityIndex: number): string;
    function GetRecipeRequirements(recipeID: number): CraftingRecipeRequirement[];
    function GetRecipeSchematic(recipeSpellID: number, isRecraft: boolean, recipeLevel?: number): CraftingRecipeSchematic;
    function GetRecipesTracked(isRecraft: boolean): number[];
    function GetRecraftItems(recipeID?: number): string[];
    function GetRecraftRemovalWarnings(itemGUID: string, replacedReagents: CraftingReagent[]): string[];
    function GetRemainingRecasts(): number;
    function GetSalvagableItemIDs(recipeID: number): number[];
    function GetShowLearned(): boolean;
    function GetShowUnlearned(): boolean;
    function GetSkillLineForGear(itemInfo: ItemInfo): number | undefined;
    function GetSourceTypeFilter(): number;
    function GetTradeSkillDisplayName(skillLineID: number): string;
    function HasFavoriteOrderRecipes(): boolean;
    function IsEnchantTargetValid(recipeID: number, itemGUID: string, craftingReagents?: CraftingReagentInfo[]): boolean;
    function IsGuildTradeSkillsEnabled(): boolean;
    function IsNearProfessionSpellFocus(profession: Enum.Profession): boolean;
    function IsNPCCrafting(): boolean;
    function IsOriginalCraftRecipeLearned(itemGUID: string): boolean;
    function IsRecipeFirstCraft(recipeID: number): boolean;
    function IsRecipeInBaseSkillLine(recipeID: number): boolean;
    function IsRecipeInSkillLine(recipeID: number, skillLineID: number): boolean;
    function IsRecipeProfessionLearned(recipeID: number): boolean;
    function IsRecipeTracked(recipeID: number, isRecraft: boolean): boolean;
    function IsRecraftItemEquipped(recraftItemGUID: string): boolean;
    function IsRecraftReagentValid(itemGUID: string, reagent: CraftingReagent): boolean;
    function IsRuneforging(): boolean;
    function OpenRecipe(recipeID: number): void;
    function OpenTradeSkill(skillLineID: number): boolean;
    function RecraftLimitCategoryValid(reagent: CraftingReagent): boolean;
    function RecraftRecipe(itemGUID: string, craftingReagents?: CraftingReagentInfo[], removedModifications?: CraftingItemSlotModification[], applyConcentration?: boolean): boolean;
    function RecraftRecipeForOrder(orderID: number, itemGUID: string, craftingReagents?: CraftingReagentInfo[], removedModifications?: CraftingItemSlotModification[], applyConcentration?: boolean): boolean;
    function SetOnlyShowAvailableForOrders(flag: boolean): void;
    function SetProfessionChildSkillLineID(skillLineID: number): void;
    function SetRecipeTracked(recipeID: number, tracked: boolean, isRecraft: boolean): void;
    function SetShowLearned(flag: boolean): void;
    function SetShowUnlearned(flag: boolean): void;
    function SetSourceTypeFilter(sourceTypeFilter: number): void;
}

declare namespace C_Trainer {
    function GetCategorizeTrainerUI(): boolean;
    function GetTrainerType(): Enum.TrainerType;
    function SetCategorizeTrainerUI(value: boolean): void;
}

declare namespace C_Traits {
    /** Returns whether the player can make changes to the specified talent config. */
    function CanEditConfig(configID: number): LuaMultiReturn<[canEdit: boolean, errorMessage: string]>;
    function CanPurchaseRank(configID: number, nodeID: number, nodeEntryID: number): boolean;
    function CanRefundRank(configID: number, nodeID: number): boolean;
    function CascadeRepurchaseRanks(configID: number, nodeID: number, entryID?: number): boolean;
    function ClearCascadeRepurchaseHistory(configID: number): void;
    function CloseTraitSystemInteraction(): void;
    function CommitConfig(configID: number): boolean;
    function ConfigHasStagedChanges(configID: number): boolean;
    function GenerateImportString(configID: number): string;
    function GenerateInspectImportString(target: string): string;
    function GetConditionInfo(configID: number, condID: number): TraitCondInfo | undefined;
    function GetConfigIDBySystemID(systemID: number): number | undefined;
    function GetConfigIDByTreeID(treeID: number): number | undefined;
    function GetConfigInfo(configID: number): TraitConfigInfo | undefined;
    function GetConfigsByType(configType: Enum.TraitConfigType): number[];
    function GetConfigVariationID(systemID: number): number | undefined;
    function GetDefinitionInfo(definitionID: number): TraitDefinitionInfo | undefined;
    function GetEntryInfo(configID: number, entryID: number): TraitEntryInfo | undefined;
    function GetGroupCurrencyInfo(configID: number, groupIDs: number[]): GroupCurrencyInfo[];
    function GetGroupDisplayInfoByTreeID(treeID: number): TraitGroupDisplayInfo[];
    function GetIncreasedTraitData(nodeID: number, entryID: number): IncreasedTraitData[] | undefined;
    function GetLoadoutSerializationVersion(): number;
    function GetMaxAvailableTraitCurrency(traitCurrencyID: number, limitBySourcedMax: boolean): number;
    function GetNodeCost(configID: number, nodeID: number): TraitCurrencyCost[];
    function GetNodeInfo(configID: number, nodeID: number): TraitNodeInfo | undefined;
    /** Returns IDs of Trait Nodes with pending changes, grouped by the type of change; Returns nothing if there are no pending changes */
    function GetStagedChanges(configID: number): LuaMultiReturn<[nodeIDsWithPurchases: number[] | undefined, nodeIDsWithRefunds: number[] | undefined, nodeIDsWithSelectionSwaps: number[] | undefined]>;
    function GetStagedChangesCost(configID: number): TraitCurrencyCost[];
    function GetSubTreeInfo(configID: number, subTreeID: number): TraitSubTreeInfo | undefined;
    function GetSystemIDByTreeID(treeID: number): number | undefined;
    function GetTraitCurrencyForAchievement(traitCurrencyID: number, achievementID: number): number;
    function GetTraitCurrencyInfo(traitCurrencyID: number): LuaMultiReturn<[flags: number, type: number, currencyTypesID: number | undefined, icon: number | undefined]>;
    function GetTraitDescription(entryID: number, rank: number): string | undefined;
    function GetTraitSystemFlags(configID: number): number | undefined;
    function GetTraitSystemWidgetSetID(configID: number): number | undefined;
    function GetTreeCurrencyInfo(configID: number, treeID: number, excludeStagedChanges: boolean): TreeCurrencyInfo[];
    function GetTreeHash(treeID: number): number[];
    function GetTreeInfo(configID: number, treeID: number): TraitTreeInfo | undefined;
    /** Returns a list of nodeIDs, sorted ascending, for a given treeID. Contains nodes for all class specializations. */
    function GetTreeNodes(treeID: number): number[] | undefined;
    function HasValidInspectData(): boolean;
    function IsReadyForCommit(): boolean;
    function PurchaseAllRanks(configID: number, nodeID: number, ignoreCost: boolean): boolean;
    function PurchaseRank(configID: number, nodeID: number): boolean;
    function RefundAllRanks(configID: number, nodeID: number): boolean;
    function RefundRank(configID: number, nodeID: number, clearEdges?: boolean): boolean;
    function ResetTree(configID: number, treeID: number): boolean;
    function ResetTreeByCurrency(configID: number, treeID: number, traitCurrencyID: number): boolean;
    function RollbackConfig(configID: number): boolean;
    function SetSelection(configID: number, nodeID: number, nodeEntryID?: number, clearEdges?: boolean): boolean;
    function StageConfig(configID: number): boolean;
    function TalentTestUnlearnSpells(): void;
    function TryPurchaseAllRanks(configID: number, nodeID: number): boolean;
    function TryPurchaseToNode(configID: number, nodeID: number): boolean;
    function TryRefundToNode(configID: number, nodeID: number, entryID: number): boolean;
}

declare namespace C_Transmog {
    function CanHaveSecondaryAppearanceForSlotID(slotID: number): boolean;
    function ExtractTransmogIDList(input: string): number[];
    function GetAllSetAppearancesByID(setID: number): TransmogSetItemInfo[] | undefined;
    function GetItemIDForSource(itemModifiedAppearanceID: number): number | undefined;
    function GetSlotForInventoryType(inventoryType: number): number | undefined;
    function GetSlotVisualInfo(transmogLocation: TransmogLocationMixin): TransmogSlotVisualInfo | undefined;
    function IsAtTransmogNPC(): boolean;
}

declare namespace C_TransmogCollection {
    function AccountCanCollectSource(sourceID: number): LuaMultiReturn<[hasItemData: boolean, canCollect: boolean]>;
    function AreAllCollectionTypeFiltersChecked(): boolean;
    function AreAllSourceTypeFiltersChecked(): boolean;
    function CanAppearanceHaveIllusion(appearanceID: number): boolean;
    function ClearNewAppearance(visualID: number): void;
    function ClearSearch(searchType: Enum.TransmogSearchType): boolean;
    function DeleteCustomSet(customSetID: number): void;
    function EndSearch(): void;
    function GetAllAppearanceSources(itemAppearanceID: number): number[];
    function GetAllFactionsShown(): boolean;
    function GetAllRacesShown(): boolean;
    function GetAppearanceCameraID(itemAppearanceID: number, variation?: Enum.TransmogCameraVariation): number;
    function GetAppearanceCameraIDBySource(itemModifiedAppearanceID: number, variation?: Enum.TransmogCameraVariation): number;
    function GetAppearanceInfoBySource(itemModifiedAppearanceID: number): TransmogAppearanceInfoBySourceData | undefined;
    function GetAppearanceSourceDrops(itemModifiedAppearanceID: number): TransmogAppearanceJournalEncounterInfo[] | undefined;
    function GetAppearanceSourceInfo(itemModifiedAppearanceID: number): TransmogAppearanceSourceInfoData | undefined;
    function GetAppearanceSources(appearanceID: number, categoryType?: Enum.TransmogCollectionType, transmogLocation?: TransmogLocationMixin): AppearanceSourceInfo[] | undefined;
    function GetArtifactAppearanceStrings(appearanceID: number): LuaMultiReturn<[name: string | undefined, hyperlink: string | undefined]>;
    function GetCategoryAppearances(category: Enum.TransmogCollectionType, transmogLocation?: TransmogLocationMixin, option?: Enum.TransmogOutfitSlotOption): TransmogCategoryAppearanceInfo[] | undefined;
    function GetCategoryCollectedCount(category: Enum.TransmogCollectionType): number;
    function GetCategoryForItem(itemModifiedAppearanceID: number): Enum.TransmogCollectionType | undefined;
    function GetCategoryInfo(category: Enum.TransmogCollectionType): LuaMultiReturn<[name: string | undefined, isWeapon: boolean | undefined, canHaveIllusions: boolean | undefined, canMainHand: boolean | undefined, canOffHand: boolean | undefined, canRanged: boolean | undefined]>;
    function GetCategoryTotal(category: Enum.TransmogCollectionType): number;
    function GetClassFilter(): number;
    function GetCollectedShown(): boolean;
    function GetCustomSetHyperlinkFromItemTransmogInfoList(itemTransmogInfoList: ItemTransmogInfo[]): string | undefined;
    function GetCustomSetInfo(customSetID: number): LuaMultiReturn<[name: string | undefined, icon: number | undefined]>;
    function GetCustomSetItemTransmogInfoList(customSetID: number): ItemTransmogInfo[] | undefined;
    function GetCustomSets(): number[];
    function GetFallbackWeaponAppearance(): number | undefined;
    function GetFilteredCategoryCollectedCount(category: Enum.TransmogCollectionType): number;
    function GetFilteredCategoryTotal(category: Enum.TransmogCollectionType): number;
    function GetIllusionInfo(illusionID: number): TransmogIllusionInfo | undefined;
    function GetIllusions(category?: Enum.TransmogCollectionType): TransmogIllusionInfo[];
    function GetIllusionStrings(illusionID: number): LuaMultiReturn<[name: string | undefined, hyperlink: string | undefined, sourceText: string | undefined]>;
    function GetInspectItemTransmogInfoList(): ItemTransmogInfo[] | undefined;
    function GetIsAppearanceFavorite(itemAppearanceID: number): boolean;
    function GetItemInfo(itemInfo: ItemInfo): LuaMultiReturn<[itemAppearanceID: number | undefined, itemModifiedAppearanceID: number | undefined]>;
    function GetItemTransmogInfoListFromCustomSetHyperlink(hyperlink: string): ItemTransmogInfo[] | undefined;
    function GetLatestAppearance(): LuaMultiReturn<[visualID: number | undefined, category: Enum.TransmogCollectionType | undefined]>;
    function GetNumMaxCustomSets(): number;
    function GetNumTransmogSources(): number;
    function GetPairedArtifactAppearance(itemModifiedAppearanceID: number): number | undefined;
    function GetSourceIcon(itemModifiedAppearanceID: number): number | undefined;
    function GetSourceInfo(sourceID: number): AppearanceSourceInfo | undefined;
    function GetSourceItemID(itemModifiedAppearanceID: number): number | undefined;
    function GetSourceRequiredHoliday(itemModifiedAppearanceID: number): string | undefined;
    function GetUncollectedShown(): boolean;
    function GetValidAppearanceSourcesForClass(appearanceID: number, classID: number, categoryType?: Enum.TransmogCollectionType, transmogLocation?: TransmogLocationMixin): AppearanceSourceInfo[] | undefined;
    function HasAnyAppearance(): boolean;
    function HasFavorites(): boolean;
    function IsAppearanceHiddenVisual(appearanceID: number): boolean;
    function IsCategoryValidForItem(category: Enum.TransmogCollectionType, itemInfo: ItemInfo): boolean;
    function IsNewAppearance(visualID: number): boolean;
    function IsSearchDBLoading(): boolean;
    function IsSearchInProgress(searchType: Enum.TransmogSearchType): boolean;
    function IsSourceTypeFilterChecked(index: number): boolean;
    function IsSpellItemEnchantmentHiddenVisual(spellItemEnchantmentID: number): boolean;
    function IsUsingDefaultFilters(): boolean;
    function IsValidCustomSetName(name: string): boolean;
    function IsValidTransmogSource(source: Enum.TransmogSource): boolean;
    function ModifyCustomSet(customSetID: number, itemTransmogInfoList: ItemTransmogInfo[]): void;
    function NewCustomSet(name: string, icon: number, itemTransmogInfoList: ItemTransmogInfo[]): number | undefined;
    function PlayerCanCollectSource(sourceID: number): LuaMultiReturn<[hasItemData: boolean, canCollect: boolean]>;
    function PlayerHasTransmog(itemID: number, itemAppearanceModID?: number): boolean;
    function PlayerHasTransmogByItemInfo(itemInfo: ItemInfo): boolean;
    function PlayerHasTransmogItemModifiedAppearance(itemModifiedAppearanceID: number): boolean;
    function PlayerKnowsSource(sourceID: number): boolean;
    function RenameCustomSet(customSetID: number, name: string): void;
    function SearchProgress(searchType: Enum.TransmogSearchType): number;
    function SearchSize(searchType: Enum.TransmogSearchType): number;
    function SetAllCollectionTypeFilters(checked: boolean): void;
    function SetAllFactionsShown(shown: boolean): void;
    function SetAllRacesShown(shown: boolean): void;
    function SetAllSourceTypeFilters(checked: boolean): void;
    function SetClassFilter(classID: number): void;
    function SetCollectedShown(shown: boolean): void;
    function SetDefaultFilters(): void;
    function SetIsAppearanceFavorite(itemAppearanceID: number, isFavorite: boolean): void;
    function SetSearch(searchType: Enum.TransmogSearchType, searchText: string): boolean;
    function SetSearchAndFilterCategory(category: Enum.TransmogCollectionType): void;
    function SetSourceTypeFilter(index: number, checked: boolean): void;
    function SetUncollectedShown(shown: boolean): void;
    function UpdateUsableAppearances(): void;
}

declare namespace C_TransmogOutfitInfo {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function AddNewOutfit(name: string, icon: number): void;
    function CanPlayerTransmogSlot(slot: Enum.TransmogOutfitSlot): boolean;
    function ChangeDisplayedOutfit(outfitID: number, trigger: Enum.TransmogSituationTrigger, toggleLock: boolean, allowRemoveOutfit: boolean): void;
    function ChangeToOutfit(playerFacingOutfitIndex: number, allowRemoveOutfit: boolean): void;
    function ChangeViewedOutfit(outfitID: number): void;
    function ClearAllPendingSituations(): void;
    function ClearAllPendingTransmogs(): void;
    function ClearDisplayedOutfit(trigger: Enum.TransmogSituationTrigger, toggleLock: boolean): void;
    function ClearOutfit(): void;
    function CommitAndApplyAllPending(useAvailableDiscount: boolean): void;
    function CommitOutfitInfo(outfitID: number, name: string, icon: number): void;
    function CommitPendingSituations(): void;
    function GetActiveOutfitID(): number;
    function GetAllSlotLocationInfo(): LuaMultiReturn<[appearanceSlotInfo: TransmogOutfitSlotInfo[] | undefined, illusionSlotInfo: TransmogOutfitSlotInfo[] | undefined]>;
    function GetAllTransmogOutfitOptionSheatheCategoryInfo(imaID: number): TransmogOutfitOptionSheatheCategoryInfo[] | undefined;
    function GetCollectionInfoForSlotAndOption(slot: Enum.TransmogOutfitSlot, option: Enum.TransmogOutfitSlotOption, collectionType: Enum.TransmogCollectionType): TransmogOutfitCollectionInfo | undefined;
    function GetCurrentlyViewedOutfitID(): number;
    function GetEquippedSlotOptionFromTransmogSlot(slot: Enum.TransmogOutfitSlot): Enum.TransmogOutfitSlotOption | undefined;
    function GetIllusionDefaultIMAIDForCollectionType(collectionType: Enum.TransmogCollectionType): number | undefined;
    function GetItemModifiedAppearanceEffectiveCategory(imaID: number): Enum.TransmogCollectionType;
    function GetLinkedSlotInfo(slot: Enum.TransmogOutfitSlot): TransmogOutfitLinkedSlotInfo | undefined;
    function GetMaxNumberOfTotalOutfitsForSource(source: Enum.TransmogOutfitEntrySource): number;
    function GetMaxNumberOfUsableOutfits(): number;
    function GetNextOutfitCost(): number;
    function GetNumberOfOutfitsUnlockedForSource(source: Enum.TransmogOutfitEntrySource): number;
    function GetOptionsForSlot(slot: Enum.TransmogOutfitSlot): LuaMultiReturn<[options: TransmogOutfitOptionInfo[] | undefined, artifactOptions: TransmogOutfitOptionInfo[] | undefined]>;
    function GetOutfitInfo(outfitID: number): TransmogOutfitEntryInfo | undefined;
    function GetOutfitInfoByName(name: string): TransmogOutfitEntryInfo | undefined;
    function GetOutfitInfoByPlayerFacingIndex(playerFacingOutfitIndex: number): TransmogOutfitEntryInfo | undefined;
    function GetOutfitsInfo(): TransmogOutfitEntryInfo[] | undefined;
    function GetOutfitSituation(option: TransmogSituationOption): boolean;
    function GetOutfitSituationsEnabled(): boolean;
    function GetPendingTransmogCost(): LuaMultiReturn<[cost: number | undefined, modifierFlags: number | undefined]>;
    function GetSecondarySlotState(slot: Enum.TransmogOutfitSlot): boolean;
    function GetSetSourcesForSlot(transmogSetID: number, slot: Enum.TransmogOutfitSlot): AppearanceSourceInfo[] | undefined;
    function GetSlotGroupInfo(): TransmogOutfitSlotGroup[] | undefined;
    function GetSourceIDsForSlot(transmogSetID: number, slot: Enum.TransmogOutfitSlot): number[] | undefined;
    function GetTransmogOutfitSlotForInventoryType(inventoryType: number): Enum.TransmogOutfitSlot | undefined;
    function GetTransmogOutfitSlotFromInventorySlot(inventorySlot: InventorySlots): Enum.TransmogOutfitSlot | undefined;
    function GetUISituationCategoriesAndOptions(): TransmogSituationCategory[] | undefined;
    function GetUnassignedAtlasForSlot(slot: Enum.TransmogOutfitSlot): string | undefined;
    function GetUnassignedDisplayAtlasForSlot(slot: Enum.TransmogOutfitSlot): string | undefined;
    function GetViewedOutfitSlotInfo(slot: Enum.TransmogOutfitSlot, type: Enum.TransmogType, option: Enum.TransmogOutfitSlotOption): ViewedTransmogOutfitSlotInfo | undefined;
    function HasPendingOutfitSituations(): boolean;
    function HasPendingOutfitTransmogs(): boolean;
    function InTransmogEvent(): boolean;
    function IsEquippedGearOutfitDisplayed(): boolean;
    function IsEquippedGearOutfitLocked(): boolean;
    function IsLockedOutfit(outfitID: number): boolean;
    function IsSlotWeaponSlot(slot: Enum.TransmogOutfitSlot): boolean;
    function IsTransmogEnabled(): boolean;
    function IsUsableDiscountAvailable(): boolean;
    function IsValidTransmogOutfitName(name: string): boolean;
    function PickupOutfit(outfitID: number): void;
    function ResetOutfitSituations(): void;
    function RevertPendingTransmog(slot: Enum.TransmogOutfitSlot, type: Enum.TransmogType, option: Enum.TransmogOutfitSlotOption): void;
    function SetOutfitSituationsEnabled(enabled: boolean): void;
    function SetOutfitToCustomSet(transmogCustomSetID: number): void;
    function SetOutfitToOutfit(outfitID: number): void;
    function SetOutfitToSet(transmogSetID: number): void;
    function SetPendingTransmog(slot: Enum.TransmogOutfitSlot, type: Enum.TransmogType, option: Enum.TransmogOutfitSlotOption, transmogID: number, displayType: Enum.TransmogOutfitDisplayType): void;
    function SetPendingTransmogSheatheCategory(slot: Enum.TransmogOutfitSlot, option: Enum.TransmogOutfitSlotOption, category: Enum.TransmogOutfitSlotOptionSheatheCategory): void;
    function SetSecondarySlotState(slot: Enum.TransmogOutfitSlot, state: boolean): void;
    function SetViewedOptionForSlot(slot: Enum.TransmogOutfitSlot, option: Enum.TransmogOutfitSlotOption): void;
    function SlotHasSecondary(slot: Enum.TransmogOutfitSlot): boolean;
    function TransmogEventActive(): boolean;
    function UpdatePendingSituation(option: TransmogSituationOption, value: boolean): void;
}

declare namespace C_TransmogSets {
    function ClearLatestSource(): void;
    function ClearNewSource(sourceID: number): void;
    function ClearSetNewSourcesForSlot(transmogSetID: number, slot: number): void;
    function GetAllSets(): TransmogSetInfo[];
    function GetAllSourceIDs(transmogSetID: number): number[] | undefined;
    function GetAvailableSets(): TransmogSetInfo[];
    function GetBaseSetID(transmogSetID: number): number | undefined;
    function GetBaseSets(): TransmogSetInfo[];
    function GetBaseSetsFilter(index: number): boolean | undefined;
    function GetCameraIDs(): LuaMultiReturn<[detailsCameraID: number | undefined, vendorCameraID: number | undefined]>;
    function GetFilteredBaseSetsCounts(): LuaMultiReturn<[numCollected: number, numTotal: number]>;
    function GetFullBaseSetsCounts(): LuaMultiReturn<[numCollected: number, numTotal: number]>;
    function GetIsFavorite(transmogSetID: number): LuaMultiReturn<[isFavorite: boolean | undefined, isGroupFavorite: boolean | undefined]>;
    function GetLatestSource(): number;
    function GetSetInfo(transmogSetID: number): TransmogSetInfo | undefined;
    function GetSetNewSources(transmogSetID: number): number[] | undefined;
    function GetSetPrimaryAppearances(transmogSetID: number): TransmogSetPrimaryAppearanceInfo[] | undefined;
    function GetSetsContainingSourceID(sourceID: number): number[] | undefined;
    function GetSetsFilter(index: number): boolean | undefined;
    function GetSourceIDsForSlot(transmogSetID: number, slot: number): number[] | undefined;
    function GetSourcesForSlot(transmogSetID: number, slot: number): AppearanceSourceInfo[] | undefined;
    function GetTransmogSetsClassFilter(): number;
    function GetUsableSets(): TransmogSetInfo[];
    function GetValidBaseSetsCountsForCharacter(): LuaMultiReturn<[numCollected: number, numTotal: number]>;
    function GetValidClassForSet(transmogSetID: number): number | undefined;
    function GetVariantSets(transmogSetID: number): TransmogSetInfo[] | undefined;
    function HasAnyValidSets(): boolean;
    function HasAvailableSets(): boolean;
    function HasUsableSets(): boolean;
    function IsBaseSetCollected(transmogSetID: number): boolean;
    function IsNewSource(sourceID: number): boolean;
    function IsSetVisible(transmogSetID: number): boolean;
    function IsUsingDefaultBaseSetsFilters(): boolean;
    function IsUsingDefaultSetsFilters(): boolean;
    function SetBaseSetsFilter(index: number, isChecked: boolean): void;
    function SetDefaultBaseSetsFilters(): void;
    function SetDefaultSetsFilters(): void;
    function SetHasNewSources(transmogSetID: number): boolean;
    function SetHasNewSourcesForSlot(transmogSetID: number, slot: number): boolean;
    function SetIsFavorite(transmogSetID: number, isFavorite: boolean): void;
    function SetSetsFilter(index: number, isChecked: boolean): void;
    function SetTransmogSetsClassFilter(classID: number): void;
}

declare namespace C_TTSSettings {
    function GetChannelEnabled(channelInfo: ChatChannelInfo): boolean;
    function GetCharacterSettingsSaved(): boolean;
    function GetChatTypeEnabled(chatName: string): boolean;
    function GetSetting(setting: Enum.TtsBoolSetting): boolean;
    function GetSpeechRate(): number;
    function GetSpeechVolume(): number;
    function GetVoiceOptionID(voiceType: Enum.TtsVoiceType): number;
    function GetVoiceOptionName(voiceType: Enum.TtsVoiceType): string;
    function MarkCharacterSettingsSaved(): void;
    function SetChannelEnabled(channelInfo: ChatChannelInfo, newVal?: boolean): void;
    function SetChannelKeyEnabled(channelKey: string, newVal?: boolean): void;
    function SetChatTypeEnabled(chatName: string, newVal?: boolean): void;
    function SetDefaultSettings(): void;
    function SetSetting(setting: Enum.TtsBoolSetting, newVal?: boolean): void;
    function SetSpeechRate(newVal: number): void;
    function SetSpeechVolume(newVal: number): void;
    function SetVoiceOption(voiceType: Enum.TtsVoiceType, voiceID: number): void;
    function SetVoiceOptionName(voiceType: Enum.TtsVoiceType, voiceName: string): void;
    function ShouldOverrideMessage(language: number, messageText: string): boolean;
}

declare namespace C_Tutorial {
    function AbandonTutorialArea(): void;
    function GetCombatEventInfo(): void;
    function ReturnToTutorialArea(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SendTutorialStartButtonTelem(skipTutorial: boolean): void;
}

declare namespace C_UI {
    /** True if any display attached has a notch. This does not mean the current view intersects the notch. */
    function DoesAnyDisplayHaveNotch(): boolean;
    /** Region of screen left of screen notch. Zeros if no notch. */
    function GetTopLeftNotchSafeRegion(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    /** Region of screen right of screen notch. Zeros if no notch. */
    function GetTopRightNotchSafeRegion(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    function GetUIParent(): Frame;
    function GetWorldFrame(): Frame;
    function Reload(): void;
    /** UIParent will shift down to avoid notch if true. This does not mean there is a notch. */
    function ShouldUIParentAvoidNotch(): boolean;
}

declare namespace C_UIColor {
    function GetColors(): DBColorExport[];
}

declare namespace C_UIFileAsset {
    /** Returns the numeric file ID associated with a file asset. */
    function GetFileID(asset: string | number): number | undefined;
    /** Determines whether a file asset is known to the client, either as a shipped asset or a locally existing loose file. */
    function IsKnownFile(asset: string | number): boolean;
    /** Determines whether a file asset refers to a known loose (local) file. */
    function IsLooseFile(asset: string | number): boolean;
}

declare namespace C_UIWidgetManager {
    function GetAllWidgetsBySetID(setID: number): UIWidgetInfo[];
    function GetBelowMinimapWidgetSetID(): number;
    function GetBulletTextListWidgetVisualizationInfo(widgetID: number): BulletTextListWidgetVisualizationInfo | undefined;
    function GetButtonHeaderWidgetVisualizationInfo(widgetID: number): ButtonHeaderWidgetVisualizationInfo | undefined;
    function GetCaptureBarWidgetVisualizationInfo(widgetID: number): CaptureBarWidgetVisualizationInfo | undefined;
    function GetCaptureZoneVisualizationInfo(widgetID: number): CaptureZoneVisualizationInfo | undefined;
    function GetDiscreteProgressStepsVisualizationInfo(widgetID: number): DiscreteProgressStepsVisualizationInfo | undefined;
    function GetDoubleIconAndTextWidgetVisualizationInfo(widgetID: number): DoubleIconAndTextWidgetVisualizationInfo | undefined;
    function GetDoubleStateIconRowVisualizationInfo(widgetID: number): DoubleStateIconRowVisualizationInfo | undefined;
    function GetDoubleStatusBarWidgetVisualizationInfo(widgetID: number): DoubleStatusBarWidgetVisualizationInfo | undefined;
    function GetFillUpFramesWidgetVisualizationInfo(widgetID: number): FillUpFramesWidgetVisualizationInfo | undefined;
    function GetHorizontalCurrenciesWidgetVisualizationInfo(widgetID: number): HorizontalCurrenciesWidgetVisualizationInfo | undefined;
    function GetIconAndTextWidgetVisualizationInfo(widgetID: number): IconAndTextWidgetVisualizationInfo | undefined;
    function GetIconTextAndBackgroundWidgetVisualizationInfo(widgetID: number): IconTextAndBackgroundWidgetVisualizationInfo | undefined;
    function GetIconTextAndCurrenciesWidgetVisualizationInfo(widgetID: number): IconTextAndCurrenciesWidgetVisualizationInfo | undefined;
    function GetItemDisplayVisualizationInfo(widgetID: number): ItemDisplayVisualizationInfo | undefined;
    function GetMapPinAnimationWidgetVisualizationInfo(widgetID: number): MapPinAnimationWidgetVisualizationInfo | undefined;
    function GetObjectiveTrackerWidgetSetID(): number;
    function GetPowerBarWidgetSetID(): number;
    function GetPreyHuntProgressWidgetVisualizationInfo(widgetID: number): PreyHuntProgressWidgetVisualizationInfo | undefined;
    function GetScenarioHeaderCurrenciesAndBackgroundWidgetVisualizationInfo(widgetID: number): ScenarioHeaderCurrenciesAndBackgroundWidgetVisualizationInfo | undefined;
    function GetScenarioHeaderDelvesWidgetVisualizationInfo(widgetID: number): ScenarioHeaderDelvesWidgetVisualizationInfo | undefined;
    function GetScenarioHeaderTimerWidgetVisualizationInfo(widgetID: number): ScenarioHeaderTimerWidgetVisualizationInfo | undefined;
    function GetSpacerVisualizationInfo(widgetID: number): SpacerVisualizationInfo | undefined;
    function GetSpellDisplayVisualizationInfo(widgetID: number): SpellDisplayVisualizationInfo | undefined;
    function GetStackedResourceTrackerWidgetVisualizationInfo(widgetID: number): StackedResourceTrackerWidgetVisualizationInfo | undefined;
    function GetStatusBarWidgetVisualizationInfo(widgetID: number): StatusBarWidgetVisualizationInfo | undefined;
    function GetTextColumnRowVisualizationInfo(widgetID: number): TextColumnRowVisualizationInfo | undefined;
    function GetTextureAndTextRowVisualizationInfo(widgetID: number): TextureAndTextRowVisualizationInfo | undefined;
    function GetTextureAndTextVisualizationInfo(widgetID: number): TextureAndTextVisualizationInfo | undefined;
    function GetTextureWithAnimationVisualizationInfo(widgetID: number): TextureWithAnimationVisualizationInfo | undefined;
    function GetTextWithStateWidgetVisualizationInfo(widgetID: number): TextWithStateWidgetVisualizationInfo | undefined;
    function GetTextWithSubtextWidgetVisualizationInfo(widgetID: number): TextWithSubtextWidgetVisualizationInfo | undefined;
    function GetTopCenterWidgetSetID(): number;
    function GetTugOfWarWidgetVisualizationInfo(widgetID: number): TugOfWarWidgetVisualizationInfo | undefined;
    function GetUnitPowerBarWidgetVisualizationInfo(widgetID: number): UnitPowerBarWidgetVisualizationInfo | undefined;
    function GetWidgetSetInfo(widgetSetID: number): UIWidgetSetInfo | undefined;
    function GetZoneControlVisualizationInfo(widgetID: number): ZoneControlVisualizationInfo | undefined;
    function RegisterUnitForWidgetUpdates(unitToken: string, isGuid?: boolean): void;
    function SetProcessingUnit(unit?: UnitToken): void;
    function SetProcessingUnitGuid(unit?: string): void;
    function UnregisterUnitForWidgetUpdates(unitToken: string, isGuid?: boolean): void;
}

declare namespace C_UnitAuras {
    /**
     * Registers a sound for an aura event. The sound is stopped after five seconds of playback. The throttleSeconds value must be between 0 and 5 seconds, inclusive.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    function AddAuraSound(trigger: Enum.UnitAuraSoundTrigger, sound: UnitAuraSoundInfo): number | undefined;
    function AddBlockedAura(unit: UnitToken, auraInstanceID: number): void;
    function AddPrivateAuraAnchor(args: AddPrivateAuraAnchorArgs): number | undefined;
    function AuraIsBigDefensive(spellID: number | string): boolean;
    function AuraIsPrivate(spellID: number | string): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function CancelAuraByInstanceID(unit: UnitToken, auraInstanceID: number): void;
    function ClearBlockedAuras(unit: UnitToken): void;
    /** Returns true if an aura instance will expire after a certain amount of time. */
    function DoesAuraHaveExpirationTime(auraInstanceUnit: UnitToken, auraInstanceID: number): boolean;
    /** Formats a string for displaying the number of applications an aura has present. */
    function GetAuraApplicationDisplayCount(auraInstanceUnit: UnitToken, auraInstanceID: number, minDisplayCount?: number, maxDisplayCount?: number): string;
    /** Returns the base duration of the given spell (or aura). Takes an optional spellID to use as the new duration if that cannot be derived from the aura, if that value isn't supplied the aura's spellID will be used */
    function GetAuraBaseDuration(auraInstanceUnit: UnitToken, auraInstanceID: number, spellID?: number | string): number | undefined;
    function GetAuraCasterGUID(auraInstanceUnit: UnitToken, auraInstanceID: number): string | undefined;
    function GetAuraDataByAuraInstanceID(unit: UnitToken, auraInstanceID: number): AuraData | undefined;
    function GetAuraDataByIndex(unit: UnitToken, index: number, filter?: AuraFilters): AuraData | undefined;
    function GetAuraDataBySlot(unit: UnitToken, slot: number): AuraData | undefined;
    function GetAuraDataBySpellName(unit: UnitToken, spellName: string, filter?: AuraFilters): AuraData | undefined;
    /** Queries the dispel type associated with an aura instance and remaps it to a color via a curve, with the dispel type ID used as the 'x' value. */
    function GetAuraDispelTypeColor(auraInstanceUnit: UnitToken, auraInstanceID: number, curve: LuaColorCurveObject): ColorMixin;
    function GetAuraDuration(auraInstanceUnit: UnitToken, auraInstanceID: number): LuaDurationObject;
    function GetAuraSlots(unit: UnitToken, filter?: AuraFilters, maxSlots?: number, continuationToken?: number): LuaMultiReturn<[outContinuationToken: number | undefined, ...slots: (number)[]]>;
    function GetBuffDataByIndex(unit: UnitToken, index: number, filter?: AuraFilters): AuraData | undefined;
    function GetCooldownAuraBySpellID(spellID: number | string): number | undefined;
    function GetDebuffDataByIndex(unit: UnitToken, index: number, filter?: AuraFilters): AuraData | undefined;
    /** Returns the alerts passed to SetGroupBuffVisualAlerts plus an entry for every linked rank spell of those group buffs. */
    function GetGroupBuffVisualAlerts(): GroupBuffVisualAlertInfo[];
    /** Returns the spell IDs passed to SetHiddenGroupBuffs plus every linked rank spell of those group buffs. */
    function GetHiddenGroupBuffs(): number[];
    function GetPlayerAuraBySpellID(spellID: number | string): AuraData | undefined;
    /** Returns the client-predicted amount of time that a new spellcast of the same spell would carry over to the new application of that aura. Takes an optional spellID to use as the new duration if that cannot be derived from the aura, if that value isn't supplied the aura's spellID will be used */
    function GetRefreshCarryOverDuration(auraInstanceUnit: UnitToken, auraInstanceID: number, spellID?: number | string): number | undefined;
    /** Returns the client-predicted new duration of this aura if it were cast again right now. Takes an optional spellID to use as the new duration if that cannot be derived from the aura, if that value isn't supplied the aura's spellID will be used */
    function GetRefreshExtendedDuration(auraInstanceUnit: UnitToken, auraInstanceID: number, spellID?: number | string): number | undefined;
    /** Returns the first instance of an aura on a unit matching a given spell ID. Returns nil if no such aura is found. Additionally can return nil if querying a unit that is not visible (eg. party members on other maps). */
    function GetUnitAuraBySpellID(unit: UnitToken, spellID: number | string): AuraData | undefined;
    function GetUnitAuraInstanceIDs(unit: UnitToken, filter: AuraFilters, maxCount?: number, sortRule?: Enum.UnitAuraSortRule, sortDirection?: Enum.UnitAuraSortDirection): number[];
    function GetUnitAuras(unit: UnitToken, filter: AuraFilters, maxCount?: number, sortRule?: Enum.UnitAuraSortRule, sortDirection?: Enum.UnitAuraSortDirection): AuraData[];
    function IsAuraFilteredOutByInstanceID(unit: UnitToken, auraInstanceID: number, filter: AuraFilters): boolean;
    function RemoveAuraSound(auraSoundID: number): void;
    function RemovePrivateAuraAnchor(anchorID: number): void;
    function ResetAuraDataProvider(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetGroupBuffVisualAlerts(visualAlerts: GroupBuffVisualAlertInfo[]): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function SetHiddenGroupBuffs(spellIDs: number[]): void;
    function SetPrivateWarningTextAnchor(parent: Frame, anchor?: AnchorBinding): void;
    function SwitchAuraDataProvider(): void;
    function WantsAlteredForm(unit: UnitToken): boolean;
}

declare namespace C_UserFeedback {
    function SubmitBug(bugInfo: string, suppressNotification?: boolean): boolean;
    function SubmitSuggestion(suggestion: string): boolean;
}

declare namespace C_VideoOptions {
    function AreHighResTexturesAvailable(): boolean;
    function GetCurrentGameWindowSize(): Vector2DMixin;
    function GetDefaultGameWindowSize(monitor: number): Vector2DMixin;
    function GetGameWindowSizes(monitor: number, fullscreen: boolean): vector2[];
    function GetGxAdapterInfo(): GxAdapterInfoDetails[];
    function IsLinearEnabledOnStart(): boolean;
    function IsOutlineModeSupported(): boolean;
    function IsPBRWaterSupported(): boolean;
    function IsSecondaryLightingSupported(): boolean;
    function IsSpellVisualDensitySystemSupported(): boolean;
    function SetGameWindowSize(x: number, y: number): void;
}

declare namespace C_VignetteInfo {
    function FindBestUniqueVignette(vignetteGUIDs: string[]): number | undefined;
    function GetHealthPercent(vignetteGUID: string): number | undefined;
    function GetRecommendedGroupSize(vignetteGUID: string): LuaMultiReturn<[minGroupSize: number | undefined, maxGroupSize: number | undefined]>;
    function GetVignetteInfo(vignetteGUID: string): VignetteInfo | undefined;
    function GetVignettePosition(vignetteGUID: string, uiMapID: number): LuaMultiReturn<[vignettePosition: Vector2DMixin | undefined, vignetteFacing: number | undefined]>;
    function GetVignettes(): string[];
}

declare namespace C_VoiceChat {
    function ActivateChannel(channelID: VoiceChatID): void;
    function ActivateChannelTranscription(channelID: VoiceChatID): void;
    function BeginLocalCapture(listenToLocalUser: boolean): void;
    function CanAccessSettings(): boolean;
    function CanPlayerUseVoiceChat(): boolean;
    function CreateChannel(channelDisplayName: string): Enum.VoiceChatStatusCode;
    function DeactivateChannel(channelID: VoiceChatID): void;
    function DeactivateChannelTranscription(channelID: VoiceChatID): void;
    function EndLocalCapture(): void;
    function GetActiveChannelID(): VoiceChatID | undefined;
    function GetActiveChannelType(): Enum.ChatChannelType | undefined;
    function GetActiveVoiceProviderID(): Enum.VoiceProviderID;
    function GetAvailableInputDevices(): VoiceAudioDevice[] | undefined;
    function GetAvailableOutputDevices(): VoiceAudioDevice[] | undefined;
    function GetChannel(channelID: VoiceChatID): VoiceChatChannel | undefined;
    function GetChannelForChannelType(channelType: Enum.ChatChannelType): VoiceChatChannel | undefined;
    function GetChannelForCommunityStream(clubId: string, streamId: string): VoiceChatChannel | undefined;
    function GetCommunicationMode(): Enum.CommunicationMode | undefined;
    function GetCurrentVoiceChatConnectionStatusCode(): Enum.VoiceChatStatusCode | undefined;
    function GetInputVolume(): number | undefined;
    function GetJoinClubVoiceChannelError(clubId: string): Enum.VoiceChannelErrorReason | undefined;
    function GetLocalPlayerActiveChannelMemberInfo(): VoiceChatMember | undefined;
    function GetLocalPlayerMemberID(channelID: VoiceChatID): VoiceChatID | undefined;
    function GetMasterVolumeScale(): number;
    function GetMemberGUID(memberID: VoiceChatID, channelID: VoiceChatID): string;
    function GetMemberID(channelID: VoiceChatID, memberGUID: string): VoiceChatID | undefined;
    function GetMemberInfo(memberID: VoiceChatID, channelID: VoiceChatID): VoiceChatMember | undefined;
    function GetMemberName(memberID: VoiceChatID, channelID: VoiceChatID): string | undefined;
    function GetMemberVolume(playerLocation: PlayerLocationMixin): number | undefined;
    function GetOutputVolume(): number | undefined;
    function GetProcesses(): VoiceChatProcess[] | undefined;
    function GetPTTButtonPressedState(): boolean | undefined;
    function GetPushToTalkBinding(): string[] | undefined;
    function GetRemoteTtsVoices(): VoiceTtsVoiceType[];
    function GetTtsVoices(): VoiceTtsVoiceType[];
    function GetVADSensitivity(): number | undefined;
    function IsChannelJoinPending(channelType: Enum.ChatChannelType, clubId?: string, streamId?: string): boolean;
    function IsDeafened(): boolean | undefined;
    function IsEnabled(): boolean;
    function IsLoggedIn(): boolean;
    function IsMemberLocalPlayer(memberID: VoiceChatID, channelID: VoiceChatID): boolean;
    function IsMemberMuted(playerLocation: PlayerLocationMixin): boolean | undefined;
    function IsMemberMutedForAll(memberID: VoiceChatID, channelID: VoiceChatID): boolean | undefined;
    function IsMemberSilenced(memberID: VoiceChatID, channelID: VoiceChatID): boolean | undefined;
    function IsMuted(): boolean | undefined;
    function IsParentalDisabled(): boolean;
    function IsParentalMuted(): boolean;
    function IsPlayerUsingVoice(playerLocation: PlayerLocationMixin): boolean;
    function IsSilenced(): boolean | undefined;
    function IsSpeakForMeActive(): boolean;
    function IsSpeakForMeAllowed(): boolean;
    function IsTranscribing(): boolean;
    function IsTranscriptionAllowed(): boolean;
    function IsVoiceChatConnected(): boolean;
    function LeaveChannel(channelID: VoiceChatID): void;
    function Login(channelType?: Enum.ChatChannelType): Enum.VoiceChatStatusCode;
    function Logout(): Enum.VoiceChatStatusCode;
    /** Once the UI has enumerated all channels, use this to reset the channel discovery state, it will be updated again if appropriate */
    function MarkChannelsDiscovered(): void;
    function RequestJoinAndActivateCommunityStreamChannel(clubId: string, streamId: string): void;
    function RequestJoinChannelByChannelType(channelType: Enum.ChatChannelType, autoActivate?: boolean): void;
    /** Changes the active voice provider to the party voice provider, or to the preferred voice provider when the party has none. */
    function RestoreActiveVoiceProvider(): boolean;
    /** Changes the active voice provider without changing the preferred voice provider. */
    function SetActiveVoiceProvider(voiceProviderID: Enum.VoiceProviderID): boolean;
    function SetCommunicationMode(communicationMode: Enum.CommunicationMode): void;
    function SetDeafened(isDeafened: boolean): void;
    function SetInputDevice(deviceID: string): void;
    function SetInputVolume(volume: number): void;
    function SetMasterVolumeScale(scale: number): void;
    function SetMemberMuted(playerLocation: PlayerLocationMixin, muted: boolean): void;
    /** Adjusts member volume across all channels */
    function SetMemberVolume(playerLocation: PlayerLocationMixin, volume: number): void;
    function SetMuted(isMuted: boolean): void;
    function SetOutputDevice(deviceID: string): void;
    function SetOutputVolume(volume: number): void;
    function SetPortraitTexture(textureObject: Texture, memberID: VoiceChatID, channelID: VoiceChatID): void;
    function SetPushToTalkBinding(keys: string[]): void;
    function SetVADSensitivity(sensitivity: number): void;
    /** Use this while loading to determine if the UI should attempt to rediscover the previously joined/active voice channels */
    function ShouldDiscoverChannels(): boolean;
    function SpeakRemoteTextSample(text: string): void;
    /** SpeakText also supports XML TTS tags on Windows including bookmarks - see SAPI XML TTS Tutorial in Microsoft's online documentation for more information. */
    function SpeakText(voiceID: number, text: string, rate: number, volume: number, overlap?: boolean): void;
    function StopSpeakingText(): void;
    function ToggleDeafened(): void;
    function ToggleMemberMuted(playerLocation: PlayerLocationMixin): void;
    function ToggleMuted(): void;
}

declare namespace C_WarbandScene {
    function GetRandomEntryID(): number;
    function GetWarbandSceneEntry(warbandSceneID: number): WarbandSceneEntry | undefined;
    function HasWarbandScene(warbandSceneID: number): boolean;
    function IsFavorite(warbandSceneID: number): boolean;
    function SearchWarbandSceneEntries(searchParams: WarbandSceneSearchInfo): number[];
    function SetFavorite(warbandSceneID: number, favorite: boolean): void;
    function WarbandScenesAvailable(): boolean;
}

declare namespace C_Weather {
    /** C_Weather the outlook is favorable. */
    function GetCurrentWeather(): WeatherInfo;
}

declare namespace C_WeeklyRewards {
    function AreRewardsForCurrentRewardPeriod(): boolean;
    function CanClaimRewards(): boolean;
    function ClaimReward(id: number): void;
    function CloseInteraction(): void;
    function GetActivities(type?: WeeklyRewardChestThresholdType): WeeklyRewardActivityInfo[];
    function GetActivityEncounterInfo(type: WeeklyRewardChestThresholdType, index: number): WeeklyRewardActivityEncounterInfo[] | undefined;
    function GetConquestWeeklyProgress(): ConquestWeeklyProgress;
    function GetDifficultyIDForActivityTier(activityTierID: number): number | undefined;
    function GetExampleRewardItemHyperlinks(id: number): LuaMultiReturn<[hyperlink: string | undefined, upgradeHyperlink: string | undefined]>;
    function GetItemHyperlink(itemDBID: WeeklyRewardItemDBID): string | undefined;
    function GetNextActivitiesIncrease(activityTierID: number, level: number): LuaMultiReturn<[hasSeasonData: boolean, nextActivityTierID: number | undefined, nextLevel: number | undefined, itemLevel: number | undefined]>;
    function GetNextMythicPlusIncrease(mythicPlusLevel: number): LuaMultiReturn<[hasSeasonData: boolean, nextMythicPlusLevel: number | undefined, itemLevel: number | undefined]>;
    function GetNumCompletedDungeonRuns(): LuaMultiReturn<[numHeroic: number, numMythic: number, numMythicPlus: number]>;
    function GetSortedProgressForActivity(type: WeeklyRewardChestThresholdType, combineSharedDifficulty: boolean): WeeklyRewardActivityTierProgress[];
    function HasAvailableRewards(): boolean;
    function HasGeneratedRewards(): boolean;
    function HasInteraction(): boolean;
    function IsWeeklyChestRetired(): boolean;
    function OnUIInteract(): void;
    function ShouldShowFinalRetirementMessage(): boolean;
    function ShouldShowRetirementMessage(): boolean;
}

declare namespace C_WorldLootObject {
    function DoesSlotMatchInventoryType(slot: number, inventoryType: Enum.InventoryType): boolean;
    function GetWorldLootObjectDistanceSquared(unitToken: UnitToken): number | undefined;
    function GetWorldLootObjectInfo(unitToken: UnitToken): WorldLootObjectInfo | undefined;
    function GetWorldLootObjectInfoByGUID(objectGUID: string): WorldLootObjectInfo | undefined;
    function IsWorldLootObject(unitToken: UnitToken): boolean;
    function IsWorldLootObjectByGUID(guid: string): boolean;
    function IsWorldLootObjectInRange(unitToken: UnitToken): boolean;
    function OnWorldLootObjectClick(unitToken: UnitToken, isLeftClick: boolean): void;
}

declare namespace C_WorldSafeLocsUIInternal {
    function GetWorldSafeLocs(): WorldSafeLocInfo[];
}

declare namespace C_WowSurvey {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    function OpenSurvey(): void;
    function TriggerSurveyServe(deliveryMoment: Enum.SurveyDeliveryMoment): void;
}

declare namespace C_WowTokenUI {
    function ShouldDisplayInAuctionHouse(): boolean;
    function StartTokenSell(tokenGUID: string): void;
}

declare namespace C_XMLUtil {
    function GetTemplateInfo(name: string): XMLTemplateInfo | undefined;
    function GetTemplates(): XMLTemplateListInfo[];
}

declare namespace C_ZoneAbility {
    function GetActiveAbilities(): ZoneAbilityInfo[];
    function GetZoneAbilityIcon(zoneAbilitySpellID: number): number | undefined;
}

declare namespace math {
    /** Clamps a value to the inclusive range defined by the minimum and maximum values. */
    function clamp(value: number, minimum: number, maximum: number): number;
    /** Returns whether a value is finite. */
    function isfinite(value: number): boolean;
    /** Returns whether a value is positive or negative infinity. */
    function isinf(value: number): boolean;
    /** Returns whether a value is NaN. */
    function isnan(value: number): boolean;
    /** Linearly interpolates between two values. */
    function lerp(startValue: number, endValue: number, amount: number): number;
    /** Returns the relative position of a value within a range, where the minimum maps to 0 and the maximum maps to 1. */
    function normalize(value: number, minimum: number, maximum: number): number;
    /** Maps a value from one range to the corresponding position in another range. */
    function remap(value: number, sourceMinimum: number, sourceMaximum: number, destinationMinimum: number, destinationMaximum: number): number;
    /** Rounds a value to the specified number of decimal places, with halfway values rounded away from zero. */
    function round(value: number, decimalPlaces?: number): number;
    /** Clamps a value to the inclusive range [0, 1]. */
    function saturate(value: number): number;
    /** Returns -1 for negative values, 0 for zero, and 1 for positive values. */
    function sign(value: number): number;
    /** Wraps a value into the half-open range [minimum, maximum). */
    function wrap(value: number, minimum: number, maximum: number): number;
}

declare namespace string {
    /** Returns true if a string contains the specified literal substring. */
    function contains(str: string, substring: string): boolean;
    /** Returns true if a string ends with the specified suffix. */
    function endswith(str: string, suffix: string): boolean;
    /** Returns a string with all bytes in the specified character set removed from the start. */
    function ltrim(str: string, characters?: string): string;
    /** Returns a string with all bytes in the specified character set removed from the end. */
    function rtrim(str: string, characters?: string): string;
    /** Returns true if a string starts with the specified prefix. */
    function startswith(str: string, prefix: string): boolean;
    /** Returns a string with all bytes in the specified character set removed from both ends. */
    function trim(str: string, characters?: string): string;
}

declare namespace table {
    /** Returns true if any value in the table compares equal to the specified value. */
    function contains(table: LuaTable, value?: any): boolean;
    /** Returns the number of entries in the table. */
    function count(table: LuaTable): number;
    /** Creates an empty table with storage preallocated for the specified number of array and non-array entries. */
    function create(arraySizeHint: number, nodeSizeHint?: number): LuaTable;
    /** Marks a supplied table as frozen, preventing any modifications to its contents, or replacement of its metatable. If the table has a pre-existing metatable with a '__newindex' table or function, assignments will pass through without raising errors. For tainted code, only tables created by the same addon making this function call are permitted to be frozen. */
    function freeze(table: LuaTable): LuaTable;
    /** Returns detailed information about the number and distribution of entries in the table. */
    function getcountinfo(table: LuaTable): LuaMultiReturn<[numEntries: number, numPositiveIntegerKeys: number, maxPositiveIntegerKey: number]>;
    /** Returns the first integer index whose value compares equal to the specified value, searching consecutively from index 1 until the first nil value. */
    function indexof(table: LuaTable, value?: any): number | undefined;
    /** Returns true if the table contains no entries. */
    function isempty(table: LuaTable): boolean;
    /** Returns true if a table has been marked as frozen. */
    function isfrozen(table: LuaTable): boolean;
    /** Returns an array containing the keys of the specified table. */
    function keys(table: LuaTable): any;
    /** Removes the value at the specified integer index by replacing it with the last value in the array and shortening the array by one element. The order of values in the array is not preserved. */
    function removeunordered(table: LuaTable, index?: number): any | undefined;
    /** Removes all values equal to the specified value from the array portion of a table. */
    function removevalue(table: LuaTable, value?: any): number;
    /** Returns an array containing the values of the specified table. */
    function values(table: LuaTable): any;
}

declare namespace Constants {
    namespace AuctionConstants {
        const DEFAULT_AUCTION_PRICE_MULTIPLIER: 1.5;
    }
    namespace CAAConstants {
        const CAAEnabledDefault: boolean;
        const CAAVoiceDefault: 0;
        const CAASayCombatStartDefault: boolean;
        const CAASayCombatEndDefault: boolean;
        const CAAPlayerHealthPercentDefault: 0;
        const CAAPlayerHealthFormatDefault: 1;
        const CAAPulsePlayerHealthPercentDefault: 0;
        const CAATargetNameDefault: boolean;
        const CAATargetHealthPercentDefault: 2;
        const CAATargetHealthFormatDefault: 3;
        const CAATargetDeathBehaviorDefault: 0;
        const CAASayIfTargetedDefault: 1;
        const CAAPartyHealthPercentDefault: 0;
        const CAAPlayerCastModeDefault: 0;
        const CAAPlayerCastFormatDefault: 4;
        const CAATargetCastModeDefault: 0;
        const CAATargetCastFormatDefault: 0;
        const CAAInterruptCastDefault: 0;
        const CAAInterruptCastSuccessDefault: 0;
        const CAASayYourDebuffsDefault: boolean;
        const CAASayYourDebuffsFormatDefault: 0;
        const CAASayYourDebuffsMinDurationDefault: 1.5;
        const CAASayYourDebuffsMinDurationMin: 0;
        const CAASayYourDebuffsMinDurationMax: 5;
        const CAASayYourDebuffsMinDurationStep: 0.5;
        const CAADebuffSelfAlertDefault: 0;
        const CAAPlayerResourcePercentDefault: 0;
        const CAAPlayerResourceFormatDefault: 1;
        const CAAMinCastTimeMin: 0;
        const CAAMinCastTimeMax: 5;
        const CAAMinCastTimeDefault: 1.5;
        const CAAMinCastTimeStep: 0.5;
        const CAAThrottleMin: 0;
        const CAAThrottleMax: 5;
        const CAAThrottleDefault: 0;
        const CAAThrottleStep: 0.5;
        const CAAFrequencyMin: -10;
        const CAAFrequencyMax: 10;
        const CAAFrequencyDefault: 0;
        const CAASampleTextThrottleTime: 1;
        const CAASamePercentThrottleTime: 10;
    }
    namespace CalendarGetEventTypeConstants {
        const DEFAULT_CALENDAR_GET_EVENT_TYPE: Enum.CalendarGetEventType;
    }
    namespace Callings {
        const MaxCallings: 3;
    }
    namespace CatalogShopVirtualCurrencyConstants {
        const HEARTHSTEEL_VC_CURRENCY_CODE: "XVV";
        const TRADERS_TENDER_VC_CURRENCY_CODE: "XWP";
    }
    namespace CharCustomizationConstants {
        const CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_FIRST: "CustomOptionTattoo";
        const CHAR_CUSTOMIZE_CUSTOM_DISPLAY_OPTION_LAST: "CustomOptionTattooColor";
        const NUM_CUSTOM_DISPLAY: number;
        const NAME_RESERVATION_DAYS: 30;
    }
    namespace ChatFrameConstants {
        const MaxChatWindows: 10;
        const MaxChatChannels: 20;
        const MaxCharacterNameBytes: number;
    }
    namespace CombatLogMessageLimits {
        const CombatLogDefaultMessageLimit: 300;
        const CombatLogMaximumMessageLimit: 1000;
    }
    namespace CombatLogObjectMasks {
        const COMBATLOG_OBJECT_AFFILIATION_MASK: 15;
        const COMBATLOG_OBJECT_REACTION_MASK: 240;
        const COMBATLOG_OBJECT_CONTROL_MASK: 768;
        const COMBATLOG_OBJECT_TYPE_MASK: 64512;
        const COMBATLOG_OBJECT_SPECIAL_MASK: 4294901760;
    }
    namespace CombatLogObjectTargetMasks {
        const COMBATLOG_OBJECT_RAID_TARGET_MASK: 255;
        const COMBATLOG_OBJECT_RAID_MASK: 4294967295;
    }
    namespace ContentTrackingConsts {
        const MaxTrackedCollectableSources: 15;
        const MaxTrackedAchievements: 10;
    }
    namespace CooldownFrameDefaults {
        const COOLDOWN_DEFAULT_COUNTDOWN_ABBREV_THRESHOLD_MS: 120000;
        const COOLDOWN_DEFAULT_COUNTDOWN_MILLISECOND_THRESHOLD_MS: 0;
        const COOLDOWN_DEFAULT_COUNTDOWN_MINIMUM_DURATION_MS: 2000;
        const COOLDOWN_DEFAULT_BLING_DURATION_MS: 1000;
        const COOLDOWN_DEFAULT_USE_AURA_DISPLAY_TIME: boolean;
    }
    namespace CooldownViewerUIConstants {
        const COOLDOWN_VIEWER_LINKED_SPELLS_SIZE: 4;
        const COOLDOWN_VIEWER_CATEGORY_SET_SIZE: 16;
        const COOLDOWN_VIEWER_SPEC_AGNOSTIC_PARENT_ID: 0;
        const COOLDOWN_VIEWER_COMBAT_POTION_ICON_FID: 134737;
        const COOLDOWN_VIEWER_HEALTH_POTION_ICON_FID: 134834;
        const COOLDOWN_VIEWER_HEALTHSTONE_ICON_FID: 538745;
    }
    namespace CraftingOrderConsts {
        const MAX_CRAFTING_ORDER_FAVORITE_RECIPES: 100;
        const NPC_CRAFTING_ORDER_NUM_SUPPORTED_REWARDS: 2;
    }
    namespace CurrencyConsts {
        const PLAYER_CURRENCY_CLIENT_FLAGS: Enum.PlayerCurrencyFlagsDbFlags;
        const MAX_CURRENCY_QUANTITY: 100000000;
        const CONQUEST_ARENA_AND_BG_META_CURRENCY_ID: 483;
        const CONQUEST_RATED_BG_META_CURRENCY_ID: 484;
        const CONQUEST_ASHRAN_META_CURRENCY_ID: 692;
        const ACCOUNT_WIDE_HONOR_CURRENCY_ID: 1585;
        const ACCOUNT_WIDE_HONOR_LEVEL_CURRENCY_ID: 1586;
        const CONQUEST_CURRENCY_ID: 1602;
        const CONQUEST_POINTS_CURRENCY_ID: 390;
        const CONQUEST_ARENA_META_CURRENCY_ID: 483;
        const CONQUEST_BG_META_CURRENCY_ID: 484;
        const HONOR_CURRENCY_ID: 1792;
        const CLASSIC_HONOR_CURRENCY_ID: 1901;
        const ARTIFACT_KNOWLEDGE_CURRENCY_ID: 1171;
        const WAR_RESOURCES_CURRENCY_ID: 1560;
        const ECHOES_OF_NYALOTHA_CURRENCY_ID: 1803;
        const DRAGON_ISLES_SUPPLIES_CURRENCY_ID: 2003;
        const QUESTIONMARK_INV_ICON: 134400;
        const PVP_CURRENCY_CONQUEST_ALLIANCE_INV_ICON: 463448;
        const PVP_CURRENCY_CONQUEST_HORDE_INV_ICON: 463449;
        const PVP_CURRENCY_HONOR_ALLIANCE_INV_ICON: 463450;
        const PVP_CURRENCY_HONOR_HORDE_INV_ICON: 463451;
        const CURRENCY_ID_RENOWN: 1822;
        const CURRENCY_ID_RENOWN_KYRIAN: 1829;
        const CURRENCY_ID_RENOWN_VENTHYR: 1830;
        const CURRENCY_ID_RENOWN_NIGHT_FAE: 1831;
        const CURRENCY_ID_RENOWN_NECROLORD: 1832;
        const CURRENCY_ID_WILLING_SOUL: 1810;
        const CURRENCY_ID_RESERVOIR_ANIMA: 1813;
        const CURRENCY_ID_PERKS_PROGRAM_DISPLAY_INFO: 2032;
        const CURRENCY_ID_RENOWN_PVP_RANK: 3473;
        const CURRENCY_ID_RENOWN_LEGACY: 3485;
        const IMMEDIATE_CURRENCY_WALLET_ITEM_ID: 276637;
        const CURRENCY_WALLET_TYPE_WOWMONEY: 0;
    }
    namespace DeathRecapConsts {
        const SWING_DAMAGE_SPELL_ID: 88163;
    }
    namespace DelvesConsts {
        const DELVES_MIN_PLAYER_LEVEL_CONTENT_TUNING_ID: 2677;
        const DELVES_NORMAL_KEY_CURRENCY_ID: 3028;
        const DELVES_COMPANION_INFO_SELECTION_CHARACTER_DATA_ELEMENT_ID: 13;
        const DELVES_COMPANION_TOOLTIP_WIDGET_SET_ID: 1331;
        const DELVES_COMPANION_BRANN_CREATURE_ID: 210759;
        const DELVES_COMPANION_VALEERA_CREATURE_ID: 248567;
    }
    namespace EditModeConsts {
        const EditModeDefaultGridSpacing: 100;
        const EditModeMinGridSpacing: 20;
        const EditModeMaxGridSpacing: 300;
        const EditModeMaxLayoutsPerType: 5;
    }
    namespace EditModeLayoutConsts_Mainline {
        const EditModeDefaultLayout: Enum.EditModePresetLayouts;
    }
    namespace EncodingLimits {
        const EncodingDecompressSizeLimit: 104857600;
        const EncodingStackSizeLimit: 100;
    }
    namespace EncounterTimelineEventConstants {
        const ENCOUNTER_TIMELINE_INVALID_EVENT: 0;
        const ENCOUNTER_TIMELINE_RESERVED_EVENT_COUNT: 40;
    }
    namespace EncounterTimelineIconMasks {
        const EncounterTimelineTankAlertIcons: "TankRole";
        const EncounterTimelineHealerAlertIcons: "HealerRole";
        const EncounterTimelineDamageAlertIcons: "DpsRole";
        const EncounterTimelineDeadlyIcons: "DeadlyEffect";
        const EncounterTimelineDispelIcons: 124;
        const EncounterTimelineEnrageIcons: "EnrageEffect";
        const EncounterTimelineAllIcons: 1023;
        const EncounterTimelineRoleIcons: 896;
        const EncounterTimelineOtherIcons: 127;
        const EncounterTimelineNoIcons: 0;
    }
    namespace EventScheduler {
        const SCHEDULED_EVENT_REMINDER_WARNING_SECONDS: 300;
        const SCHEDULED_EVENT_FUTURE_LIMIT: 12;
        const SCHEDULED_EVENT_REMINDER_DEAD_SECONDS: 10;
        const SCHEDULED_EVENT_PAST_LIMIT_SECONDS: 3600;
    }
    namespace GamepadActionBarConstants {
        const NUM_SLOTS_PER_GAMEPAD_ACTION_BAR_GROUP: 4;
        const NUM_GROUPS_PER_GAMEPAD_ACTION_BAR: 2;
        const NUM_SLOTS_PER_GAMEPAD_ACTION_BAR: number;
        const NUM_PAGEABLE_BARS_IN_GAMEPAD_ACTION_BAR_PAGE_UNIT: 4;
        const NUM_PAGEABLE_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT_STANDARD_PAGE: number;
        const NUM_RESERVED_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT: 4;
        const NUM_PAGES_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT: 4;
        const NUM_STANDARD_PAGES_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT: 3;
        const GAMEPAD_ACTION_BAR_PAGE_UNIT_SPECIAL_PAGE_INDEX: 4;
        const NUM_PAGEABLE_SLOTS_PER_GAMEPAD_ACTION_BAR_PAGE_UNIT: number;
        const NUM_GAMEPAD_STANCE_ACTION_BARS: 5;
    }
    namespace GroupBuffUIConstants {
        const GROUP_BUFF_ITEM_LIST_SIZE: 16;
    }
    namespace HousingCatalogConsts {
        const HOUSING_CATALOG_FEATURED_CATEGORY_ID: 17;
        const HOUSING_CATALOG_ALL_CATEGORY_ID: 18;
        const HOUSING_CATALOG_DECOR_MODELSCENEID_DEFAULT: 1317;
    }
    namespace HousingConsts {
        const NeighborhoodNameMaxCharacters: 0;
        const NeighborhoodNameMinCharacters: 0;
        const BlueprintNameMaxCharacters: 0;
        const BlueprintNameMinCharacters: 0;
        const HOUSING_BLUEPRINTS_MAX_PER_BNET_ACCOUNT: 50;
        const HOUSING_BLUEPRINTS_MAX_BACKUPS_PER_BNET_ACCOUNT: 10;
    }
    namespace InventoryConstants {
        const NumBagSlots: number;
        const NumCharacterBankSlots: number;
        const NumReagentBagSlots: number;
        const NumAccountBankSlots: number;
        const MAX_TRANSACTION_BANK_TABS: 0;
    }
    namespace ITEM_WEAPON_SUBCLASSConstants {
        const ITEM_WEAPON_SUBCLASS_NONE: -1;
        const ITEM_WEAPON_SUBCLASS_MASK: 0;
        const ITEM_WEAPON_SUBCLASS_IS2HWEAPON_MASK: 0;
        const ITEM_WEAPON_SUBCLASS_USES2HANDS_MASK: 0;
        const ITEM_WEAPON_SUBCLASS_ISRANGEDWEAPON_MASK: 0;
        const ITEM_WEAPON_SUBCLASS_ISTWOHANDEDRANGEDWEAPON_MASK: 0;
        const ITEM_WEAPON_SUBCLASS_ISMAINHANDWEAPON_NONRANGED_MASK: 0;
    }
    namespace ITEM_WEAPON_SUBCLASSConstants_PostMists {
        const ITEM_WEAPON_SUBCLASS_ISTITANSGRIPWEAPON_MASK: 0;
    }
    namespace ItemConsts {
        const NUM_ITEM_ENCHANTMENT_SOCKETS: 3;
        const MAX_LOOT_OBJECT_ITEMS: 31;
        const INVALID_BANK_TAB_SLOT: 255;
        const DEFAULT_ITEM_SAVE_VERSION: 2;
        const CURRENT_ITEM_SAVE_VERSION: number;
        const DEFAULT_ARTIFACT_POWERS_VERSION: 1;
        const CURRENT_ARTIFACT_POWERS_VERSION: number;
        const DEFAULT_RETENTION: 7;
        const MAXIMUM_QUEST_ITEM_LOOT_PRIORITY_VALUES: 16;
        const NUM_RAND_PROP_POINTS_CATEGORIES: 5;
        const NUM_PROFESSION_PROP_POINTS_CATEGORIES: 2;
        const CASTER_WEAPON_DAMAGE_REDUCTION_DIVISOR_WITH_FLAG: 3;
        const CASTER_WEAPON_SPELL_POWER_MULT_WITH_FLAG: 2;
        const CASTER_WEAPON_SPELL_HEALING_MULT_WITH_FLAG: 3.76;
        const CASTER_WEAPON_SPELL_HEALING_DAMAGE_MULT_WITH_FLAG: 1.253;
    }
    namespace ItemConsts_Mainline {
        const HWM_SQUISH_ERA_PLAYER_DATA_ACCOUNT_ELEMENT_ID: 212;
    }
    namespace LegacyConsts {
        const LEGACY_REWARD_TRACK_FACTION_ID: 2802;
        const LEGACY_POINTS_TRAIT_CURRENCY_ID: 4225;
        const LEGACY_TREE_PROFESSIONS_ID: 1187;
        const LEGACY_TREE_ADVENTURE_ID: 1188;
        const LEGACY_TREE_PROGRESSION_ID: 1189;
        const LEGACY_TREE_ADVENTURE_TALENTED_NODE_ID: 110298;
        const LEGACY_DEFAULT_CATEGORY_WARRIOR: 15585;
        const LEGACY_DEFAULT_CATEGORY_PALADIN: 15580;
        const LEGACY_DEFAULT_CATEGORY_HUNTER: 15578;
        const LEGACY_DEFAULT_CATEGORY_ROGUE: 15582;
        const LEGACY_DEFAULT_CATEGORY_PRIEST: 15581;
        const LEGACY_DEFAULT_CATEGORY_SHAMAN: 15583;
        const LEGACY_DEFAULT_CATEGORY_MAGE: 15579;
        const LEGACY_DEFAULT_CATEGORY_WARLOCK: 15584;
        const LEGACY_DEFAULT_CATEGORY_DRUID: 15577;
    }
    namespace LevelConstsExposed_Camelot {
        const MIN_RES_SICKNESS_LEVEL: 11;
        const MIN_ACHIEVEMENT_LEVEL: 10;
        const MIN_TALENT_LEVEL: 10;
    }
    namespace LFG_ROLEConstants {
        const LFG_ROLE_NO_ROLE: -1;
        const LFG_ROLE_ANY: Enum.LFGRole;
    }
    namespace LFGConstsExposed {
        const GROUP_FINDER_MAX_ACTIVITY_CAPACITY: 16;
    }
    namespace LootConsts_Camelot {
        const MasterLootQualityThreshold: 4;
    }
    namespace LossOfControlConsts {
        const LOSS_OF_CONTROL_ACTIVE_INDEX: 1;
    }
    namespace MacroConsts {
        const MAX_ACCOUNT_MACROS: 120;
        const MAX_CHARACTER_MACROS: 30;
    }
    namespace MajorFactionsConsts {
        const WORLD_STATE_RENOWN_CAP_10_0: 19735;
        const WORLD_STATE_RAPID_RENOWN_CAP_10_0: 20851;
        const PVP_RANK_POINTS_FACTION_ID: 2800;
        const PLUNDERSTORM_MAJOR_FACTION_ID: 2593;
    }
    namespace MoneyFormattingConstants {
        const GOLD_REWARD_THRESHOLD_TO_HIDE_COPPER: 10;
    }
    namespace MountDynamicFlightConsts {
        const TRAIT_SYSTEM_ID: 1;
        const TREE_ID: 672;
    }
    namespace PartyCountdownConstants {
        const MaxCountdownSeconds: 3600;
    }
    namespace PetBattleConsts {
        const SUMMON_RANDOM_FAVORITE_BATTLEPET_SPELL_ID: 243819;
    }
    namespace PetConsts_Camelot {
        const PET_XP_LEVEL_MODIFIER: 0.25;
        const NUM_PET_SLOTS_THAT_NEED_LEARNED_SPELL: 1;
        const MAX_SUMMONABLE_HUNTER_PETS: number;
        const MAX_STABLE_SLOTS: 2;
        const EXTRA_PET_STABLE_SLOT: number;
        const STABLED_PETS_FIRST_SLOT_INDEX: number;
        const NUM_PET_SLOTS_HUNTER: number;
        const MAX_NUM_PET_SLOTS: number;
        const DEFAULT_PET_PERSONALITY: 1;
    }
    namespace ProfessionConsts {
        const NUM_PRIMARY_PROFESSIONS: 2;
        const CLASSIC_PROFESSION_PARENT_TIER_INDEX: 4;
        const RUNEFORGING_SKILL_LINE_ID: 960;
        const RUNEFORGING_ROOT_CATEGORY_ID: 210;
        const MAX_CRAFTING_REAGENT_SLOTS: 12;
        const CRAFTING_ORDER_CLAIM_DURATION: 0;
        const PUBLIC_CRAFTING_ORDER_STALE_THRESHOLD: 0;
        const CRAFTING_ORDER_ITEM_RETENTION: 30;
        const CRAFTING_ORDER_CURRENCY_WALLET_ITEM_ID: 262724;
    }
    namespace PvpInfoConsts {
        const MaxPlayersPerInstance: 80;
        const MAX_PVP_LOCK_LIST_MAP: 2;
    }
    namespace QuestInfoLuaConsts {
        const QUEST_INFO_ELITE_ID: 1;
        const QUEST_INFO_DUNGEON_ID: 81;
        const QUEST_INFO_PVP_ID: 41;
        const QUEST_INFO_RAID_ID: 62;
    }
    namespace QuestLogConstsMainlineCamelot {
        const MAXIMUM_NUM_QUESTS_LOG_CAN_ACCEPT: 40;
    }
    namespace QuestWatchConsts {
        const MAX_QUEST_WATCHES: 25;
        const MAX_WORLD_QUEST_WATCHES_AUTOMATIC: 1;
        const MAX_WORLD_QUEST_WATCHES_MANUAL: 5;
    }
    namespace RaidMarkerConsts {
        const MAX_RAID_TARGETS_USER: 8;
        const MAX_RAID_TARGETS_RESTRICTED: 8;
        const MAX_VALID_RAID_TARGETS: 0;
        const MAX_RAID_MARKERS: 8;
    }
    namespace RecentAlliesConsts {
        const PIN_EXPIRATION_WARNING_DAYS: 5;
    }
    namespace SpellBookSpellIDs {
        const SPELL_ID_DISMISS_PET: 2641;
    }
    namespace SpellCooldownConsts {
        const GLOBAL_RECOVERY_CATEGORY: 133;
        const COMBAT_POTION_CATEGORY: 4;
        const HEALTH_POTION_CATEGORY: 30;
        const HEALTHSTONE_CATEGORY: 1711;
    }
    namespace TalentConsts {
        const NumTalentColumns: number;
    }
    namespace TalentTierConstants {
        const MAX_TALENT_TIERS: 7;
    }
    namespace TieredEntranceConsts {
        const TIERED_ENTRANCE_TIER_SCORE_VALUE_TIER_LEVEL: 1;
        const TIERED_ENTRANCE_TIER_SCORE_VALUE_MAP_ID: 3;
        const TIERED_ENTRANCE_TIER_SCORE_VALUE_PLAYER_CONDITION_ID: 6;
        const TIERED_ENTRANCE_INFO_WORLD_TIER_DIFFICULTY_CHARACTER_ELEMENT_ID: 522;
    }
    namespace TimerunningConsts {
        const TIMERUNNING_SEASON_NONE: 0;
        const TIMERUNNING_SEASON_PANDARIA: 1;
        const TIMERUNNING_SEASON_LEGION: 2;
        const TIMERUNNING_ITEM_CTR: 2905;
        const TIMERUNNING_LEGION_ARTIFACT_CTR: 4579;
    }
    namespace TraitConsts {
        const MAX_COMBAT_TRAIT_CONFIGS: 40;
        const COMMIT_COMBAT_TRAIT_CONFIG_CHANGES_SPELL_ID: 384255;
        const INSPECT_TRAIT_CONFIG_ID: -1;
        const STARTER_BUILD_TRAIT_CONFIG_ID: -2;
        const VIEW_TRAIT_CONFIG_ID: -3;
    }
    namespace Transmog {
        const NoTransmogID: 0;
        const MainHandTransmogIsIndividualWeapon: -1;
        const MainHandTransmogIsPairedWeapon: 0;
    }
    namespace TransmogOutfitDataConsts {
        const EQUIP_TRANSMOG_OUTFIT_MANUAL_SPELL_ID: 1247613;
        const CLEAR_TRANSMOG_OUTFIT_MANUAL_SPELL_ID: 1247917;
        const TRANSMOG_OUTFIT_SLOT_NONE: -1;
    }
    namespace TTSConstants {
        const TTSRateMin: -10;
        const TTSRateMax: 10;
        const TTSRateDefault: 0;
        const TTSVolumeMin: 0;
        const TTSVolumeMax: 100;
        const TTSVolumeDefault: 100;
    }
    namespace UICharacterClasses {
        const Warrior: 0;
        const Paladin: 0;
        const Hunter: 0;
        const Rogue: 0;
        const Priest: 0;
        const DeathKnight: 0;
        const Shaman: 0;
        const Mage: 0;
        const Warlock: 0;
        const Monk: 0;
        const Druid: 0;
        const DemonHunter: 0;
        const Evoker: 0;
    }
    namespace UnitAuraUIConstants {
        const HIDDEN_GROUP_BUFF_LIST_SIZE: 128;
        const GROUP_BUFF_VISUAL_ALERT_LIST_SIZE: 128;
    }
    namespace UnitEventConstants {
        const MAX_UNIT_TOKENS_IN_EVENT: 4;
    }
    namespace UnitPowerSpellIDs {
        const VOID_METAMORPHOSIS_SPELL_ID: 1217607;
        const DARK_HEART_SPELL_ID: 1225789;
        const SILENCE_THE_WHISPERS_SPELL_ID: 1227702;
        const COLLAPSING_STAR_PASSIVE_SPELL_ID: 1221167;
        const COLLAPSING_STAR_SPELL_ID: 1221150;
    }
}
