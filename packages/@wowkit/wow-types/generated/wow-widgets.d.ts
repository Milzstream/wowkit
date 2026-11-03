// GENERATED FILE - do not edit. Regenerate with "pnpm gen:types".
// Widget (ScriptObject) interfaces; methods are called with `:`.
// Source: https://github.com/Gethe/wow-ui-source.git (forever @ 17ed2c3e84), game version 1.60.1.70755

interface FrameScriptObject {
    /**
     * Adds access restrictions to a script object, preventing it from being used in API calls when enforced.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    AddAccessRestrictions(restrictions: Enum.ScriptObjectAccessRestriction): void;
    /**
     * Adds forbidden aspects to a script object, restricting access to various functionalities such as script bindings.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    AddForbiddenAspects(aspects: Enum.ForbiddenAspect): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    AddSecretAspect(aspect: Enum.SecretAspect): void;
    /** Returns whether the current Lua execution context has permission to access this object. */
    CanBeAccessedInContext(): boolean;
    /** Returns the mask of all access restrictions applied to this object. */
    GetAccessRestrictions(): Enum.ScriptObjectAccessRestriction;
    /** Returns the mask of all forbidden aspects applied to this object. */
    GetForbiddenAspects(): Enum.ForbiddenAspect;
    /** Returns the mask of all forbidden aspects applied to this object that can propagate to others. */
    GetInheritableForbiddenAspects(path: Enum.ScriptObjectPropagationPath): Enum.ForbiddenAspect;
    GetName(): string;
    GetObjectTable(): FrameScriptObject;
    GetObjectType(): string;
    /** Returns whether this object has any access constraints that may limit access from some Lua execution contexts. */
    HasAccessConstraints(): boolean;
    /** Returns true if this object has any of the supplied access restrictions applied. */
    HasAnyAccessRestrictions(restrictions?: Enum.ScriptObjectAccessRestriction): boolean;
    /** Returns true if this object has any of the supplied forbidden aspects added. */
    HasAnyForbiddenAspects(aspects?: Enum.ForbiddenAspect): boolean;
    HasAnySecretAspect(): boolean;
    HasSecretAspect(aspect: Enum.SecretAspect): boolean;
    HasSecretValues(): boolean;
    /** Returns whether this object has been explicitly marked as forbidden. */
    IsForbidden(): boolean;
    IsObjectType(objectType: string): boolean;
    IsPreventingSecretValues(): boolean;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    SetForbidden(): void;
    /**
     * Reset all script accessible values to their default values. If possible, clears secret states.
     * @remarks Protected: only callable from secure (untainted) code.
     */
    SetToDefaults(): void;
}

interface UIObject extends FrameScriptObject {
    ClearParentKey(): void;
    GetDebugName(preferParentKey?: boolean): string;
    GetParent(): FrameScriptObject;
    GetParentKey(): string;
    SetParentKey(parentKey: string, clearOtherKeys?: boolean): void;
}

interface ScriptRegion extends UIObject {
    /** @remarks Protected: only callable from secure (untainted) code. */
    AdjustPointsOffset(x: number, y: number): void;
    CanChangeProtectedState(): boolean;
    CanPropagateMouseClicks(): boolean;
    CanPropagateMouseMotion(): boolean;
    /**
     * Clears all points and immediately invalidates the rect. (Prior to 11.2.0, this would only invalidate rect immediately for AnchoringRestricted regions.)
     * @remarks Protected: only callable from secure (untainted) code.
     */
    ClearAllPoints(): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    ClearPoint(point: FramePoint): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    ClearPointsOffset(): void;
    /** Remove all script handlers set through Scripts in XML or SetScript in Lua */
    ClearScripts(): void;
    CollapsesLayout(): boolean;
    CreateAnimationGroup(name?: string, templateName?: string): AnimationGroup;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableMouse(enable?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableMouseMotion(enable?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableMouseWheel(enable?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    FocusEnter(fromMouseMotion?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    FocusExit(fromMouseMotion?: boolean): void;
    GetAnimationGroups(): LuaMultiReturn<[...groups: (AnimationGroup)[]]>;
    GetBottom(): number | undefined;
    GetCenter(): LuaMultiReturn<[x: number | undefined, y: number | undefined]>;
    GetHeight(ignoreRect?: boolean): number;
    GetLeft(): number | undefined;
    GetNumPoints(): number;
    GetPoint(anchorIndex?: number, resolveCollapsed?: boolean): LuaMultiReturn<[point: FramePoint | undefined, relativeTo: ScriptRegion | undefined, relativePoint: FramePoint | undefined, offsetX: number | undefined, offsetY: number | undefined]>;
    GetPointByName(point: FramePoint, resolveCollapsed?: boolean): LuaMultiReturn<[point: FramePoint | undefined, relativeTo: ScriptRegion | undefined, relativePoint: FramePoint | undefined, offsetX: number | undefined, offsetY: number | undefined]>;
    GetRect(): LuaMultiReturn<[left: number | undefined, bottom: number | undefined, width: number | undefined, height: number | undefined]>;
    GetRight(): number | undefined;
    GetRoundLayoutToNearestPixel(): boolean;
    GetScaledRect(): LuaMultiReturn<[left: number | undefined, bottom: number | undefined, width: number | undefined, height: number | undefined]>;
    GetSize(ignoreRect?: boolean): LuaMultiReturn<[width: number, height: number]>;
    GetSourceLocation(): string;
    GetTop(): number | undefined;
    GetWidth(ignoreRect?: boolean): number;
    HasScript(scriptName: string): boolean;
    Hide(): void;
    Intersects(region: ScriptRegion): boolean;
    IsAnchoringRestricted(): boolean;
    IsAnchoringSecret(): boolean;
    IsCollapsed(): boolean;
    IsDragging(): boolean;
    IsMouseClickEnabled(): boolean;
    IsMouseEnabled(): boolean;
    IsMouseMotionEnabled(): boolean;
    IsMouseMotionFocus(): boolean;
    IsMouseOver(offsetTop?: number, offsetBottom?: number, offsetLeft?: number, offsetRight?: number): boolean;
    IsMouseWheelEnabled(): boolean;
    IsProtected(): LuaMultiReturn<[isProtected: boolean, isProtectedExplicitly: boolean]>;
    IsRectValid(): boolean;
    IsShown(): boolean;
    IsVisible(): boolean;
    /** @remarks Protected: only callable from secure (untainted) code. */
    MouseDown(button?: string): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    MouseUp(button?: string): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetAllPoints(relativeTo: ScriptRegion, doResize?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCollapsesLayout(collapsesLayout: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetHeight(height: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetMouseClickEnabled(enabled?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetMouseMotionEnabled(enabled?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetParent(parent?: Frame): void;
    /**
     * @remarks Protected: only callable from secure (untainted) code.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    SetPassThroughButtons(...buttons: (MouseButton)[]): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetPoint(point: FramePoint, relativeTo: ScriptRegion, relativePoint: FramePoint, offsetX: number, offsetY: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetPointsOffset(x: number, y: number): void;
    /**
     * @remarks Protected: only callable from secure (untainted) code.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    SetPropagateMouseClicks(propagate: boolean): void;
    /**
     * @remarks Protected: only callable from secure (untainted) code.
     * @remarks Has restrictions: may fail or be blocked depending on game state.
     */
    SetPropagateMouseMotion(propagate: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetRoundLayoutToNearestPixel(enabled: boolean): void;
    SetShown(show?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetSize(x: number, y: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetWidth(width: number): void;
    ShouldButtonPassThrough(button: MouseButton): boolean;
    Show(): void;
    StopAnimating(): void;
}

interface Region extends ScriptRegion {
    GetAlpha(): number;
    GetDrawLayer(): LuaMultiReturn<[layer: DrawLayer, sublayer: number]>;
    GetEffectiveScale(): number;
    GetScale(): number;
    GetVertexColor(): LuaMultiReturn<[colorR: number | undefined, colorG: number | undefined, colorB: number | undefined, colorA: number | undefined]>;
    IsIgnoringParentAlpha(): boolean;
    IsIgnoringParentScale(): boolean;
    IsObjectLoaded(): boolean;
    SetAlpha(alpha: number): void;
    SetAlphaFromBoolean(value: boolean, alphaIfTrue?: number, alphaIfFalse?: number): void;
    SetDrawLayer(layer: DrawLayer, sublevel?: number): void;
    SetIgnoreParentAlpha(ignore: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetIgnoreParentScale(ignore: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetScale(scale: number): void;
    SetVertexColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetVertexColorFromBoolean(value: boolean, colorIfTrue: ColorMixin, colorIfFalse: ColorMixin): void;
}

interface TextureBase extends Region {
    /** Disable radial progress bar rendering and restore standard texture display. */
    ClearRadialProgressBar(): void;
    ClearSVG(): void;
    /** Disable shader based nineslice texture rendering. Since SetAtlas will automatically load slice data for the atlas from the DB, can be useful if you want to disable nineslice after setting an atlas. */
    ClearTextureSlice(): void;
    ClearVertexOffsets(): void;
    GetAtlas(): string;
    GetBlendMode(): BlendMode;
    GetDesaturation(): number;
    GetHorizTile(): boolean;
    /** Returns the end angle offset of the radial progress bar as a normalized value (0 to 1). */
    GetRadialProgressBarEndOffset(): number;
    /** Returns the feather/blur amount applied to the radial progress bar edge. */
    GetRadialProgressBarFeather(): number;
    /** Returns the fill percentage of the radial progress bar (0 to 1). */
    GetRadialProgressBarPercent(): number;
    /** Returns whether the radial progress bar fills in reverse (counterclockwise) direction. */
    GetRadialProgressBarReverse(): boolean;
    /** Returns the start angle offset of the radial progress bar as a normalized value (0 to 1). */
    GetRadialProgressBarStartOffset(): number;
    GetRotation(): LuaMultiReturn<[radians: number, normalizedRotationPoint: Vector2DMixin]>;
    GetTexCoord(): LuaMultiReturn<[ulX: number, ulY: number, llX: number, llY: number, urX: number, urY: number, lrX: number, lrY: number]>;
    GetTexelSnappingBias(): number;
    GetTexture(): string | undefined;
    GetTextureFileID(): number;
    GetTextureFilePath(): string | undefined;
    GetTextureSliceMargins(): LuaMultiReturn<[left: number | undefined, top: number | undefined, right: number | undefined, bottom: number | undefined]>;
    GetTextureSliceMode(): Enum.UITextureSliceMode | undefined;
    GetVertexOffset(vertexIndex: number): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetVertTile(): boolean;
    IsBlockingLoadRequested(): boolean;
    IsDesaturated(): boolean;
    IsSnappingToPixelGrid(): boolean;
    ResetTexCoord(): void;
    SetAtlas(atlas: string, useAtlasSize?: boolean, filterMode?: FilterMode, resetTexCoords?: boolean, wrapModeHorizontal?: string, wrapModeVertical?: string): void;
    SetBlendMode(blendMode: BlendMode): void;
    SetBlockingLoadsRequested(blocking?: boolean): void;
    SetColorTexture(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetDesaturated(desaturated?: boolean): void;
    SetDesaturation(desaturation: number): void;
    SetGradient(orientation: Orientation, minColor: ColorMixin, maxColor: ColorMixin): void;
    SetHorizTile(tiling?: boolean): void;
    SetMask(file: string): void;
    /** Sets the end angle offset of the radial progress bar as a normalized value (0 to 1). */
    SetRadialProgressBarEndOffset(offset: number): void;
    /** Sets the feather/blur amount applied to the radial progress bar edge (higher = more gradual falloff). */
    SetRadialProgressBarFeather(feather: number): void;
    /** Sets the fill percentage of the radial progress bar (0 to 1). */
    SetRadialProgressBarPercent(percent: number): void;
    /** Sets whether the radial progress bar fills in reverse (counterclockwise) direction. */
    SetRadialProgressBarReverse(reverse: boolean): void;
    /** Sets the start angle offset of the radial progress bar as a normalized value (0 to 1), where 0 is at the bottom. */
    SetRadialProgressBarStartOffset(offset: number): void;
    SetRotation(radians: number, normalizedRotationPoint?: Vector2DMixin): void;
    SetSnapToPixelGrid(snap?: boolean): void;
    SetSpriteSheetCell(cell: number, numRows: number, numColumns: number, cellWidth?: number, cellHeight?: number): void;
    SetSVG(svgAsset: string | number): boolean;
    SetTexCoord(left: number, right: number, bottom: number, top: number): void;
    SetTexelSnappingBias(bias: number): void;
    SetTexture(textureAsset?: string, wrapModeHorizontal?: string, wrapModeVertical?: string, filterMode?: string): boolean;
    /** Enables nineslice texture rendering using the specified pixel margins. Preferred over legacy nineslice approach that uses 9 separate textures. */
    SetTextureSliceMargins(left: number, top: number, right: number, bottom: number): void;
    /** Controls whether the center and sides are Stretched or Tiled when using nineslice texture rendering. Defaults to Stretched. */
    SetTextureSliceMode(sliceMode: Enum.UITextureSliceMode): void;
    SetVertexOffset(vertexIndex: number, offsetX: number, offsetY: number): void;
    SetVertTile(tiling?: boolean): void;
}

interface Texture extends TextureBase {
    AddMaskTexture(mask: MaskTexture): void;
    GetMaskTexture(index: number): MaskTexture;
    GetNumMaskTextures(): number;
    RemoveMaskTexture(mask: MaskTexture): void;
}

interface MaskTexture extends TextureBase {
}

interface Line extends TextureBase {
    GetEndPoint(): LuaMultiReturn<[relativePoint: FramePoint, relativeTo: ScriptRegion, offsetX: number, offsetY: number]>;
    GetHitRectThickness(): number;
    GetStartPoint(): LuaMultiReturn<[relativePoint: FramePoint, relativeTo: ScriptRegion, offsetX: number, offsetY: number]>;
    GetThickness(): number;
    SetEndPoint(relativePoint: FramePoint, relativeTo: ScriptRegion, offsetX?: number, offsetY?: number): void;
    SetHitRectThickness(thickness: number): void;
    SetStartPoint(relativePoint: FramePoint, relativeTo: ScriptRegion, offsetX?: number, offsetY?: number): void;
    SetThickness(thickness: number): void;
}

interface FontString extends Region {
    CalculateScreenAreaFromCharacterSpan(leftIndex: number, rightIndex: number): uiBoundsRect[] | undefined;
    CanNonSpaceWrap(): boolean;
    CanWordWrap(): boolean;
    ClearAlphaGradient(): void;
    /** Sets text to an empty string and removes the Text secret aspect. */
    ClearText(): void;
    FindCharacterIndexAtCoordinate(x: number, y: number): LuaMultiReturn<[characterIndex: number | undefined, inside: boolean | undefined]>;
    GetAlphaGradient(): LuaMultiReturn<[start: number, length: number]>;
    GetFieldSize(): number;
    GetFont(): LuaMultiReturn<[fontFile: string | number | undefined, fontHeight: number, flags: TBFFlags]>;
    GetFontHeight(calculated?: boolean): number;
    GetFontObject(): Font;
    GetIndentedWordWrap(): boolean;
    GetJustifyH(): JustifyHorizontal;
    GetJustifyV(): JustifyVertical;
    GetLineHeight(): number;
    GetMaxLines(): number;
    GetNumLines(): number;
    GetRotation(): number;
    GetScaleAnimationMode(): Enum.FontStringScaleAnimationMode;
    GetShadowColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetShadowOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetSmoothScaling(): boolean;
    GetSpacing(): number;
    GetStringHeight(): number;
    GetStringWidth(): number;
    GetText(): string;
    GetTextColor(): LuaMultiReturn<[colorR: number | undefined, colorG: number | undefined, colorB: number | undefined, colorA: number | undefined]>;
    GetTextScale(): number;
    GetUnboundedStringWidth(): number;
    GetUnboundedStringWidthForText(text: string): number;
    GetWrappedWidth(): number;
    IsTruncated(): boolean;
    OnColorsUpdated(): void;
    SetAlphaGradient(start: number, length: number): boolean;
    SetDesaturateEmbeddedTextures(desaturate: boolean): void;
    SetFixedColor(fixedColor: boolean): void;
    SetFont(fontFile: string | number, fontHeight: number, flags?: TBFFlags): boolean;
    SetFontHeight(height: number): void;
    SetFontObject(font: Font): void;
    SetFormattedText(text: string): void;
    SetIndentedWordWrap(wrap: boolean): void;
    SetJustifyH(justifyH: JustifyHorizontal): void;
    SetJustifyV(justifyV: JustifyVertical): void;
    SetMaxLines(maxLines: number): void;
    SetNonSpaceWrap(wrap: boolean): void;
    SetRotation(radians: number): void;
    SetScaleAnimationMode(scaleAnimationMode: Enum.FontStringScaleAnimationMode): void;
    SetShadowColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetShadowOffset(offsetX: number, offsetY: number): void;
    SetSmoothScaling(smoothScaling: boolean): void;
    SetSpacing(spacing: number): void;
    SetText(text?: string): void;
    SetTextColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetTextHeight(height: number): void;
    SetTextScale(textScale: number): void;
    SetTextToFit(text?: string): void;
    SetWordWrap(wrap: boolean): void;
}

interface VectorGraphics extends Region {
    ClearSVG(): void;
    GetSVGFileID(): number;
    HasSVG(): boolean;
    SetSVG(svgAsset: string | number): boolean;
}

interface Font extends FrameScriptObject {
    CopyFontObject(sourceFont: Font): void;
    GetAlpha(): number;
    GetFont(): LuaMultiReturn<[fontFile: string, height: number, flags: TBFFlags]>;
    /** Return is either in uiUnits or internal height due to fixedHeight. */
    GetFontHeight(): number;
    GetFontObject(): Font;
    GetFontObjectForAlphabet(alphabet: FontAlphabet): Font;
    GetIndentedWordWrap(): boolean;
    GetJustifyH(): JustifyHorizontal;
    GetJustifyV(): JustifyVertical;
    GetShadowColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetShadowOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetSpacing(): number;
    GetTextColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    SetAlpha(alpha: number): void;
    SetFont(fontFile: string, height: number, flags: TBFFlags): void;
    /** Preserves all flags, does correct height conversion due to fixedHeight. */
    SetFontHeight(height: number): void;
    SetFontObject(font: Font): void;
    SetIndentedWordWrap(wordWrap: boolean): void;
    SetJustifyH(justifyH: JustifyHorizontal): void;
    SetJustifyV(justifyV: JustifyVertical): void;
    SetShadowColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetShadowOffset(offsetX: number, offsetY: number): void;
    SetSpacing(spacing: number): void;
    SetTextColor(colorR: number, colorG: number, colorB: number, a?: number): void;
}

interface Frame extends ScriptRegion {
    AbortDrag(): void;
    /**
     * Adds a roleset tag to this frame without removing existing ones.
     * @remarks Protected: only callable from secure (untainted) code.
     */
    AddRoleset(roleset: string): void;
    CanChangeAttribute(): boolean;
    ClearAlphaGradient(): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    ClearAttribute(attributeName: string): boolean;
    /** @remarks Protected: only callable from secure (untainted) code. */
    ClearAttributes(): void;
    CreateFontString(name?: string, drawLayer?: DrawLayer, templateName?: string): FontString;
    CreateLine(name?: string, drawLayer?: DrawLayer, templateName?: string, subLevel?: number): Line;
    CreateMaskTexture(name?: string, drawLayer?: DrawLayer, templateName?: string, subLevel?: number): MaskTexture;
    CreateTexture(name?: string, drawLayer?: DrawLayer, templateName?: string, subLevel?: number): Texture;
    CreateVectorGraphics(name?: string, drawLayer?: DrawLayer, templateName?: string, subLevel?: number): VectorGraphics;
    DesaturateHierarchy(desaturation: number, excludeRoot?: boolean): void;
    DisableDrawLayer(layer: DrawLayer): void;
    DoesClipChildren(): boolean;
    /** Returns whether hyperlink events (ex. OnHyperlinkEnter, OnHyperlinkLeave, OnHyperlinkClick) are propagated to this frame's parent. */
    DoesHyperlinkPropagateToParent(): boolean;
    EnableDrawLayer(layer: DrawLayer): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableGamePadButton(enable?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableGamePadStick(enable?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    EnableKeyboard(enable?: boolean): void;
    ExecuteAttribute(attributeName: string, ...arguments_: (string | undefined)[]): LuaMultiReturn<[success: boolean, ...returns: (string | undefined)[]]>;
    GetAlpha(): number;
    GetAttribute(attributeName: string): string;
    GetBoundsRect(): LuaMultiReturn<[left: number, bottom: number, width: number, height: number]>;
    GetChildren(): LuaMultiReturn<[...children: (Frame)[]]>;
    GetClampRectInsets(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    GetDontSavePosition(): boolean;
    GetEffectiveAlpha(): number;
    GetEffectivelyFlattensRenderLayers(): boolean;
    GetEffectiveScale(): number;
    GetFlattensRenderLayers(): boolean;
    GetFrameLevel(): number;
    GetFrameStrata(): FrameStrata;
    /** Returns the highest framelevel of the frame and its first order children, or all children if iterateAllChildren is true. */
    GetHighestFrameLevel(iterateAllChildren?: boolean): number;
    GetHitRectInsets(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    GetHyperlinksEnabled(): boolean;
    GetID(): number;
    GetNumChildren(): number;
    GetNumRegions(): number;
    /** Returns the currently configured OnUpdate script execution mode. */
    GetOnUpdateMode(): Enum.OnUpdateMode;
    GetPropagateKeyboardInput(): boolean;
    GetRaisedFrameLevel(): number;
    GetRegions(): LuaMultiReturn<[...regions: (Region)[]]>;
    GetResizeBounds(): LuaMultiReturn<[minWidth: number, minHeight: number, maxWidth: number, maxHeight: number]>;
    /** Returns the roleset tags assigned to this frame. Returns a list containing 'roleless' if none are assigned. */
    GetRolesetNames(): string[];
    GetScale(): number;
    GetWindow(): SimpleWindow;
    HasAlphaGradient(): boolean;
    HasFixedFrameLevel(): boolean;
    HasFixedFrameStrata(): boolean;
    InterceptStartDrag(delegate: Frame): boolean;
    IsClampedToScreen(): boolean;
    IsDrawLayerEnabled(layer: DrawLayer): boolean;
    IsEventRegistered(eventName: string): LuaMultiReturn<[isRegistered: boolean, ...units: (Enum.UnitTokenType | undefined)[]]>;
    IsFrameBuffer(): boolean;
    IsGamePadButtonEnabled(): boolean;
    IsGamePadStickEnabled(): boolean;
    IsHighlightLocked(): boolean;
    IsIgnoringChildrenForBounds(): boolean;
    IsIgnoringParentAlpha(): boolean;
    IsIgnoringParentScale(): boolean;
    IsKeyboardEnabled(): boolean;
    IsMovable(): boolean;
    IsObjectLoaded(): boolean;
    IsResizable(): boolean;
    /** Returns whether this frame is hidden because of its rolesets being filtered. */
    IsRolesetFiltered(): boolean;
    IsToplevel(): boolean;
    IsUserPlaced(): boolean;
    IsUsingParentLevel(): boolean;
    LockHighlight(): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    Lower(): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    Raise(): void;
    RegisterAllEvents(): void;
    RegisterEvent(eventName: string): boolean;
    RegisterEventCallback(eventName: string, cb: FrameEventCallbackType): boolean;
    RegisterForDrag(...buttons: (MouseButton)[]): void;
    RegisterUnitEvent(eventName: string, ...units: (Enum.UnitTokenType)[]): boolean;
    RegisterUnitEventCallback(eventName: string, cb: FrameEventCallbackType, ...units: (Enum.UnitTokenType)[]): boolean;
    /**
     * Removes a roleset tag from this frame.
     * @remarks Protected: only callable from secure (untainted) code.
     */
    RemoveRoleset(roleset: string): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    ResizeToBoundsRect(): void;
    RotateTextures(radians: number, x?: number, y?: number): void;
    SetAlpha(alpha: number): void;
    SetAlphaFromBoolean(value: boolean, alphaIfTrue?: number, alphaIfFalse?: number): void;
    SetAlphaGradient(index: number, gradient: Vector2DMixin): void;
    SetAttribute(attributeName: string, value: string): void;
    SetAttributeNoHandler(attributeName: string, value: string): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetClampedToScreen(clampedToScreen: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetClampRectInsets(left: number, right: number, top: number, bottom: number): void;
    SetClipsChildren(clipsChildren: boolean): void;
    SetDontSavePosition(dontSave: boolean): void;
    SetDrawLayerEnabled(layer: DrawLayer, isEnabled?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetFixedFrameLevel(isFixed: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetFixedFrameStrata(isFixed: boolean): void;
    SetFlattensRenderLayers(flatten: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetFrameLevel(frameLevel: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetFrameStrata(strata: FrameStrata): void;
    SetHighlightLocked(locked: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetHitRectInsets(left: number, right: number, top: number, bottom: number): void;
    /** Enables or disables propagating hyperlink events (ex. OnHyperlinkEnter, OnHyperlinkLeave, OnHyperlinkClick) to this frame's parent. */
    SetHyperlinkPropagateToParent(canPropagate: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetHyperlinksEnabled(enabled?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetID(id: number): void;
    SetIgnoreParentAlpha(ignore: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetIgnoreParentScale(ignore: boolean): void;
    SetIgnoringChildrenForBounds(ignore: boolean): void;
    SetIsFrameBuffer(isFrameBuffer: boolean): void;
    SetMovable(movable: boolean): void;
    /** Changes when OnUpdate scripts are executed for this object. */
    SetOnUpdateMode(onUpdateMode: Enum.OnUpdateMode): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    SetPropagateKeyboardInput(propagate: boolean): void;
    SetResizable(resizable: boolean): void;
    SetResizeBounds(minWidth: number, minHeight: number, maxWidth?: number, maxHeight?: number): void;
    /**
     * Sets the roleset tags for this frame, used by the UI mode system to gate visibility. Supports comma-separated names to assign multiple rolesets. Pass nil to clear.
     * @remarks Protected: only callable from secure (untainted) code.
     */
    SetRolesets(rolesetsString?: string): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetScale(scale: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetShown(shown?: boolean): void;
    SetShown(show?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetToplevel(topLevel: boolean): void;
    SetUserPlaced(userPlaced: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetUsingParentLevel(usingParentLevel: boolean): void;
    SetWindow(window?: SimpleWindow): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    StartMoving(alwaysStartFromMouse?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    StartSizing(resizePoint?: FramePoint, alwaysStartFromMouse?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    StopMovingOrSizing(): void;
    UnlockHighlight(): void;
    UnregisterAllEvents(): void;
    UnregisterEvent(eventName: string): boolean;
}

interface Button extends Frame {
    ClearDisabledTexture(): void;
    ClearHighlightTexture(): void;
    ClearNormalTexture(): void;
    ClearPushedTexture(): void;
    Click(button?: string, isDown?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    Disable(): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    Enable(): void;
    GetButtonState(): SimpleButtonStateToken;
    GetDisabledFontObject(): Font;
    GetDisabledTexture(): Texture;
    GetFontString(): FontString;
    GetHighlightFontObject(): Font;
    GetHighlightTexture(): Texture;
    GetMotionScriptsWhileDisabled(): boolean;
    GetNormalFontObject(): Font;
    GetNormalTexture(): Texture;
    GetPushedTextOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetPushedTexture(): Texture;
    GetText(): string;
    GetTextHeight(): number;
    GetTextWidth(): number;
    IsEnabled(): boolean;
    /** @remarks Protected: only callable from secure (untainted) code. */
    RegisterForClicks(...buttons: (MouseButton)[]): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    RegisterForMouse(...buttons: (MouseButton)[]): void;
    SetButtonState(buttonState: SimpleButtonStateToken, lock?: boolean): void;
    SetDisabledAtlas(atlas: string): void;
    SetDisabledFontObject(font: Font): void;
    SetDisabledTexture(asset: string | number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetEnabled(enabled?: boolean): void;
    SetFontString(fontString: FontString): void;
    SetFormattedText(text: string): void;
    SetHighlightAtlas(atlas: string, blendMode?: BlendMode): void;
    SetHighlightFontObject(font: Font): void;
    SetHighlightTexture(asset: string | number, blendMode?: BlendMode): void;
    SetMotionScriptsWhileDisabled(motionScriptsWhileDisabled: boolean): void;
    SetNormalAtlas(atlas: string): void;
    SetNormalFontObject(font: Font): void;
    SetNormalTexture(asset: string | number): void;
    SetPushedAtlas(atlas: string): void;
    SetPushedTextOffset(offsetX: number, offsetY: number): void;
    SetPushedTexture(asset: string | number): void;
    SetText(text?: string): void;
}

interface CheckButton extends Button {
    GetChecked(): boolean;
    GetCheckedTexture(): Texture;
    GetDisabledCheckedTexture(): Texture;
    SetChecked(checked?: boolean): void;
    SetCheckedTexture(asset: string | number): void;
    SetDisabledCheckedTexture(asset: string | number): void;
}

interface EditBox extends Frame {
    AddHistoryLine(text: string): void;
    ClearFocus(): void;
    ClearHighlightText(): void;
    ClearHistory(): void;
    Disable(): void;
    Enable(): void;
    GetAltArrowKeyMode(): boolean;
    GetBlinkSpeed(): number;
    GetCursorPosition(): number;
    GetDisplayText(): string | undefined;
    GetFont(): LuaMultiReturn<[name: string, fontHeight: number, flags: TBFFlags]>;
    GetFontObject(): Font;
    GetHighlightColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetHistoryLines(): number;
    GetIndentedWordWrap(): boolean;
    GetInputLanguage(): string;
    GetJustifyH(): JustifyHorizontal;
    GetJustifyV(): JustifyVertical;
    GetMaxBytes(): number;
    GetMaxLetters(): number;
    GetNumber(): number | undefined;
    GetNumLetters(): number | undefined;
    GetNumLines(): number;
    GetShadowColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetShadowOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetSpacing(): number;
    GetText(): string;
    GetTextColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetTextInsets(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    GetUTF8CursorPosition(): number;
    GetVisibleTextByteLimit(): number;
    HasFocus(): boolean;
    HasText(): boolean;
    HighlightText(start?: number, stop?: number): void;
    Insert(text: string): void;
    IsAlphabeticOnly(): boolean;
    IsAutoFocus(): boolean;
    IsCountInvisibleLetters(): boolean;
    IsEnabled(): boolean;
    IsInIMECompositionMode(): boolean;
    IsMultiLine(): boolean;
    IsNumeric(): boolean;
    IsNumericFullRange(): boolean;
    IsPassword(): boolean;
    IsSecureText(): boolean;
    ResetInputMode(): void;
    SetAlphabeticOnly(enabled?: boolean): void;
    SetAltArrowKeyMode(altMode?: boolean): void;
    SetAutoFocus(autoFocus?: boolean): void;
    SetBlinkSpeed(cursorBlinkSpeedSec: number): void;
    SetCountInvisibleLetters(countInvisibleLetters?: boolean): void;
    SetCursorPosition(cursorPosition: number): void;
    SetEnabled(enabled?: boolean): void;
    SetFocus(): void;
    SetFont(fontFile: string, height: number, flags: TBFFlags): boolean;
    SetFontObject(font: Font): void;
    SetHighlightColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetHistoryLines(numHistoryLines: number): void;
    SetIndentedWordWrap(isIndented?: boolean): void;
    SetJustifyH(justifyH: JustifyHorizontal): void;
    SetJustifyV(justifyV: JustifyVertical): void;
    SetMaxBytes(maxBytes: number): void;
    SetMaxLetters(maxLetters: number): void;
    SetMultiLine(multiline?: boolean): void;
    SetNumber(number: number): void;
    SetNumeric(isNumeric?: boolean): void;
    SetNumericFullRange(isNumeric?: boolean): void;
    SetPassword(isPassword?: boolean): void;
    SetSecureText(isSecure?: boolean): void;
    SetSecurityDisablePaste(): void;
    SetSecurityDisableSetText(): void;
    SetShadowColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetShadowOffset(offsetX: number, offsetY: number): void;
    SetSpacing(fontHeight: number): void;
    SetText(text: string): void;
    SetTextColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetTextInsets(left: number, right: number, top: number, bottom: number): void;
    SetVisibleTextByteLimit(maxVisibleBytes: number): void;
    ToggleInputLanguage(): void;
}

interface ScrollFrame extends Frame {
    GetHorizontalScroll(): number;
    GetHorizontalScrollRange(): number;
    GetScrollChild(): Frame;
    GetVerticalScroll(): number;
    GetVerticalScrollRange(): number;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetHorizontalScroll(offset: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetScrollChild(scrollChild: Frame): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetVerticalScroll(offset: number): void;
    UpdateScrollChildRect(): void;
}

interface Slider extends Frame {
    Disable(): void;
    Enable(): void;
    GetMinMaxValues(): LuaMultiReturn<[minValue: number, maxValue: number]>;
    GetObeyStepOnDrag(): boolean;
    GetOrientation(): Orientation;
    GetStepsPerPage(): number;
    GetThumbTexture(): Texture;
    GetValue(): number;
    GetValueStep(): number;
    IsDraggingThumb(): boolean;
    IsEnabled(): boolean;
    SetEnabled(enabled: boolean): void;
    SetMinMaxValues(minValue: number, maxValue: number): void;
    SetObeyStepOnDrag(obeyStepOnDrag: boolean): void;
    SetOrientation(orientation: Orientation): void;
    SetStepsPerPage(stepsPerPage: number): void;
    SetThumbTexture(asset: string | number): void;
    SetValue(value: number, treatAsMouseEvent?: boolean): void;
    SetValueStep(valueStep: number): void;
}

interface StatusBar extends Frame {
    GetFillStyle(): Enum.StatusBarFillStyle;
    /** Returns the current interpolated value displayed by the bar. */
    GetInterpolatedValue(): number;
    GetMinMaxValues(): LuaMultiReturn<[minValue: number, maxValue: number]>;
    GetOrientation(): Orientation;
    GetRenderMode(): Enum.StatusBarRenderMode;
    GetReverseFill(): boolean;
    GetRotatesTexture(): boolean;
    GetStatusBarColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetStatusBarDesaturation(): number;
    GetStatusBarTexture(): Texture;
    GetTimerDuration(): LuaDurationObject;
    GetValue(): number;
    /** Returns true if the status bar is currently interpolating toward a target value. */
    IsInterpolating(): boolean;
    IsStatusBarDesaturated(): boolean;
    SetColorFill(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetFillStyle(fillStyle: Enum.StatusBarFillStyle): void;
    SetMinMaxValues(minValue: number, maxValue: number, interpolation?: Enum.StatusBarInterpolation): void;
    SetOrientation(orientation: Orientation): void;
    SetRenderMode(renderMode: Enum.StatusBarRenderMode): void;
    SetReverseFill(isReverseFill: boolean): void;
    SetRotatesTexture(rotatesTexture: boolean): void;
    SetStatusBarColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetStatusBarDesaturated(desaturated?: boolean): void;
    SetStatusBarDesaturation(desaturation: number): void;
    SetStatusBarTexture(asset: string | number): boolean;
    SetTimerDuration(duration: LuaDurationObject, interpolation?: Enum.StatusBarInterpolation, direction?: Enum.StatusBarTimerDirection): void;
    /** Immediately finishes any interpolation of the bar and snaps it to the target value. */
    SetToTargetValue(): void;
    SetValue(value: number, interpolation?: Enum.StatusBarInterpolation): void;
}

interface ColorSelect extends Frame {
    ClearColorWheelTexture(): void;
    GetColorAlpha(): number;
    GetColorAlphaTexture(): Texture;
    GetColorAlphaThumbTexture(): Texture;
    GetColorHSV(): LuaMultiReturn<[hsvX: number, hsvY: number, hsvZ: number]>;
    GetColorRGB(): LuaMultiReturn<[rgbR: number, rgbG: number, rgbB: number]>;
    GetColorValueTexture(): Texture;
    GetColorValueThumbTexture(): Texture;
    GetColorWheelTexture(): Texture;
    GetColorWheelThumbTexture(): Texture;
    SetColorAlpha(alpha: number): void;
    SetColorAlphaTexture(texture: Texture): void;
    SetColorAlphaThumbTexture(texture: string | number): void;
    SetColorHSV(hsvX: number, hsvY: number, hsvZ: number): void;
    SetColorRGB(rgbR: number, rgbG: number, rgbB: number): void;
    SetColorValueTexture(texture: Texture): void;
    SetColorValueThumbTexture(texture: string | number): void;
    SetColorWheelTexture(texture: Texture): void;
    SetColorWheelThumbTexture(texture: string | number): void;
}

interface MessageFrame extends Frame {
    AddMessage(text: string, colorR: number, colorG: number, colorB: number, a?: number, messageID?: number): void;
    Clear(): void;
    GetFadeDuration(): number;
    GetFadePower(): number;
    GetFading(): boolean;
    GetFont(): LuaMultiReturn<[fontFile: string, height: number, flags: TBFFlags]>;
    GetFontObject(): Font;
    GetFontStringByID(messageID: number): FontString;
    GetIndentedWordWrap(): boolean;
    GetInsertMode(): InsertMode;
    GetJustifyH(): JustifyHorizontal;
    GetJustifyV(): JustifyVertical;
    GetShadowColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetShadowOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetSpacing(): number;
    GetTextColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetTimeVisible(): number;
    HasMessageByID(messageID: number): boolean;
    ResetMessageFadeByID(messageID: number): void;
    SetFadeDuration(fadeDurationSeconds: number): void;
    SetFadePower(fadePower: number): void;
    SetFading(fading: boolean): void;
    SetFont(fontFile: string, height: number, flags: TBFFlags): void;
    SetFontObject(font: Font): void;
    SetIndentedWordWrap(wordWrap: boolean): void;
    SetInsertMode(mode: InsertMode): void;
    SetJustifyH(justifyH: JustifyHorizontal): void;
    SetJustifyV(justifyV: JustifyVertical): void;
    SetShadowColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetShadowOffset(offsetX: number, offsetY: number): void;
    SetSpacing(spacing: number): void;
    SetTextColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetTimeVisible(timeVisibleSeconds: number): void;
}

interface SimpleHTML extends Frame {
    GetContentHeight(): number;
    GetFont(textType: HTMLTextType): LuaMultiReturn<[fontFile: string, height: number, flags: TBFFlags]>;
    GetFontObject(textType: HTMLTextType): Font;
    GetHyperlinkFormat(): string;
    GetIndentedWordWrap(textType: HTMLTextType): boolean;
    GetJustifyH(textType: HTMLTextType): JustifyHorizontal;
    GetJustifyV(textType: HTMLTextType): JustifyVertical;
    GetShadowColor(textType: HTMLTextType): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetShadowOffset(textType: HTMLTextType): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetSpacing(textType: HTMLTextType): number;
    GetTextColor(textType: HTMLTextType): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetTextData(): HTMLContentNode[];
    SetFont(textType: HTMLTextType, fontFile: string, height: number, flags: TBFFlags): void;
    SetFontObject(textType: HTMLTextType, font: Font): void;
    SetHyperlinkFormat(format: string): void;
    SetIndentedWordWrap(textType: HTMLTextType, wordWrap: boolean): void;
    SetJustifyH(textType: HTMLTextType, justifyH: JustifyHorizontal): void;
    SetJustifyV(textType: HTMLTextType, justifyV: JustifyVertical): void;
    SetShadowColor(textType: HTMLTextType, colorR: number, colorG: number, colorB: number, a?: number): void;
    SetShadowOffset(textType: HTMLTextType, offsetX: number, offsetY: number): void;
    SetSpacing(textType: HTMLTextType, spacing: number): void;
    SetText(text: string, ignoreMarkup?: boolean): void;
    SetTextColor(textType: HTMLTextType, colorR: number, colorG: number, colorB: number, a?: number): void;
}

interface Browser extends Frame {
    ClearFocus(): void;
    CopyExternalLink(): void;
    DeleteCookies(): void;
    NavigateBack(): void;
    NavigateForward(): void;
    NavigateHome(urlType: string): void;
    NavigateReload(): void;
    NavigateStop(): void;
    OpenExternalLink(): void;
    OpenTicket(index: number): void;
    SetFocus(): void;
    SetZoom(zoom: number): void;
}

interface MovieFrame extends Frame {
    EnableSubtitles(enable: boolean): void;
    StartMovie(movieID: number, looping?: boolean): LuaMultiReturn<[success: boolean, returnCode: number]>;
    StartMovieByName(movieName: string, looping?: boolean, resolution?: number): LuaMultiReturn<[success: boolean, returnCode: number]>;
    StopMovie(): void;
}

interface OffScreenFrame extends Frame {
    ApplySnapshot(texture: Texture, snapshotID: number): boolean;
    Flush(): void;
    GetMaxSnapshots(): number;
    IsSnapshotValid(snapshotID: number): boolean;
    SetMaxSnapshots(maxSnapshots: number): void;
    TakeSnapshot(): number | undefined;
    /** Unavailable in public builds */
    TestPrintToFile(snapshotID: number, filename: string): boolean;
    UsesNPOT(): boolean | undefined;
}

interface MapScene extends Frame {
    GetMaxCharacterSlotCount(): number;
    GetModelDrawLayer(): LuaMultiReturn<[layer: DrawLayer, sublayer: number]>;
    GetViewInsets(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    SetModelDrawLayer(layer: DrawLayer): void;
    SetViewInsets(left: number, right: number, top: number, bottom: number): void;
}

interface Model extends Frame {
    AdvanceTime(): void;
    ClearFog(): void;
    ClearModel(): void;
    ClearTransform(): void;
    GetCameraDistance(): number;
    GetCameraFacing(): number;
    GetCameraPosition(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    GetCameraRoll(): number;
    GetCameraTarget(): LuaMultiReturn<[targetX: number, targetY: number, targetZ: number]>;
    GetDesaturation(): number;
    GetFacing(): number;
    GetFogColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number, colorA: number]>;
    GetFogFar(): number;
    GetFogNear(): number;
    GetLight(): LuaMultiReturn<[enabled: boolean, light: ModelLight]>;
    GetModelAlpha(): number;
    GetModelDrawLayer(): LuaMultiReturn<[layer: DrawLayer, sublayer: number]>;
    GetModelFileID(): number;
    GetModelScale(): number;
    GetPaused(): boolean;
    GetPitch(): number;
    GetPosition(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    GetRoll(): number;
    GetShadowEffect(): number;
    GetViewInsets(): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    GetViewTranslation(): LuaMultiReturn<[x: number, y: number]>;
    GetWorldScale(): number;
    HasAttachmentPoints(): boolean;
    HasCustomCamera(): boolean;
    IsUsingModelCenterToTransform(): boolean;
    MakeCurrentCameraCustom(): void;
    ReplaceIconTexture(asset: string | number): void;
    SetCamera(cameraIndex: number): void;
    SetCameraDistance(distance: number): void;
    SetCameraFacing(radians: number): void;
    SetCameraPosition(positionX: number, positionY: number, positionZ: number): void;
    SetCameraRoll(radians: number): void;
    SetCameraTarget(targetX: number, targetY: number, targetZ: number): void;
    SetCustomCamera(cameraIndex: number): void;
    SetDesaturation(strength: number): void;
    SetFacing(facing: number): void;
    SetFogColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetFogFar(fogFar: number): void;
    SetFogNear(fogNear: number): void;
    SetGlow(glow: number): void;
    SetGradientMask(grad0: number, grad1: number, grad2: number, grad3: number): void;
    SetLight(enabled: boolean, light: ModelLight): void;
    SetModel(asset: string | number, noMip?: boolean): void;
    SetModelAlpha(alpha: number): void;
    SetModelDrawLayer(layer: DrawLayer): void;
    SetModelScale(scale: number): void;
    SetParticlesEnabled(enabled: boolean): void;
    SetPaused(paused: boolean): void;
    SetPitch(pitch: number): void;
    SetPosition(positionX: number, positionY: number, positionZ: number): void;
    SetRoll(roll: number): void;
    SetSequence(sequence: number): void;
    SetSequenceTime(sequence: number, timeOffset: number): void;
    SetShadowEffect(strength: number): void;
    SetTransform(translation?: Vector3DMixin, rotation?: Vector3DMixin, scale?: number): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    SetUseGBuffer(useGBuffer: boolean): void;
    SetViewInsets(left: number, right: number, top: number, bottom: number): void;
    SetViewTranslation(x: number, y: number): void;
    TransformCameraSpaceToModelSpace(cameraPosition: Vector3DMixin): Vector3DMixin;
    UseModelCenterToTransform(useCenter: boolean): void;
}

interface ModelFFX extends Model {
    AddCharacterLight(index: number | undefined, light: ModelLight): void;
    AddLight(index: number | undefined, light: ModelLight): void;
    AddPetLight(index: number | undefined, light: ModelLight): void;
    ResetLights(): void;
}

interface PlayerModel extends Model {
    ApplySpellVisualKit(spellVisualKitID: number, oneShot?: boolean): void;
    CanSetUnit(unit: UnitToken): void;
    FreezeAnimation(anim: AnimationDataEnum, variation: number, frame: number): void;
    GetDisplayInfo(): number;
    GetDoBlend(): boolean;
    GetKeepModelOnHide(): boolean;
    HasAnimation(anim: AnimationDataEnum): boolean;
    PlayAnimKit(animKit: number, loop?: boolean): void;
    RefreshCamera(): void;
    RefreshUnit(): void;
    SetAnimation(anim: AnimationDataEnum, variation?: number): void;
    SetBarberShopAlternateForm(): void;
    SetCamDistanceScale(scale: number): void;
    SetCreature(creatureID: number, displayID?: number): void;
    SetDisplayInfo(displayID: number, mountDisplayID?: number): void;
    SetDoBlend(doBlend?: boolean): void;
    SetItem(itemID: number, appearanceModID?: number, itemVisualID?: number): void;
    SetItemAppearance(itemAppearanceID: number, itemVisualID?: number, itemSubclass?: Enum.ItemWeaponSubclass): void;
    SetKeepModelOnHide(keepModelOnHide: boolean): void;
    SetPortraitZoom(zoom: number): void;
    SetRotation(radians: number, animate?: boolean): void;
    SetUnit(unit: UnitToken, blend?: boolean, useNativeForm?: boolean): boolean;
    StopAnimKit(): void;
    ZeroCachedCenterXY(): void;
}

interface CinematicModel extends PlayerModel {
    EquipItem(itemID: number): void;
    InitializeCamera(scaleFactor?: number): void;
    InitializePanCamera(scaleFactor?: number): void;
    SetAnimOffset(offset: number): void;
    SetCameraTarget(positionX: number, positionY: number, positionZ: number): void;
    SetCameraTarget(targetX: number, targetY: number, targetZ: number): void;
    SetCreatureData(creatureID: number): void;
    SetFacingLeft(isFacingLeft?: boolean): void;
    SetFadeTimes(fadeInSeconds: number, fadeOutSeconds: number): void;
    SetHeightFactor(factor: number): void;
    SetJumpInfo(jumpLength: number, jumpHeight: number): void;
    SetPanDistance(scale: number): void;
    SetSpellVisualKit(visualKitID: number): void;
    SetTargetDistance(scale: number): void;
    StartPan(panType: number, durationSeconds: number, doFade?: boolean, visKitID?: number, startPositionScale?: number, speedMultiplier?: number): void;
    StopPan(): void;
    UnequipItems(): void;
}

interface DressUpModel extends PlayerModel {
    Dress(): void;
    GetAutoDress(): boolean;
    GetItemTransmogInfo(inventorySlot: number): ItemTransmogInfoMixin | undefined;
    GetItemTransmogInfoList(): ItemTransmogInfo[];
    GetObeyHideInTransmogFlag(): boolean;
    GetSheathed(): boolean;
    GetUseTransmogChoices(): boolean;
    GetUseTransmogSkin(): boolean;
    IsGeoReady(): boolean;
    IsSlotAllowed(slot: number): boolean;
    IsSlotVisible(slot: number): boolean;
    SetAutoDress(enabled?: boolean): void;
    SetItemTransmogInfo(itemTransmogInfo: ItemTransmogInfoMixin, inventorySlot?: number, ignoreChildItems?: boolean): Enum.ItemTryOnReason;
    SetObeyHideInTransmogFlag(enabled?: boolean): void;
    SetSheathed(sheathed?: boolean, hideWeapons?: boolean): void;
    SetUseTransmogChoices(enabled?: boolean): void;
    SetUseTransmogSkin(enabled?: boolean): void;
    TryOn(linkOrItemModifiedAppearanceID: number | string, handSlotName?: string, spellEnchantID?: number): Enum.ItemTryOnReason | undefined;
    Undress(): void;
    UndressSlot(inventorySlot: number): void;
}

interface TabardModelBase extends PlayerModel {
    CanSaveTabardNow(): boolean;
    CycleVariation(variationIndex: number, delta: number): void;
    GetLowerEmblemTexture(texture: Texture): void;
    GetUpperEmblemTexture(texture: Texture): void;
    InitializeTabardColors(): void;
    IsGuildTabard(): boolean;
    Save(): void;
}

interface TabardModel extends TabardModelBase {
    GetLowerBackgroundFileName(): number;
    GetLowerBorderFile(): number;
    GetLowerEmblemFile(): number;
    GetUpperBackgroundFileName(): number;
    GetUpperBorderFile(): number;
    GetUpperEmblemFile(): number;
}

interface ModelScene extends Frame {
    ClearFog(): void;
    CreateActor(name: string, template: string): void;
    GetActorAtIndex(index: number): void;
    GetAllowOverlappedModels(): boolean;
    GetCameraFarClip(): number;
    /** Field of view in radians */
    GetCameraFieldOfView(): number;
    GetCameraForward(): LuaMultiReturn<[forwardX: number, forwardY: number, forwardZ: number]>;
    GetCameraNearClip(): number;
    GetCameraPosition(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    GetCameraRight(): LuaMultiReturn<[rightX: number, rightY: number, rightZ: number]>;
    GetCameraUp(): LuaMultiReturn<[upX: number, upY: number, upZ: number]>;
    GetDrawLayer(): LuaMultiReturn<[layer: DrawLayer, sublevel: number]>;
    GetFogColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    GetFogFar(): number;
    GetFogNear(): number;
    GetLightAmbientColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    GetLightDiffuseColor(): LuaMultiReturn<[colorR: number, colorG: number, colorB: number]>;
    GetLightDirection(): LuaMultiReturn<[directionX: number, directionY: number, directionZ: number]>;
    GetLightPosition(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    GetLightType(): Enum.ModelLightType | undefined;
    GetNumActors(): number;
    GetViewInsets(): uiRect;
    GetViewTranslation(): LuaMultiReturn<[translationX: number, translationY: number]>;
    IsLightVisible(): boolean;
    Project3DPointTo2D(pointX: number, pointY: number, pointZ: number): LuaMultiReturn<[point2DX: number | undefined, point2DY: number | undefined, depth: number | undefined]>;
    SetAllowOverlappedModels(allowOverlappedModels: boolean): void;
    SetCameraFarClip(farClip: number): void;
    /** Field of view in radians */
    SetCameraFieldOfView(fov: number): void;
    SetCameraNearClip(nearClip: number): void;
    SetCameraOrientationByAxisVectors(forwardX: number, forwardY: number, forwardZ: number, rightX: number, rightY: number, rightZ: number, upX: number, upY: number, upZ: number): void;
    SetCameraOrientationByYawPitchRoll(yaw: number, pitch: number, roll: number): void;
    SetCameraPosition(positionX: number, positionY: number, positionZ: number): void;
    SetDesaturation(strength: number): void;
    SetDrawLayer(layer: DrawLayer): void;
    SetFogColor(colorR: number, colorG: number, colorB: number): void;
    SetFogFar(far: number): void;
    SetFogNear(near: number): void;
    SetLightAmbientColor(colorR: number, colorG: number, colorB: number): void;
    SetLightDiffuseColor(colorR: number, colorG: number, colorB: number): void;
    SetLightDirection(directionX: number, directionY: number, directionZ: number): void;
    SetLightPosition(positionX: number, positionY: number, positionZ: number): void;
    SetLightType(lightType: Enum.ModelLightType): void;
    SetLightVisible(visible?: boolean): void;
    SetPaused(paused: boolean, affectsGlobalPause?: boolean): void;
    SetViewInsets(insets: uiRect): void;
    SetViewTranslation(translationX: number, translationY: number): void;
    TakeActor(): void;
}

interface ModelSceneActorBase extends UIObject {
    ClearModel(): void;
    GetActiveBoundingBox(): LuaMultiReturn<[boxBottom: Vector3DMixin, boxTop: Vector3DMixin]>;
    GetAlpha(): number;
    GetAnimation(): AnimationDataEnum;
    GetAnimationBlendOperation(): Enum.ModelBlendOperation;
    GetAnimationVariation(): number;
    GetDesaturation(): number;
    GetMaxBoundingBox(): LuaMultiReturn<[boxBottom: Vector3DMixin, boxTop: Vector3DMixin]>;
    GetModelFileID(): number;
    GetModelPath(): string;
    GetModelUnitGUID(): string;
    GetParticleOverrideScale(): number | undefined;
    GetPitch(): number;
    GetPosition(): LuaMultiReturn<[positionX: number, positionY: number, positionZ: number]>;
    GetRoll(): number;
    GetScale(): number;
    GetSpellVisualKit(): number;
    GetYaw(): number;
    Hide(): void;
    IsLoaded(): boolean;
    IsPreferringModelCollisionBounds(): boolean;
    IsShown(): boolean;
    IsUsingCenterForOrigin(): LuaMultiReturn<[x: boolean, y: boolean, z: boolean]>;
    IsVisible(): boolean;
    PlayAnimationKit(animationKit: number, isLooping?: boolean): void;
    SetAlpha(alpha: number): void;
    SetAnimation(animation: AnimationDataEnum, variation?: number, animSpeed?: number, animOffsetSeconds?: number): void;
    SetAnimationBlendOperation(blendOp: Enum.ModelBlendOperation): void;
    SetDesaturation(strength: number): void;
    SetGradientMask(gradientIndex0: number, gradientIndex1: number, gradientIndex2: number, gradientIndex3: number): void;
    SetGradientMaskWithDyes(grad0DyeColorID?: number, grad1DyeColorID?: number, grad2DyeColorID?: number): void;
    SetModelByCreatureDisplayID(creatureDisplayID: number, useActivePlayerCustomizations?: boolean): boolean;
    SetModelByFileID(asset: string | number, useMips?: boolean): boolean;
    SetModelByPath(asset: string | number, useMips?: boolean): boolean;
    SetModelByUnit(unit: UnitToken, sheatheWeapons?: boolean, autoDress?: boolean, hideWeapons?: boolean, usePlayerNativeForm?: boolean, holdBowString?: boolean, customRaceID?: number): boolean;
    SetModelByUnitCreatureDisplayID(unit: UnitToken): boolean;
    SetParticleOverrideScale(scale?: number): void;
    SetPitch(pitch: number): void;
    SetPlayerModelFromGlues(characterIndex?: number, sheatheWeapons?: boolean, autoDress?: boolean, hideWeapons?: boolean, usePlayerNativeForm?: boolean, customRaceID?: number): boolean;
    SetPosition(positionX: number, positionY: number, positionZ: number): void;
    /** If true, will try to use the collision bounds of models for sizing and centering. Will fall back to default model bounds if set to False, or if collision bounds are unavailable. */
    SetPreferModelCollisionBounds(preferCollisionBounds: boolean): void;
    SetRoll(roll: number): void;
    SetScale(scale: number): void;
    SetShown(show?: boolean): void;
    SetSpellVisualKit(spellVisualKitID?: number, oneShot?: boolean): void;
    SetUseCenterForOrigin(x?: boolean, y?: boolean, z?: boolean): void;
    SetYaw(yaw: number): void;
    Show(): void;
    StopAnimationKit(): void;
    TryOn(itemLinkOrItemModifiedAppearanceID: string, handSlotName?: string, spellEnchantmentID?: number): Enum.ItemTryOnReason | undefined;
}

interface ModelSceneActor extends ModelSceneActorBase {
    AttachToMount(rider: ModelSceneActor, animation: AnimationDataEnum, spellKitVisualID?: number): boolean;
    CalculateMountScale(rider: ModelSceneActor): number;
    DetachFromMount(rider: ModelSceneActor): boolean;
    Dress(): void;
    DressPlayerSlot(invSlot: number): void;
    GetAutoDress(): boolean;
    GetItemTransmogInfo(inventorySlots: number): ItemTransmogInfoMixin | undefined;
    GetItemTransmogInfoList(): ItemTransmogInfo[];
    GetObeyHideInTransmogFlag(): boolean;
    GetPaused(): LuaMultiReturn<[paused: boolean, globalPaused: boolean]>;
    GetSheathed(): boolean;
    GetUseTransmogChoices(): boolean;
    GetUseTransmogSkin(): boolean;
    IsGeoReady(): boolean;
    IsSlotAllowed(inventorySlots: number): boolean;
    IsSlotVisible(inventorySlots: number): boolean;
    ReleaseFrontEndCharacterDisplays(): boolean;
    ResetNextHandSlot(): void;
    SetAutoDress(autoDress: boolean): void;
    SetFrontEndLobbyModelFromDefaultCharacterDisplay(characterIndex: number): boolean;
    SetItemTransmogInfo(transmogInfo: ItemTransmogInfoMixin, inventorySlots?: number, ignoreChildItems?: boolean): Enum.ItemTryOnReason;
    SetModelByHyperlink(link: string): boolean;
    SetObeyHideInTransmogFlag(obey: boolean): void;
    SetPaused(paused: boolean, affectsGlobalPause?: boolean): void;
    SetSheathed(sheathed: boolean, hidden?: boolean): void;
    SetSheathedCategory(inventorySlots: number, category: Enum.TransmogOutfitSlotOptionSheatheCategory): void;
    SetUseTransmogChoices(use: boolean): void;
    SetUseTransmogSkin(use: boolean): void;
    Undress(includeWeapons?: boolean): void;
    UndressSlot(inventorySlots: number): void;
    UseUnitSheatheCategory(useCategory: boolean): void;
}

interface Cooldown extends Frame {
    /** @remarks Protected: only callable from secure (untainted) code. */
    Clear(): void;
    /** The returned duration unit is milliseconds, unaffected by modRate. */
    GetCooldownDisplayDuration(): number;
    /** The returned duration unit is milliseconds and is multiplied by the modRate. */
    GetCooldownDuration(): number;
    GetCooldownTimes(): LuaMultiReturn<[start: number, duration: number]>;
    /** Returns the threshold below which cooldown numbers are displayed as an abbreviated form without a unit suffix (eg. '1:31'). */
    GetCountdownAbbrevThreshold(): number;
    GetCountdownFontString(): FontString;
    GetCountdownFormatter(): NumericFormatter | undefined;
    /** Returns the threshold below which cooldown numbers are displayed as a decimal value with one place for milliseconds (eg. '8.7'). */
    GetCountdownMillisecondsThreshold(): number;
    GetDrawBling(): boolean;
    GetDrawEdge(): boolean;
    GetDrawSwipe(): boolean;
    GetEdgeScale(): number;
    GetHideCountdownNumbers(): boolean;
    GetMinimumCountdownDuration(): number;
    GetReverse(): boolean;
    GetRotation(): number;
    GetUseAuraDisplayTime(): boolean;
    IsPaused(): boolean;
    Pause(): void;
    Resume(): void;
    SetBlingTexture(texture: string | number, colorR: number, colorG: number, colorB: number, colorA: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCooldown(start: number, duration: number, modRate?: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCooldownDuration(duration: number, modRate?: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCooldownFromDurationObject(duration: LuaDurationObject, clearIfZero?: boolean): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCooldownFromExpirationTime(expirationTime: number, duration: number, modRate?: number): void;
    /** @remarks Protected: only callable from secure (untainted) code. */
    SetCooldownUNIX(start: number, duration: number, modRate?: number): void;
    /** Sets the threshold below which cooldown numbers are displayed as an abbreviated form without a unit suffix (eg. '1:31'). */
    SetCountdownAbbrevThreshold(seconds: number): void;
    SetCountdownFont(fontName: string): void;
    SetCountdownFormatter(formatter?: NumericFormatter): void;
    /** Sets the threshold below which cooldown numbers are displayed as a decimal value with one place for milliseconds (eg. '8.7'). */
    SetCountdownMillisecondsThreshold(seconds: number): void;
    SetDrawBling(drawBling?: boolean): void;
    SetDrawEdge(drawEdge?: boolean): void;
    SetDrawSwipe(drawSwipe?: boolean): void;
    SetEdgeColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetEdgeScale(scale: number): void;
    SetEdgeTexture(texture: string | number, colorR: number, colorG: number, colorB: number, colorA: number): void;
    SetHideCountdownNumbers(hideNumbers?: boolean): void;
    /** Controls the minimum duration above which countdown text will be shown. This is applied based upon the total duration of the cooldown, not the remaining duration as it ticks down. */
    SetMinimumCountdownDuration(milliseconds: number): void;
    SetPaused(paused: boolean): void;
    SetReverse(reverse?: boolean): void;
    SetRotation(rotationRadians: number): void;
    SetSwipeColor(colorR: number, colorG: number, colorB: number, a?: number): void;
    SetSwipeTexture(texture: string | number | undefined, colorR: number, colorG: number, colorB: number, colorA: number): void;
    SetTexCoordRange(low: Vector2DMixin, high: Vector2DMixin): void;
    /** Aura durations are displayed slightly differently than cooldown durations. Setting this to true will adjust the display logic to stay in sync with aura timers. */
    SetUseAuraDisplayTime(useAuraDisplayTime?: boolean): void;
    SetUseCircularEdge(useCircularEdge?: boolean): void;
}

interface GameTooltip extends Frame {
    AddFontStrings(leftFontString: FontString, rightFontString: FontString): void;
    /** Set all padding values to 0.0 and remove the Padding SecretAspect. */
    ClearPadding(): void;
    GetLeftLine(line: number): FontString;
    GetMinimumWidth(): LuaMultiReturn<[width: number, forced: boolean]>;
    GetPadding(): LuaMultiReturn<[right: number, bottom: number, left: number, top: number]>;
    GetRightLine(line: number): FontString;
    SetMinimumWidth(width: number, force?: boolean): void;
    SetPadding(right: number, bottom: number, left?: number, top?: number): void;
    SetText(text: string, colorR: number, colorG: number, colorB: number, alpha?: number, wrap?: boolean): void;
}

interface Minimap extends Frame {
    GetPingPosition(): LuaMultiReturn<[positionX: number, positionY: number]>;
    GetZoom(): number;
    GetZoomLevels(): number;
    PingLocation(locationX: number, locationY: number): void;
    SetArchBlobInsideAlpha(alpha: number): void;
    SetArchBlobInsideTexture(asset: string | number): void;
    SetArchBlobOutsideAlpha(alpha: number): void;
    SetArchBlobOutsideTexture(asset: string | number): void;
    SetArchBlobRingAlpha(alpha: number): void;
    SetArchBlobRingScalar(scalar: number): void;
    SetArchBlobRingTexture(asset: string | number): void;
    SetIconScale(scale: number): void;
    SetMaskTexture(asset: string | number): void;
    SetQuestBlobInsideAlpha(alpha: number): void;
    SetQuestBlobInsideTexture(asset: string | number): void;
    SetQuestBlobOutsideAlpha(alpha: number): void;
    SetQuestBlobOutsideTexture(asset: string | number): void;
    SetQuestBlobRingAlpha(alpha: number): void;
    SetQuestBlobRingScalar(scalar: number): void;
    SetQuestBlobRingTexture(asset: string | number): void;
    SetTaskBlobInsideAlpha(alpha: number): void;
    SetTaskBlobInsideTexture(asset: string | number): void;
    SetTaskBlobOutsideAlpha(alpha: number): void;
    SetTaskBlobOutsideTexture(asset: string | number): void;
    SetTaskBlobRingAlpha(alpha: number): void;
    SetTaskBlobRingScalar(scalar: number): void;
    SetTaskBlobRingTexture(asset: string | number): void;
    SetUsingSoftCursor(usingSoftCursor: boolean): void;
    SetZoom(zoomFactor: number): void;
    UpdateBlips(): void;
    UpdateMouseoverAtPoint(pointX: number, pointY: number): void;
}

interface ArchaeologyDigSiteFrame extends Frame {
}

interface FogOfWarFrame extends Frame {
    GetFogOfWarBackgroundAtlas(): string;
    GetFogOfWarBackgroundTexture(): string | number | undefined;
    GetFogOfWarMaskAtlas(): string;
    GetFogOfWarMaskTexture(): string | number | undefined;
    GetMaskScalar(): number;
    GetUiMapID(): number;
    SetFogOfWarBackgroundAtlas(atlas: string): void;
    SetFogOfWarBackgroundTexture(asset: string | number, horizontalTile: boolean, verticalTile: boolean): void;
    SetFogOfWarMaskAtlas(atlas: string): void;
    SetFogOfWarMaskTexture(asset: string | number): void;
    SetMaskScalar(scalar: number): void;
    SetUiMapID(uiMapID: number): void;
}

interface Blob extends Frame {
    DrawAll(): void;
    DrawBlob(questID: number, draw?: boolean): void;
    DrawNone(): void;
    EnableMerging(enable?: boolean): void;
    EnableSmoothing(enable?: boolean): void;
    GetMapID(): number;
    SetBorderAlpha(alpha: number): void;
    SetBorderScalar(scalar: number): void;
    SetBorderTexture(asset: string | number): void;
    SetFillAlpha(alpha: number): void;
    SetFillTexture(asset: string | number): void;
    SetMapID(uiMapID: number): void;
    SetMergeThreshold(threshold: number): void;
    SetNumSplinePoints(numSplinePoints: number): void;
}

interface QuestPOIFrame extends Blob {
    GetNumTooltips(): number;
    GetTooltipIndex(index: number): number;
    UpdateMouseOverTooltip(x: number, y: number): LuaMultiReturn<[questID: number | undefined, numObjectives: number | undefined]>;
}

interface ScenarioPOIFrame extends Blob {
    GetScenarioTooltipText(): string | undefined;
    UpdateMouseOverTooltip(x: number, y: number): boolean;
}

interface UnitPositionFrame extends Frame {
    AddUnit(unitTokenString: string, asset: string | number, width?: number, height?: number, r?: number, g?: number, b?: number, a?: number, sublayer?: number, showFacing?: boolean): void;
    ClearUnits(): void;
    FinalizeUnits(): void;
    GetMouseOverUnits(): LuaMultiReturn<[...units: (Enum.UnitTokenType)[]]>;
    GetPlayerPingScale(): number;
    GetUiMapID(): number;
    SetPlayerPingScale(scale: number): void;
    SetPlayerPingTexture(textureType: Enum.PingTextureType, asset: string | number, width?: number, height?: number): void;
    SetUiMapID(mapID: number): void;
    SetUnitColor(unit: Enum.UnitTokenType, colorR: number, colorG: number, colorB: number, colorA: number): void;
    StartPlayerPing(duration?: number, fadeDuration?: number): void;
    StopPlayerPing(): void;
}

interface NamePlate extends Frame {
    /** Returns true if this nameplate permits changes to its hit-test points. Updates are normally blocked for tainted code during combat, except on the tick a unit is first assigned or when untainted code updates hit-test points on the same tick. */
    CanChangeHitTestPoints(): boolean;
    /** Clears the anchor points that determine where the mouse interacts with the nameplate. */
    ClearAllHitTestPoints(): void;
    /** Returns the anchor points that determine where the mouse interacts with the nameplate. */
    GetHitTestPoints(): AnchorBinding[];
    /** Sets the anchor points that determine where the mouse interacts with the nameplate to fully encompass the target region. */
    SetAllHitTestPoints(relativeTo: ScriptRegion): void;
    /** Sets the anchor points that determine where the mouse interacts with the nameplate. */
    SetHitTestPoints(anchors: AnchorBinding[]): void;
    SetStackingBoundsFrame(frame: Frame): void;
}

interface Checkout extends Frame {
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    CancelOpenCheckout(): void;
    ClearFocus(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    CloseCheckout(): void;
    CopyExternalLink(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    OpenCheckout(checkoutID: number): boolean;
    OpenExternalLink(): void;
    SetFocus(): void;
    /** @remarks Has restrictions: may fail or be blocked depending on game state. */
    SetZoom(zoomLevel: number): void;
}

interface PingPinFrame extends Frame {
}

interface HousingFixturePointFrame extends Frame {
    HasAttachedFixture(): boolean;
    IsSelected(): boolean;
    IsValid(): boolean;
    Select(): void;
    SetUpdateCallback(cb: FixturePointUpdatedCallback): void;
}

interface HousingLayoutPinFrame extends Frame {
    CanMove(): Enum.HousingLayoutRestriction;
    CanRemove(): Enum.HousingLayoutRestriction;
    CanRotate(): Enum.HousingLayoutRestriction;
    Drag(isAccessible: boolean): void;
    GetDoorConnectionInfo(): DoorConnectionInfo | undefined;
    GetPinType(): Enum.HousingLayoutPinType;
    GetRoomGUID(): string;
    GetRoomName(): string | undefined;
    /** Returns true if this pin's associated room, or anything attached to it, is selected. Ex: If pin is for a door, returns true if its room, or any other doors on that room, are selected */
    IsAnyPartOfRoomSelected(): boolean;
    IsConnectedToDraggingRoom(): boolean;
    /** Will be nil if pin is not a Door */
    IsOccupiedDoor(): boolean | undefined;
    IsPartOfDraggingRoom(): boolean;
    /** Returns true if this pin's object is itself selected; See IsAnyPartOfRoomSelected for a broader Selected check */
    IsSelected(): boolean;
    IsValid(): boolean;
    IsValidForSelectedFloorplan(): boolean;
    Select(): void;
    SetUpdateCallback(cb: PinUpdatedCallback): void;
}

interface AnimationGroup extends UIObject {
    CreateAnimation(animationType?: string, name?: string, templateName?: string): Animation;
    Finish(): void;
    GetAnimations(): LuaMultiReturn<[...anims: (Animation)[]]>;
    GetAnimationSpeedMultiplier(): number;
    GetDuration(): number;
    GetElapsed(): number;
    GetLooping(): LoopType;
    GetLoopState(): string;
    GetProgress(): number;
    GetScript(scriptTypeName: string, bindingType?: Enum.ScriptBindingType): WowCallback;
    HasScript(scriptName: string): boolean;
    HookScript(scriptTypeName: string, script: WowCallback, bindingType?: Enum.ScriptBindingType): boolean;
    IsDone(): boolean;
    IsPaused(): boolean;
    IsPendingFinish(): boolean;
    IsPlaying(): boolean;
    IsReverse(): boolean;
    IsSetToFinalAlpha(): boolean;
    Pause(): void;
    Play(reverse?: boolean, offset?: number): void;
    RemoveAnimations(): void;
    Restart(reverse?: boolean, offset?: number): void;
    SetAnimationSpeedMultiplier(animationSpeedMultiplier: number): void;
    SetLooping(loopType: LoopType): void;
    SetPlaying(play: boolean): void;
    SetScript(scriptTypeName: string, script?: WowCallback): void;
    SetToFinalAlpha(setToFinalAlpha: boolean): void;
    Stop(): void;
}

interface Animation extends UIObject {
    GetDuration(): number;
    GetElapsed(): number;
    GetEndDelay(): number;
    GetOrder(): number;
    GetProgress(): number;
    GetRegionParent(): FrameScriptObject;
    GetScript(scriptTypeName: string, bindingType?: Enum.ScriptBindingType): WowCallback;
    GetSmoothing(): SmoothingType;
    GetSmoothProgress(): number;
    GetStartDelay(): number;
    GetTarget(): FrameScriptObject;
    HasScript(scriptName: string): boolean;
    HookScript(scriptTypeName: string, script: WowCallback, bindingType?: Enum.ScriptBindingType): boolean;
    IsDelaying(): boolean;
    IsDone(): boolean;
    IsPaused(): boolean;
    IsPlaying(): boolean;
    IsStopped(): boolean;
    Pause(): void;
    Play(): void;
    Restart(): void;
    SetChildKey(childKey: string): boolean;
    SetDuration(durationSec: number, recomputeGroupDuration?: boolean): void;
    SetEndDelay(delaySec: number, recomputeGroupDuration?: boolean): void;
    SetOrder(newOrder: number): void;
    SetParent(parent: AnimationGroup, order?: number): void;
    SetPlaying(play: boolean): void;
    SetScript(scriptTypeName: string, script?: WowCallback): void;
    SetSmoothing(weights: SmoothingType): void;
    SetSmoothProgress(durationSec: number): void;
    SetStartDelay(delaySec: number, recomputeGroupDuration?: boolean): void;
    SetTarget(target: FrameScriptObject): boolean;
    SetTargetKey(key: string): boolean;
    SetTargetName(name: string): boolean;
    SetTargetParent(): boolean;
    Stop(): void;
}

interface AlphaAnimation extends Animation {
    GetFromAlpha(): number;
    GetToAlpha(): number;
    SetFromAlpha(normalizedAlpha: number): void;
    SetToAlpha(normalizedAlpha: number): void;
}

interface FlipBookAnimation extends Animation {
    GetFlipBookColumns(): number;
    GetFlipBookFrameHeight(): number;
    GetFlipBookFrames(): number;
    GetFlipBookFrameWidth(): number;
    GetFlipBookRows(): number;
    SetFlipBookColumns(columns: number): void;
    SetFlipBookFrameHeight(height: number): void;
    SetFlipBookFrames(frames: number): void;
    SetFlipBookFrameWidth(width: number): void;
    SetFlipBookRows(rows: number): void;
}

interface PathAnimation extends Animation {
    CreateControlPoint(name?: string, templateName?: string, order?: number): ControlPoint;
    GetControlPoints(): LuaMultiReturn<[...points: (ControlPoint)[]]>;
    GetCurveType(): CurveType;
    GetMaxControlPointOrder(): number;
    SetCurveType(curveType: CurveType): void;
}

interface RadialProgressAnimation extends Animation {
    GetFromPercent(): number;
    GetToPercent(): number;
    SetFromPercent(percent: number): void;
    SetToPercent(percent: number): void;
}

interface RotationAnimation extends Animation {
    GetDegrees(): number;
    GetOrigin(): LuaMultiReturn<[point: FramePoint, originX: number, originY: number]>;
    GetRadians(): number;
    SetDegrees(angle: number): void;
    SetOrigin(point: FramePoint, originX: number, originY: number): void;
    SetRadians(angle: number): void;
}

interface ScaleAnimation extends Animation {
    GetOrigin(): LuaMultiReturn<[point: FramePoint, originX: number, originY: number]>;
    GetScale(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    GetScaleFrom(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    GetScaleTo(): LuaMultiReturn<[scaleX: number, scaleY: number]>;
    SetOrigin(point: FramePoint, originX: number, originY: number): void;
    SetScale(scaleX: number, scaleY: number): void;
    SetScaleFrom(scaleX: number, scaleY: number): void;
    SetScaleTo(scaleX: number, scaleY: number): void;
}

interface LineScaleAnimation extends Animation {
}

interface TextureCoordTranslationAnimation extends Animation {
    GetOffset(): LuaMultiReturn<[offsetU: number, offsetV: number]>;
    SetOffset(offsetU: number, offsetV: number): void;
}

interface TranslationAnimation extends Animation {
    GetOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    SetOffset(offsetX: number, offsetY: number): void;
}

interface LineTranslationAnimation extends Animation {
}

interface VertexColorAnimation extends Animation {
    GetEndColor(): ColorMixin;
    GetStartColor(): ColorMixin;
    SetEndColor(color: ColorMixin): void;
    SetStartColor(color: ColorMixin): void;
}

interface ControlPoint extends UIObject {
    GetOffset(): LuaMultiReturn<[offsetX: number, offsetY: number]>;
    GetOrder(): number;
    SetOffset(offsetX: number, offsetY: number): void;
    SetOrder(order: number): void;
    SetParent(parent: PathAnimation, order?: number): void;
}

interface LuaCurveObjectBase {
    /** Returns the configured type of the curve. */
    GetType(): Enum.LuaCurveType;
    /** Returns true if the curve has been configured with any secret values. Curves with secret values always produce secret results when evaluated. */
    HasSecretValues(): boolean;
    /** Changes the evaluation type of the curve. */
    SetType(type: Enum.LuaCurveType): void;
}

interface LuaCurveObject extends LuaCurveObjectBase {
    /** Adds a single point to the curve. */
    AddPoint(pointX: number, pointY: number): void;
    /** Removes all points from the curve. Evaluating an empty curve always yields a zero value. */
    ClearPoints(): void;
    /** Returns a new copy of this curve. */
    Copy(): LuaCurveObject;
    /** Returns a calculated 'y' value from the configured curve points. */
    Evaluate(x: number): number;
    /** Returns the vector for an individual point index on the curve. */
    GetPoint(index: number): Vector2DMixin | undefined;
    /** Returns the total number of points on the curve. */
    GetPointCount(): number;
    /** Returns the vectors for all points on the curve. */
    GetPoints(): vector2[];
    /** Removes a single point from the curve. Raises an error if the supplied point index is out of range. */
    RemovePoint(index: number): void;
    /** Replaces all points on the curve. */
    SetPoints(point: vector2[]): void;
    /** Resets all state on the curve, and clears the secret values flag. */
    SetToDefaults(): void;
}

interface LuaColorCurveObject extends LuaCurveObjectBase {
    /** Adds a single point to the curve. */
    AddPoint(x: number, y: ColorMixin): void;
    /** Removes all points from the curve. Evaluating an empty curve always yields a zero value. */
    ClearPoints(): void;
    /** Returns a new copy of this curve. */
    Copy(): LuaColorCurveObject;
    /** Returns a calculated color value from the configured curve points. */
    Evaluate(x: number): ColorMixin;
    /** Returns an unpacked calculated color value from the configured curve points. */
    EvaluateUnpacked(x: number): LuaMultiReturn<[yR: number, yG: number, yB: number, yA: number]>;
    /** Returns the vector for an individual point index on the curve. */
    GetPoint(index: number): LuaColorCurvePoint | undefined;
    /** Returns the total number of points on the curve. */
    GetPointCount(): number;
    /** Returns the vectors for all points on the curve. */
    GetPoints(): LuaColorCurvePoint[];
    /** Removes a single point from the curve. Raises an error if the supplied point index is out of range. */
    RemovePoint(index: number): void;
    /** Replaces all points on the curve. */
    SetPoints(point: LuaColorCurvePoint[]): void;
    /** Resets all state on the curve, and clears the secret values flag. */
    SetToDefaults(): void;
}

interface AbbreviateConfig {
    GetAbbreviateNumberData(): NumberAbbreviationBreakpoint[];
    SetAbbreviateNumberData(data: NumberAbbreviationBreakpoint[]): void;
}

interface AbbreviatedNumberFormatter {
    /** Adds a new breakpoint to the formatter. */
    AddBreakpoint(breakpoint: NumberAbbreviationBreakpoint): void;
    /** Removes all configured breakpoints from the formatter. */
    ClearBreakpoints(): void;
    /** Returns a new copy of this formatter. */
    Copy(): AbbreviatedNumberFormatter;
    /** Returns a list of all configured breakpoints on this formatter. */
    GetBreakpoints(): NumberAbbreviationBreakpoint[];
    /** Removes all configured breakpoints from the formatter and replaces them with appropriate defaults for the client locale. */
    ResetBreakpoints(): void;
    /** Replaces all breakpoints on the formatter. */
    SetBreakpoints(breakpoints: NumberAbbreviationBreakpoint[]): void;
}

interface DurationTextBindingObject {
    /** Copies another duration text binding and assigns it to this one. */
    Assign(other: DurationTextBindingObject): void;
    /** Returns true if this binding has enough configuration to produce formatted text. */
    CanFormatText(): boolean;
    /** Returns true if this binding has enough configuration to update its font string with formatted text. */
    CanUpdateFontString(): boolean;
    /** Clears the text color curve used by this binding. */
    ClearTextColorCurve(): void;
    /** Returns a copy of this duration text binding. */
    Copy(): DurationTextBindingObject;
    /** Disables automatic updates for this duration text binding. */
    Disable(): void;
    /** Enables automatic updates for this duration text binding. */
    Enable(): void;
    /** Returns the duration object used by this duration text binding. */
    GetDuration(): LuaDurationObject | undefined;
    /** Returns the text shown when the duration has fully expired. */
    GetExpiredText(): string | undefined;
    /** Returns the font string updated by this duration text binding. */
    GetFontString(): FontString | undefined;
    /** Returns the text that would currently be assigned to the configured font string. */
    GetFormattedText(): string;
    /** Returns the text color that would currently be assigned to the configured font string. */
    GetFormattedTextColor(): ColorMixin | undefined;
    /** Returns the text color curve used by this binding. */
    GetTextColorCurve(): LuaMultiReturn<[curve: LuaColorCurveObject | undefined, property: Enum.DurationTextBindingProperty | undefined]>;
    /** Returns the time modifier used when sampling duration values for this binding. */
    GetTimeModifier(): Enum.DurationTimeModifier;
    /** Returns the minimum number of seconds between automatic text updates. A value of zero updates every game tick. */
    GetUpdateInterval(): number;
    /** Returns the text shown when the duration is not configured, or represents a zero-duration time span. */
    GetZeroDurationText(): string | undefined;
    /** Returns true if the duration text binding has been configured with any secret values. */
    HasSecretValues(): boolean;
    /** Returns true if this duration text binding updates its font string automatically. */
    IsEnabled(): boolean;
    /** Configures the duration object used by this duration text binding. */
    SetDuration(duration: LuaDurationObject): void;
    /** Configures whether this duration text binding updates its font string automatically. */
    SetEnabled(enabled: boolean): void;
    /** Configures the text shown when the duration has fully expired. */
    SetExpiredText(text?: string): void;
    /** Configures the font string updated by this duration text binding. */
    SetFontString(fontString: FontString): void;
    /** Configures the text format used by this duration text binding to display the remaining duration using the supplied formatter. */
    SetFormatter(formatter: NumericFormatter): void;
    /** Configures this duration text binding to adjust fontstring text color by evaluating a duration property through a curve. */
    SetTextColorCurve(curve: LuaColorCurveObject, property: Enum.DurationTextBindingProperty): void;
    /** Configures the text format used by this duration text binding. The format string may contain '{}' placeholders, each of which is substituted by the corresponding component in the supplied array. */
    SetTextFormat(formatString: string, components: DurationTextBindingFormatComponent[]): void;
    /** Configures the time modifier used when sampling duration values for this binding. */
    SetTimeModifier(modifier: Enum.DurationTimeModifier): void;
    /** Resets this duration text binding to its default state, clearing the configured font string, duration, format, formatter, and fallback text. */
    SetToDefaults(): void;
    /** Configures the minimum number of seconds between automatic text updates. A value of zero updates every game tick. */
    SetUpdateInterval(updateInterval: number): void;
    /** Configures the text shown when the duration is not configured, or represents a zero-duration time span. */
    SetZeroDurationText(text?: string): void;
    /** Immediately updates the configured font string from the current duration state. */
    UpdateFontString(): void;
}

interface HousingCatalogSearcher {
    /** Returns all catalog entries being searched (note these are NOT search results, this is the source collection of what's being searched) */
    GetAllSearchItems(): HousingCatalogEntryVariantID[];
    /** Returns the most recent search result entries */
    GetCatalogSearchResults(): HousingCatalogEntryVariantID[];
    GetEditorModeContext(): Enum.HouseEditorMode | undefined;
    GetFilteredCategoryID(): number | undefined;
    GetFilteredSubcategoryID(): number | undefined;
    GetFilterTagStatus(groupID: number, tagID: number): boolean;
    /** Returns the total number of entries being searched through */
    GetNumSearchItems(): number;
    /** Returns the total number of owned instances across all most recent search result entries */
    GetSearchCount(): number;
    GetSearchText(): string | undefined;
    GetSortType(): Enum.HousingCatalogSortType;
    IsAllowedIndoorsActive(): boolean;
    IsAllowedOutdoorsActive(): boolean;
    IsBaseVariantOnlyActive(): boolean;
    IsCollectedActive(): boolean;
    IsCustomizableOnlyActive(): boolean;
    IsFirstAcquisitionBonusOnlyActive(): boolean;
    IsSearchInProgress(): boolean;
    IsStoredOnlyActive(): boolean;
    IsUncollectedActive(): boolean;
    /** Run search with all current param values */
    RunSearch(): void;
    /** Set the toggle state of all filter tags within a specific group; If active, only entries that match Any of the tags in the group will be included in search results */
    SetAllInFilterTagGroup(groupID: number, active: boolean): void;
    /** Search parameter; If true, entries that can be placed in house interiors will be included in the search; Note many decor objects can be placed both indoors and outdoors, so having only this toggled on may still include decor that can also be placed outdoors */
    SetAllowedIndoors(isActive: boolean): void;
    /** Search parameter; If true, entries that can be placed outside in plots will be included in the search; Note many decor objects can be placed both indoors and outdoors, so having only this toggled on may still include decor that can also be placed indoors */
    SetAllowedOutdoors(isActive: boolean): void;
    /** If true, searcher automatically updates results whenever search param values are changed */
    SetAutoUpdateOnParamChanges(autoUpdateActive: boolean): void;
    /** Search parameter; If true, only the base variant of each decor entry will be included */
    SetBaseVariantOnly(isActive: boolean): void;
    /** Search parameter; If true, includes all owned entries, including those that are in storage OR placed in an owned house or plot; See IsStoredOnlyActive for a more exclusive toggle */
    SetCollected(isActive: boolean): void;
    /** Search parameter; If true, catalog entries that cannot be customized (ie dyed) will be excluded from the search */
    SetCustomizableOnly(isActive: boolean): void;
    /** Search parameter; If set, limits search results to only entries that are used/valid in the specified editor mode */
    SetEditorModeContext(editorModeContext?: Enum.HouseEditorMode): void;
    /** Search parameter; If set, limits search results to only those within the specified category */
    SetFilteredCategoryID(categoryID?: number): void;
    /** Search parameter; If set, limits search results to only those within the specified subcategory */
    SetFilteredSubcategoryID(subcategoryID?: number): void;
    /** Set the toggle state of a single filter tag within a specific group */
    SetFilterTagStatus(groupID: number, tagID: number, active: boolean): void;
    /** Search parameter; If true, excludes any entries that do not reward house xp when acquired for the first time */
    SetFirstAcquisitionBonusOnly(isActive: boolean): void;
    SetResultsUpdatedCallback(callback: HousingCatalogSearchResultsUpdatedCallback): void;
    /** Search parameter; If set, multiple text fields are checked for instances of the text, including name, category, subcategory, and data tags */
    SetSearchText(searchText?: string): void;
    SetSortType(sortType: Enum.HousingCatalogSortType): void;
    /** Search parameter; If true, only entries that you have instances of available in storage will be included; This does not include entries that you own but have all been placed in a house; See IsCollectedActive for param that includes placed entries */
    SetStoredOnly(isActive: boolean): void;
    /** Search parameter; If true, includes entries that are not owned, meaning not available in storage nor placed in any owned houses or plots */
    SetUncollected(isActive: boolean): void;
    ToggleAllowedIndoors(): void;
    ToggleAllowedOutdoors(): void;
    ToggleBaseVariantOnly(): void;
    ToggleCollected(): void;
    ToggleCustomizableOnly(): void;
    ToggleFilterTag(groupID: number, tagID: number): void;
    ToggleFirstAcquisitionBonusOnly(): void;
    ToggleStoredOnly(): void;
    ToggleUncollected(): void;
}

interface LuaDurationClockObject {
    /** Returns the current time value represented by this clock. */
    GetTime(): number;
}

interface LuaDurationManualClock {
    /** Advances the clock by a specified number of seconds. */
    AdvanceTime(delta: number): void;
    /** Resets the clock to a zero time value. */
    ResetTime(): void;
    /** Rewinds the clock by a specified number of seconds. */
    RewindTime(delta: number): void;
    /** Sets the current clock timestamp to a given value. */
    SetTime(time: number): void;
}

interface LuaDurationObject {
    /** Copies another duration object and assigns it to this one. */
    Assign(other: LuaDurationObject): void;
    /** Returns a copy of this duration object. */
    Copy(): LuaDurationObject;
    /** Calculates the elapsed duration in seconds and evaluates it against a supplied curve. */
    EvaluateElapsedDuration(curve: LuaCurveObjectBase, modifier?: Enum.DurationTimeModifier): LuaCurveEvaluatedResult;
    /** Calculates the elapsed duration as a percentage value and evaluates it against a supplied curve. */
    EvaluateElapsedPercent(curve: LuaCurveObjectBase, modifier?: Enum.DurationTimeModifier): LuaCurveEvaluatedResult;
    /** Calculates the remaining duration in seconds and evaluates it against a supplied curve. */
    EvaluateRemainingDuration(curve: LuaCurveObjectBase, modifier?: Enum.DurationTimeModifier): LuaCurveEvaluatedResult;
    /** Calculates the remaining duration as a percentage value and evaluates it against a supplied curve. */
    EvaluateRemainingPercent(curve: LuaCurveObjectBase, modifier?: Enum.DurationTimeModifier): LuaCurveEvaluatedResult;
    /** Calculates the total duration in seconds and evaluates it against a supplied curve. */
    EvaluateTotalDuration(curve: LuaCurveObjectBase, modifier?: Enum.DurationTimeModifier): LuaCurveEvaluatedResult;
    /** Formats the elapsed duration of this object to a string. */
    FormatElapsedDuration(formatter: NumericFormatter, modifier?: Enum.DurationTimeModifier): string;
    /** Formats the remaining duration of this object to a string. */
    FormatRemainingDuration(formatter: NumericFormatter, modifier?: Enum.DurationTimeModifier): string;
    /** Formats the total duration of this object to a string. */
    FormatTotalDuration(formatter: NumericFormatter, modifier?: Enum.DurationTimeModifier): string;
    /** Returns the clock source used by this object. */
    GetClock(): LuaDurationClockObject | undefined;
    /** Returns the current time of the clock source used by this object. */
    GetClockTime(): number;
    /** Calculates the elapsed duration of the stored time span. */
    GetElapsedDuration(modifier?: Enum.DurationTimeModifier): number;
    /** Calculates the elapsed duration as a percentage value. */
    GetElapsedPercent(modifier?: Enum.DurationTimeModifier): number;
    /** Calculates the end time of the stored time span. */
    GetEndTime(modifier?: Enum.DurationTimeModifier): number;
    /** Returns the divisor used to convert a duration from real time to base time. */
    GetModRate(): number;
    /** Calculates the remaining duration of the stored time span. */
    GetRemainingDuration(modifier?: Enum.DurationTimeModifier): number;
    /** Calculates the remaining duration as a percentage value. */
    GetRemainingPercent(modifier?: Enum.DurationTimeModifier): number;
    /** Calculates the start time of the stored time span. */
    GetStartTime(modifier?: Enum.DurationTimeModifier): number;
    /** Calculates the total duration of the stored time span. */
    GetTotalDuration(modifier?: Enum.DurationTimeModifier): number;
    /** Returns true once the duration has reached its end time. */
    HasExpired(modifier?: Enum.DurationTimeModifier): boolean;
    /** Returns true if the duration has been configured with any secret values. */
    HasSecretValues(): boolean;
    /** Returns true once the duration has reached its start time. */
    HasStarted(modifier?: Enum.DurationTimeModifier): boolean;
    /** Returns true while the duration is at or after its start time and before its end time. */
    IsActive(modifier?: Enum.DurationTimeModifier): boolean;
    /** Returns true if the duration object is measuring a zero duration time span. */
    IsZero(): boolean;
    /** Resets the duration object to represent a zero duration time span. */
    Reset(): void;
    /** Configures the clock source used by this object. */
    SetClock(clock?: LuaDurationClockObject): void;
    /** Configures the duration object to represent an end time and a duration. */
    SetTimeFromEnd(endTime: number, duration: number, modRate?: number): void;
    /** Configures the duration object to represent a start time and a duration. */
    SetTimeFromStart(startTime: number, duration: number, modRate?: number): void;
    /** Configures the duration object to represent a fixed start and end time span. If the end time is earlier than the start time, the duration will clamp to zero. */
    SetTimeSpan(startTime: number, endTime: number): void;
    /** Resets all state on the duration, and clears the secret values flag. */
    SetToDefaults(): void;
}

interface LuaLocaleContext {
    /** Compares two UTF-8 strings using the options specified on a collator. */
    CompareStrings(left: string, right: string, strength: Enum.CollationStrength): number | undefined;
    /** Opens a break iterator for locating text boundaries in the context locale. */
    FindBreaks(text: string, breakType: Enum.BreakType): number[] | undefined;
    /** Creates a string search iterator using a collator and returns every match position. */
    FindStringMatches(text: string, pattern: string, strength: Enum.CollationStrength): number[] | undefined;
    /** Case-folds the characters in a string; case-folding is locale-independent and not context-sensitive. */
    FoldCase(text: string): string | undefined;
    /** Formats a double as a localized currency value using the provided ISO 4217 currency code. */
    FormatCurrency(number: number, currencyCode: string): string | undefined;
    /** Formats Unix time as localized date text using locale date patterns, symbols, style, and optional time zone. */
    FormatDate(unixTimeSeconds: number, style: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Formats Unix time as localized date and time text using locale patterns, symbols, styles, and optional time zone. */
    FormatDateTime(unixTimeSeconds: number, dateStyle: Enum.DateTimeStyle, timeStyle: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Formats a double with locale number formatting using locale symbols, grouping, and the selected non-currency style. */
    FormatNumber(number: number, style: Enum.NumberStyle): string | undefined;
    /** Formats Unix time as localized time text using locale time patterns, symbols, style, and optional time zone. */
    FormatTime(unixTimeSeconds: number, style: Enum.DateTimeStyle, timeZone: string): string | undefined;
    /** Returns the display name for a currency in the context locale. */
    GetCurrencyName(currencyCode: string, style: Enum.CurrencyNameStyle): string | undefined;
    /** Gets a display name suitable for the specified locale. */
    GetDisplayName(displayLocale: string): string | undefined;
    /** Gets the locale used by this locale context. */
    GetLocale(): string;
    /** Transforms a string into a collation sort key. */
    GetSortKey(text: string, strength: Enum.CollationStrength): string | undefined;
    /** Counts character break boundaries in UTF-8 text. */
    Length(text: string): number | undefined;
    /** Parses an entire localized currency string into a double amount and ISO 4217 currency code. */
    ParseCurrency(text: string): CurrencyParseResult | undefined;
    /** Parses an entire localized number string into a double using the selected non-currency number formatter. */
    ParseNumber(text: string, style: Enum.NumberStyle): number | undefined;
    /** Returns the keyword of the first plural rule that applies to a number. */
    SelectPlural(number: number, pluralType: Enum.PluralType): string | undefined;
    /** Sets the locale used by this locale context. */
    SetLocale(locale: string): boolean;
    /** Lowercases the characters in a string; casing is locale-dependent and context-sensitive. */
    ToLower(text: string): string | undefined;
    /** Titlecases a string using titlecase positions determined by the default Unicode algorithm. */
    ToTitle(text: string): string | undefined;
    /** Uppercases the characters in a string; casing is locale-dependent and context-sensitive. */
    ToUpper(text: string): string | undefined;
    /** Applies a locale transform to the context locale and returns the transformed locale string. */
    TransformLocale(transform: Enum.LocaleTransform): string | undefined;
}

interface NumericFormatter {
    FormatNumber(number: number): string;
}

interface NumericRuleFormatter {
    /** Adds a new breakpoint to the formatter. */
    AddBreakpoint(breakpoint: NumericRuleFormatBreakpoint): void;
    /** Removes all configured breakpoints from the formatter. */
    ClearBreakpoints(): void;
    /** Returns a new copy of this formatter. */
    Copy(): NumericRuleFormatter;
    /** Returns a list of all configured breakpoints on this formatter. */
    GetBreakpoints(): NumericRuleFormatBreakpoint[];
    /** Replaces all breakpoints on the formatter. */
    SetBreakpoints(breakpoints: NumericRuleFormatBreakpoint[]): void;
}

interface SecondsFormatter {
    /** Returns true if the given number of seconds is within an appropriate range for approximated formatting. */
    CanApproximate(seconds: number): boolean;
    /** Returns true if the formatter can promote values to higher interval bands. */
    CanRoundUpIntervals(): boolean;
    /** Returns true if the formatter should round the final unit up rather than down. */
    CanRoundUpLastUnit(): boolean;
    /** Returns the unit count that a given number of seconds will use for formatting. */
    EvaluateDesiredUnitCount(seconds: number): number;
    /** Returns the maximum interval band that a given number of seconds will use for formatting. */
    EvaluateMaxInterval(seconds: number): Enum.SecondsFormatterInterval;
    /** Returns the minimum interval band that a given number of seconds will use for formatting. */
    EvaluateMinInterval(seconds: number): Enum.SecondsFormatterInterval;
    /** Formats a number of seconds and returns the resulting string. */
    Format(seconds: number, abbreviation?: Enum.SecondsFormatterAbbreviation): string;
    /** Returns formatted string representing a zero second duration. */
    FormatZero(abbreviation?: Enum.SecondsFormatterAbbreviation): string;
    /** Returns the threshold below which numeric values are formatted as approximated strings. */
    GetApproximationSeconds(): number;
    /** Returns true if the formatter should lowercase all unit format strings. */
    GetConvertToLower(): boolean;
    /** Returns the default abbreviation mode used for formatting. */
    GetDefaultAbbreviation(): Enum.SecondsFormatterAbbreviation | undefined;
    /** Returns the desired unit count for formatting. */
    GetDesiredUnitCount(): number | undefined;
    /** Returns the desired unit count curve for formatting. */
    GetDesiredUnitCountCurve(): LuaCurveObject | undefined;
    /** Returns the maximum interval band permitted for formatting. */
    GetMaxInterval(): Enum.SecondsFormatterInterval | undefined;
    /** Returns the maximum interval band curve permitted for formatting. */
    GetMaxIntervalCurve(): LuaCurveObject | undefined;
    /** Returns the threshold below which a value will be formatted as a decimal number of seconds with one place for milliseconds (eg. '3.4') */
    GetMillisecondsThreshold(): number;
    /** Returns the minimum interval band permitted for formatting. */
    GetMinInterval(): Enum.SecondsFormatterInterval | undefined;
    /** Returns the minimum interval band curve permitted for formatting. */
    GetMinIntervalCurve(): LuaCurveObject | undefined;
    /** Returns how fractional seconds are rounded when not displaying milliseconds. */
    GetRounding(): Enum.SecondsFormatterRounding;
    /** Returns the whitespace stripping mode of the formatter. */
    GetStripIntervalWhitespace(): Enum.SecondsFormatterIntervalWhitespace;
    /** Resets all stored configuration of the formatter. */
    Reset(): void;
    /** Configures the formatter to render numeric values between zero and this value as approximated strings (eg. '< 1m'). */
    SetApproximationSeconds(seconds: number): void;
    /** Configures the formatter to promote intervals if values are large enough (eg. '60m' -> '1h'). */
    SetCanRoundUpIntervals(canRound: boolean): void;
    /** Configures the formatter to round the last formatted unit up, rather than down. */
    SetCanRoundUpLastUnit(canRound: boolean): void;
    /** Configures the formatter to convert all interval format strings to lowercase. */
    SetConvertToLower(convert: boolean): void;
    /** Sets the default abbreviation mode used for formatting. */
    SetDefaultAbbreviation(abbreviation: Enum.SecondsFormatterAbbreviation): void;
    /** Sets the desired unit count used for formatting. */
    SetDesiredUnitCount(count: number): void;
    /** Sets the desired unit count used for formatting to a curve that will be evaluated with seconds values to produce a desired unit count. */
    SetDesiredUnitCountCurve(curve: LuaCurveObject): void;
    /** Sets the maximum interval band used for formatting. */
    SetMaxInterval(interval: Enum.SecondsFormatterInterval): void;
    /** Sets the maximum interval band used for formatting to a curve that will be evaluated with seconds values to produce a value matching a SecondsFormatterInterval enum member. */
    SetMaxIntervalCurve(curve: LuaCurveObject): void;
    /** Sets the threshold below which a value will be formatted as a decimal number of seconds with one place for milliseconds (eg. '3.4') */
    SetMillisecondsThreshold(threshold: number): void;
    /** Sets the minimum interval band used for formatting. */
    SetMinInterval(interval: Enum.SecondsFormatterInterval): void;
    /** Sets the minimum interval band used for formatting to a curve that will be evaluated with seconds values to produce a value matching a SecondsFormatterInterval enum member. */
    SetMinIntervalCurve(curve: LuaCurveObject): void;
    /** Sets how fractional seconds are rounded when not displaying milliseconds. */
    SetRounding(rounding: Enum.SecondsFormatterRounding): void;
    /** Sets the whitespace stripping mode for the formatter. */
    SetStripIntervalWhitespace(strip: Enum.SecondsFormatterIntervalWhitespace): void;
}

interface TimedSignalMap {
    /** Cancels all scheduled signals. */
    CancelAllSignals(): void;
    /** Cancels the scheduled signal for the specified key, if one exists. */
    CancelSignal(key: number): void;
    /** Returns the next key due to signal along with its scheduled time. */
    GetNextSignal(): LuaMultiReturn<[key: number, time: number]>;
    /** Returns the number of keys currently scheduled to signal. */
    GetSignalCount(): number;
    /** Returns the absolute time at which the specified key is scheduled to signal. */
    GetSignalTime(key: number): number | undefined;
    /** Returns whether the specified key is currently scheduled to signal. */
    HasSignal(key: number): boolean;
    /** Schedules the specified key to signal after a delay from the current time, replacing any existing schedule for that key. */
    SignalAfter(key: number, secondsFromNow: number): void;
    /** Schedules the specified key to signal at an absolute time, replacing any existing schedule for that key. */
    SignalAt(key: number, time: number): void;
}

interface UnitHealPredictionCalculator {
    /** Calculates the percentage of current unit health and evaluates it against the supplied curve. */
    EvaluateCurrentHealthPercent(curve: LuaCurveObjectBase): LuaCurveEvaluatedResult;
    /** Calculates the percentage of missing unit health and evaluates it against the supplied curve. */
    EvaluateMissingHealthPercent(curve: LuaCurveObjectBase): LuaCurveEvaluatedResult;
    /** Returns the base amount of unit health. */
    GetCurrentHealth(): number;
    /** Returns the percentage of current unit health. */
    GetCurrentHealthPercent(): number;
    /** Returns the configured damage absorb clamping mode. */
    GetDamageAbsorbClampMode(): Enum.UnitDamageAbsorbClampMode;
    /** Calculates damage absorb values and clamping according to the configured options. */
    GetDamageAbsorbs(): LuaMultiReturn<[amount: number, clamped: boolean]>;
    /** Returns the configured heal absorb clamping mode. */
    GetHealAbsorbClampMode(): Enum.UnitHealAbsorbClampMode;
    /** Returns the configured heal absorb processing mode. */
    GetHealAbsorbMode(): Enum.UnitHealAbsorbMode;
    /** Calculates heal absorb values and clamping according to the configured options. */
    GetHealAbsorbs(): LuaMultiReturn<[amount: number, clamped: boolean]>;
    /** Returns the configured incoming heal clamping mode. */
    GetIncomingHealClampMode(): Enum.UnitIncomingHealClampMode;
    /** Returns the configured incoming heal maximum overflow percentage. */
    GetIncomingHealOverflowPercent(): number;
    /** Calculates incoming heal values and clamping according to the configured options. */
    GetIncomingHeals(): LuaMultiReturn<[amount: number, amountFromHealer: number, amountFromOthers: number, clamped: boolean]>;
    /** Returns the maximum clamping amount for damage absorbs. */
    GetMaximumDamageAbsorbs(): number;
    /** Returns the maximum clamping amount for heal absorbs. */
    GetMaximumHealAbsorbs(): number;
    /** Returns the base amount of maximum unit health. */
    GetMaximumHealth(): number;
    /** Returns the configured maximum health mode. */
    GetMaximumHealthMode(): Enum.UnitMaximumHealthMode;
    /** Returns the maximum clamping amount for incoming heals. */
    GetMaximumIncomingHeals(): number;
    /** Returns the base amount of missing unit health. */
    GetMissingHealth(): number;
    /** Returns the percentage of missing unit health. */
    GetMissingHealthPercent(): number;
    /** Returns the raw total figures used for data calculations. */
    GetPredictedValues(): UnitHealPredictionValues;
    /** Returns the base total amount of all applied damage absorb shields. */
    GetTotalDamageAbsorbs(): number;
    /** Returns the base total amount of all applied heal absorption effects. */
    GetTotalHealAbsorbs(): number;
    /** Returns the base total amount of all incoming heals. */
    GetTotalIncomingHeals(): number;
    /** Returns the base total amount of all incoming heals from the healer unit, if any. */
    GetTotalIncomingHealsFromHealer(): number;
    /** Returns true if the object has been configured with any secret values. */
    HasSecretValues(): boolean;
    /** Resets all stored state on the object. */
    Reset(): void;
    /** Resets all stored healing values used for calculations. */
    ResetPredictedValues(): void;
    /** Changes the clamping mode used when calculating damage absorb amounts. */
    SetDamageAbsorbClampMode(damageAbsorbClampMode: Enum.UnitDamageAbsorbClampMode): void;
    /** Changes the clamping mode used when calculating heal absorb amounts. */
    SetHealAbsorbClampMode(healAbsorbClampMode: Enum.UnitHealAbsorbClampMode): void;
    /** Changes the processing mode used when calculating both heal absorb and incoming heal amounts. */
    SetHealAbsorbMode(healAbsorbMode: Enum.UnitHealAbsorbMode): void;
    /** Changes the clamping mode used when calculating incoming heal amounts. */
    SetIncomingHealClampMode(incomingHealClampMode: Enum.UnitIncomingHealClampMode): void;
    /** Changes the maximum overflow percentage for incoming heals. Increasing this to a value over 1.0 will mean that incoming heals can extend beyond maximum health. */
    SetIncomingHealOverflowPercent(incomingHealOverflowPercent: number): void;
    /** Changes the calculation mode for maximum health values used for clamping. */
    SetMaximumHealthMode(maximumHealthMode: Enum.UnitMaximumHealthMode): void;
    /** Sets the healing values used for all calculations. */
    SetPredictedValues(predictedValues: UnitHealPredictionValues): void;
    /** Resets all state on the object, and clears the secret values flag. */
    SetToDefaults(): void;
}

