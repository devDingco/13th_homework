/** @format */

import {
	BoardAddressInput,
	CreateBoardCommentInput,
	CreateBoardInput,
	UpdateBoardCommentInput,
	UpdateBoardInput,
} from './types';

import { z } from 'zod';

type Properties<T> = Required<{
	[K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
	v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function BoardAddressInputSchema(): z.ZodObject<Properties<BoardAddressInput>> {
	return z.object({
		address: z.string(),
		detailAddress: z.string(),
		zoneCode: z.number(),
	});
}

export function CreateBoardCommentInputSchema(): z.ZodObject<Properties<CreateBoardCommentInput>> {
	return z.object({
		author: z.string(),
		content: z.string(),
		parentId: z.string().nullish(),
		password: z.string(),
		rating: z.number().nullish(),
	});
}

export function CreateBoardInputSchema(): z.ZodObject<Properties<CreateBoardInput>> {
	return z.object({
		author: z.string(),
		boardAddressInput: z.array(z.lazy(() => BoardAddressInputSchema())).nullish(),
		content: z.string(),
		imageUrl: z.array(z.string()).nullish(),
		password: z.string(),
		title: z.string(),
		youtubeUrl: z.string().nullish(),
	});
}

export function UpdateBoardCommentInputSchema(): z.ZodObject<Properties<UpdateBoardCommentInput>> {
	return z.object({
		content: z.string(),
		parentId: z.string().nullish(),
		password: z.string(),
		rating: z.number().nullish(),
	});
}

export function UpdateBoardInputSchema(): z.ZodObject<Properties<UpdateBoardInput>> {
	return z.object({
		boardAddressInput: z.array(z.lazy(() => BoardAddressInputSchema())).nullish(),
		content: z.string(),
		imageUrl: z.array(z.string()).nullish(),
		title: z.string(),
		youtubeUrl: z.string().nullish(),
	});
}
