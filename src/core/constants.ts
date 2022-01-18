import type {IndustryGroup, Language, LocationGroup} from '@core/models';

enum LastUpdateTime
{
	None = 1,
	Today,
	PastWeek,
	PastMonth,
	Past3Months,
	Past6Months,
	PastYear,
	Past2Years,
}

export enum ToastType
{
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info',
	Default = 'default',
}

export enum CurrentPage
{
	CandidateDetailInNewTab = 1,
	SearchPage = 2

}

enum CandidateStatus {
	All = -1,
	Pending = 0,
	Qualified = 1,
	Rejected = 2,
	UnOfficial = 3,
	Salesforce = 4
}
export enum CandidateSource {
	All = -1,
	PRIMUS = 1,
	CRM = 2,
	VNW = 3
}

const JobIndustries: IndustryGroup[] = [
	{
		'name': 'Agriculture',
		'code': 6210,
		'industries': [
			{
				'name': 'Agricultural & Farm Machinery',
				'ids': [
					'62101010'
				]
			}
		]
	},
	{
		'name': 'Banking & Financial Services',
		'code': 4020,
		'industries': [
			{
				'name': 'Diversified Financial Services',
				'ids': [
					'40201020',
					'40201030',
					'40201040'
				]
			},
			{
				'name': 'Consumer Finance',
				'ids': [
					'40202010'
				]
			},
			{
				'name': 'Capital Markets',
				'ids': [
					'40203010',
					'40203020',
					'40203030'
				]
			},
			{
				'name': 'Banks',
				'ids': [
					'40204010',
					'40204020'
				]
			},
			{
				'name': 'Thrifts & Mortgage Finance',
				'ids': [
					'40205010'
				]
			},
			{
				'name': 'Insurance',
				'ids': [
					'40206010',
					'40206020',
					'40206030',
					'40206040',
					'40206050'
				]
			}
		]
	},
	{
		'name': 'Chemicals Industry',
		'code': 6010,
		'industries': [
			{
				'name': 'Chemicals',
				'ids': [
					'60101010',
					'60101020',
					'60101030',
					'60101040',
					'60101050'
				]
			}
		]
	},
	{
		'name': 'Construction & Infrastructure',
		'code': 6110,
		'industries': [
			{
				'name': 'Construction Materials',
				'ids': [
					'61101010'
				]
			},
			{
				'name': 'Building Products',
				'ids': [
					'61102010'
				]
			},
			{
				'name': 'Construction & Engineering',
				'ids': [
					'61103010'
				]
			}
		]
	},
	{
		'name': 'Consumer Goods & Retail',
		'code': 2010,
		'industries': [
			{
				'name': 'Capital Goods Trading Companies & Distributors',
				'ids': [
					'20107010'
				]
			},
			{
				'name': 'Household Durables',
				'ids': [
					'20107110',
					'20107120',
					'20107130',
					'20107140',
					'20107150'
				]
			},
			{
				'name': 'Leisure Products',
				'ids': [
					'20107210'
				]
			},
			{
				'name': 'Apparel & Luxury Goods',
				'ids': [
					'20107310'
				]
			},
			{
				'name': 'Internet & Catalog Retail',
				'ids': [
					'20107410',
					'20107420'
				]
			},
			{
				'name': 'Multiline Retail',
				'ids': [
					'20107510',
					'20107520'
				]
			},
			{
				'name': 'Specialty Retail',
				'ids': [
					'20107610',
					'20107620',
					'20107630',
					'20107640',
					'20107650',
					'20107660'
				]
			},
			{
				'name': 'Food & Staples Retailing',
				'ids': [
					'20107810',
					'20107820',
					'20107830',
					'20107840'
				]
			},
			{
				'name': 'Beverages',
				'ids': [
					'20107910',
					'20107920',
					'20107930'
				]
			},
			{
				'name': 'Food Products',
				'ids': [
					'20108010',
					'20108020'
				]
			},
			{
				'name': 'Tobacco',
				'ids': [
					'20108110'
				]
			},
			{
				'name': 'Household Products',
				'ids': [
					'20108210'
				]
			},
			{
				'name': 'Personal Products',
				'ids': [
					'20108310'
				]
			},
			{
				'name': 'Distributors',
				'ids': [
					'20108410'
				]
			}
		]
	},
	{
		'name': 'Energy, Ultilities & Renewables',
		'code': 1010,
		'industries': [
			{
				'name': 'Energy Equipment & Services',
				'ids': [
					'10101010',
					'10101020'
				]
			},
			{
				'name': 'Oil, Gas & Consumable Fuels',
				'ids': [
					'10102010',
					'10102020',
					'10102030',
					'10102040',
					'10102050'
				]
			},
			{
				'name': 'Electric Utilities',
				'ids': [
					'10102510'
				]
			},
			{
				'name': 'Gas Utilities',
				'ids': [
					'10103010'
				]
			},
			{
				'name': 'Multi-Utilities',
				'ids': [
					'10103510'
				]
			},
			{
				'name': 'Water Utilities',
				'ids': [
					'10104010'
				]
			},
			{
				'name': 'Independent Power and Renewable Electricity Producers',
				'ids': [
					'10104510',
					'10104520'
				]
			}
		]
	},
	{
		'name': 'Government',
		'code': 6020,
		'industries': [
			{
				'name': 'Government',
				'ids': [
					'60201010'
				]
			}
		]
	},
	{
		'name': 'Hospitality, Education & Other Services',
		'code': 2530,
		'industries': [
			{
				'name': 'Hospitality',
				'ids': [
					'25301010',
					'25301020',
					'25301030',
					'25301040'
				]
			},
			{
				'name': 'Education',
				'ids': [
					'25302010'
				]
			},
			{
				'name': 'Legal & Other Consumer Services',
				'ids': [
					'25303010',
					'25303020',
					'25303030'
				]
			}
		]
	},
	{
		'name': 'Life Sciences, Healthcare, Medical Devices & Pharmaceutical',
		'code': 3510,
		'industries': [
			{
				'name': 'Health Care Equipment & Supplies',
				'ids': [
					'35101010',
					'35101020'
				]
			},
			{
				'name': 'Health Care Providers & Services',
				'ids': [
					'35102010',
					'35102015',
					'35102020',
					'35102030'
				]
			},
			{
				'name': 'Health Care Technology',
				'ids': [
					'35103010'
				]
			},
			{
				'name': 'Biotechnology',
				'ids': [
					'35104010'
				]
			},
			{
				'name': 'Pharmaceuticals',
				'ids': [
					'35105010'
				]
			},
			{
				'name': 'Life Sciences Tools & Services',
				'ids': [
					'35106010'
				]
			}
		]
	},
	{
		'name': 'Manufacturing & Industrial',
		'code': 1510,
		'industries': [
			{
				'name': 'Containers & Packaging',
				'ids': [
					'15103010',
					'15103020'
				]
			},
			{
				'name': 'Metals & Mining',
				'ids': [
					'15104010',
					'15104020',
					'15104030',
					'15104040',
					'15104045',
					'15104050'
				]
			},
			{
				'name': 'Paper & Forest Products',
				'ids': [
					'15105010',
					'15105020'
				]
			},
			{
				'name': 'Aerospace & Defense',
				'ids': [
					'15105510'
				]
			},
			{
				'name': 'Electrical Equipment',
				'ids': [
					'15105610',
					'15105620'
				]
			},
			{
				'name': 'Industrial Conglomerates',
				'ids': [
					'15106010'
				]
			},
			{
				'name': 'Machinery',
				'ids': [
					'15107010',
					'15107020'
				]
			},
			{
				'name': 'Auto Components',
				'ids': [
					'15108010',
					'15108020'
				]
			},
			{
				'name': 'Automobiles',
				'ids': [
					'15109010',
					'15109020'
				]
			},
			{
				'name': 'Textiles & Garment',
				'ids': [
					'15109110',
					'15109120'
				]
			},
			{
				'name': 'Semiconductors & Semiconductor Equipment',
				'ids': [
					'15109210',
					'15109220'
				]
			}
		]
	},
	{
		'name': 'Media, Publishing & Advertising',
		'code': 2540,
		'industries': [
			{
				'name': 'Media, Publishing & Advertising',
				'ids': [
					'25401010',
					'25401020',
					'25401025',
					'25401030',
					'25401040'
				]
			}
		]
	},
	{
		'name': 'Real Estate',
		'code': 4040,
		'industries': [
			{
				'name': 'Real Estate Investment Trusts (REITs)',
				'ids': [
					'40402010',
					'40402020',
					'40402030',
					'40402035',
					'40402040',
					'40402045',
					'40402050',
					'40402060',
					'40402070'
				]
			},
			{
				'name': 'Real Estate Management & Development',
				'ids': [
					'40403010',
					'40403020',
					'40403030',
					'40403040'
				]
			}
		]
	},
	{
		'name': 'Services (HR, security, consulting, research, printing, facilities, etc)',
		'code': 2020,
		'industries': [
			{
				'name': 'Commercial Services & Supplies',
				'ids': [
					'20201010',
					'20201050',
					'20201060',
					'20201070',
					'20201080'
				]
			},
			{
				'name': 'HR, Research & Consulting',
				'ids': [
					'20202010',
					'20202020'
				]
			}
		]
	},
	{
		'name': 'Technology, Digital & Telecommunications',
		'code': 4520,
		'industries': [
			{
				'name': 'Communications Equipment',
				'ids': [
					'45201020'
				]
			},
			{
				'name': 'Technology Hardware, Storage & Peripherals',
				'ids': [
					'45202030'
				]
			},
			{
				'name': 'Electronic Equipment, Instruments & Components',
				'ids': [
					'45203010',
					'45203015',
					'45203020',
					'45203030'
				]
			},
			{
				'name': 'Internet Software & Services',
				'ids': [
					'45204010'
				]
			},
			{
				'name': 'IT Services',
				'ids': [
					'45204510',
					'45204520'
				]
			},
			{
				'name': 'Software',
				'ids': [
					'45205010',
					'45205020',
					'45205030'
				]
			},
			{
				'name': 'Diversified Telecommunication Services',
				'ids': [
					'45205510',
					'45205520'
				]
			},
			{
				'name': 'Wireless Telecommunication Services',
				'ids': [
					'45206010'
				]
			}
		]
	},
	{
		'name': 'Transportation & Logistics',
		'code': 2030,
		'industries': [
			{
				'name': 'Air Freight & Logistics',
				'ids': [
					'20301010'
				]
			},
			{
				'name': 'Airlines',
				'ids': [
					'20302010'
				]
			},
			{
				'name': 'Ocean Freight',
				'ids': [
					'20303010'
				]
			},
			{
				'name': 'Road & Rail',
				'ids': [
					'20304010',
					'20304020'
				]
			},
			{
				'name': 'Transportation Infrastructure',
				'ids': [
					'20305010',
					'20305020',
					'20305030'
				]
			}
		]
	}
];

const Languages: Language[] = [
	{
		'id': 77,
		'name': 'Vietnamese'
	},
	{
		'id': 51,
		'name': 'English'
	},
	{
		'id': 40,
		'name': 'Arabic'
	},
	{
		'id': 41,
		'name': 'Bengali'
	},
	{
		'id': 42,
		'name': 'Bulgarian'
	},
	{
		'id': 43,
		'name': 'Burmese'
	},
	{
		'id': 44,
		'name': 'Cambodian'
	},
	{
		'id': 45,
		'name': 'Cebuano'
	},
	{
		'id': 46,
		'name': 'Chinese (Cantonese)'
	},
	{
		'id': 47,
		'name': 'Chinese (Mandarin)'
	},
	{
		'id': 48,
		'name': 'Czech'
	},
	{
		'id': 49,
		'name': 'Danish'
	},
	{
		'id': 50,
		'name': 'Dutch'
	},
	{
		'id': 52,
		'name': 'Finnish'
	},
	{
		'id': 53,
		'name': 'French'
	},
	{
		'id': 54,
		'name': 'German'
	},
	{
		'id': 55,
		'name': 'Greek'
	},
	{
		'id': 56,
		'name': 'Hindi'
	},
	{
		'id': 57,
		'name': 'Hungarian'
	},
	{
		'id': 58,
		'name': 'Indonesian'
	},
	{
		'id': 59,
		'name': 'Italian'
	},
	{
		'id': 60,
		'name': 'Japanese'
	},
	{
		'id': 61,
		'name': 'Javanese'
	},
	{
		'id': 62,
		'name': 'Korean'
	},
	{
		'id': 63,
		'name': 'Laotian'
	},
	{
		'id': 64,
		'name': 'Malay'
	},
	{
		'id': 65,
		'name': 'Norwegian'
	},
	{
		'id': 78,
		'name': 'Other'
	},
	{
		'id': 66,
		'name': 'Polish'
	},
	{
		'id': 67,
		'name': 'Portuguese'
	},
	{
		'id': 68,
		'name': 'Romanian'
	},
	{
		'id': 69,
		'name': 'Russian'
	},
	{
		'id': 70,
		'name': 'Spanish'
	},
	{
		'id': 71,
		'name': 'Swedish'
	},
	{
		'id': 72,
		'name': 'Tagolog'
	},
	{
		'id': 73,
		'name': 'Taiwanese'
	},
	{
		'id': 74,
		'name': 'Thai'
	},
	{
		'id': 75,
		'name': 'Turkish'
	},
	{
		'id': 76,
		'name': 'Ukraine'
	}
];

const Locations: LocationGroup[] = [
	{
		'id': 3,
		'name': 'South',
		'locations': [
			{
				'id': 73,
				'name': 'Ho Chi Minh'
			},
			{
				'id': 79,
				'name': 'An Giang'
			},
			{
				'id': 80,
				'name': 'Ba Ria - Vung Tau'
			},
			{
				'id': 83,
				'name': 'Bac Lieu'
			},
			{
				'id': 85,
				'name': 'Ben Tre'
			},
			{
				'id': 86,
				'name': 'Bien Hoa'
			},
			{
				'id': 88,
				'name': 'Binh Duong'
			},
			{
				'id': 89,
				'name': 'Binh Phuoc'
			},
			{
				'id': 91,
				'name': 'Ca Mau'
			},
			{
				'id': 92,
				'name': 'Can Tho'
			},
			{
				'id': 95,
				'name': 'Dong Nai'
			},
			{
				'id': 96,
				'name': 'Dong Thap'
			},
			{
				'id': 141,
				'name': 'Hau Giang'
			},
			{
				'id': 135,
				'name': 'Kien Giang'
			},
			{
				'id': 113,
				'name': 'Long An'
			},
			{
				'id': 140,
				'name': 'Mekong Delta'
			},
			{
				'id': 125,
				'name': 'Soc Trang'
			},
			{
				'id': 127,
				'name': 'Tay Ninh'
			},
			{
				'id': 132,
				'name': 'Tien Giang'
			},
			{
				'id': 133,
				'name': 'Tra Vinh'
			},
			{
				'id': 136,
				'name': 'Vinh Long'
			}
		]
	},
	{
		'id': 1,
		'name': 'North',
		'locations': [
			{
				'id': 72,
				'name': 'Ha Noi'
			},
			{
				'id': 82,
				'name': 'Bac Giang'
			},
			{
				'id': 81,
				'name': 'Bac Kan'
			},
			{
				'id': 84,
				'name': 'Bac Ninh'
			},
			{
				'id': 93,
				'name': 'Cao Bang'
			},
			{
				'id': 139,
				'name': 'Dien Bien'
			},
			{
				'id': 98,
				'name': 'Ha Giang'
			},
			{
				'id': 99,
				'name': 'Ha Nam'
			},
			{
				'id': 100,
				'name': 'Ha Tay'
			},
			{
				'id': 102,
				'name': 'Hai Duong'
			},
			{
				'id': 103,
				'name': 'Hai Phong'
			},
			{
				'id': 104,
				'name': 'Hoa Binh'
			},
			{
				'id': 106,
				'name': 'Hung Yen'
			},
			{
				'id': 109,
				'name': 'Lai Chau'
			},
			{
				'id': 111,
				'name': 'Lang Son'
			},
			{
				'id': 112,
				'name': 'Lao Cai'
			},
			{
				'id': 114,
				'name': 'Nam Dinh'
			},
			{
				'id': 116,
				'name': 'Ninh Binh'
			},
			{
				'id': 118,
				'name': 'Phu Tho'
			},
			{
				'id': 120,
				'name': 'Quang Binh'
			},
			{
				'id': 123,
				'name': 'Quang Ninh'
			},
			{
				'id': 126,
				'name': 'Son La'
			},
			{
				'id': 128,
				'name': 'Thai Binh'
			},
			{
				'id': 129,
				'name': 'Thai Nguyen'
			},
			{
				'id': 134,
				'name': 'Tuyen Quang'
			},
			{
				'id': 137,
				'name': 'Vinh Phuc'
			},
			{
				'id': 138,
				'name': 'Yen Bai'
			}
		]
	},
	{
		'id': 2,
		'name': 'Middle',
		'locations': [
			{
				'id': 71,
				'name': 'Da Nang'
			},
			{
				'id': 87,
				'name': 'Binh Dinh'
			},
			{
				'id': 90,
				'name': 'Binh Thuan'
			},
			{
				'id': 94,
				'name': 'Dak Lak'
			},
			{
				'id': 142,
				'name': 'Dak Nong'
			},
			{
				'id': 97,
				'name': 'Gia Lai'
			},
			{
				'id': 101,
				'name': 'Ha Tinh'
			},
			{
				'id': 105,
				'name': 'Hue'
			},
			{
				'id': 107,
				'name': 'Khanh Hoa'
			},
			{
				'id': 108,
				'name': 'Kon Tum'
			},
			{
				'id': 110,
				'name': 'Lam Dong'
			},
			{
				'id': 115,
				'name': 'Nghe An'
			},
			{
				'id': 117,
				'name': 'Ninh Thuan'
			},
			{
				'id': 119,
				'name': 'Phu Yen'
			},
			{
				'id': 121,
				'name': 'Quang Nam'
			},
			{
				'id': 122,
				'name': 'Quang Ngai'
			},
			{
				'id': 124,
				'name': 'Quang Tri'
			},
			{
				'id': 130,
				'name': 'Thanh Hoa'
			},
			{
				'id': 131,
				'name': 'Thua Thien-Hue'
			}
		]
	},
	{
		'id': 4,
		'name': 'Other',
		'locations': [
			{
				'id': 75,
				'name': 'International'
			},
			{
				'id': 74,
				'name': 'Other'
			}
		]
	}
];

const JobFunctions = [
	{
		'id': 44,
		'totalUsers': '146',
		'name': 'Academic',
		'weight': 450
	},
	{
		'id': 33,
		'totalUsers': '452',
		'name': 'Accounting',
		'weight': 340
	},
	{
		'id': 35,
		'totalUsers': '546',
		'name': 'Administration',
		'weight': 360
	},
	{
		'id': 47,
		'totalUsers': '507',
		'name': 'Analyst',
		'weight': 470
	},
	{
		'id': 32,
		'totalUsers': '341',
		'name': 'Auditing',
		'weight': 330
	},
	{
		'id': 40,
		'totalUsers': '538',
		'name': 'Business Intelligence',
		'weight': 410
	},
	{
		'id': 38,
		'totalUsers': '1403',
		'name': 'Business Operations',
		'weight': 390
	},
	{
		'id': 3,
		'totalUsers': '1126',
		'name': 'Consulting',
		'weight': 30
	},
	{
		'id': 27,
		'totalUsers': '473',
		'name': 'Corporate Communication',
		'weight': 280
	},
	{
		'id': 39,
		'totalUsers': '687',
		'name': 'Corporate Planning',
		'weight': 400
	},
	{
		'id': 29,
		'totalUsers': '306',
		'name': 'Corporate Social Responsibilities',
		'weight': 300
	},
	{
		'id': 26,
		'totalUsers': '298',
		'name': 'Creative & Designing',
		'weight': 270
	},
	{
		'id': 7,
		'totalUsers': '1063',
		'name': 'Customer Service',
		'weight': 70
	},
	{
		'id': 4,
		'totalUsers': '647',
		'name': 'Digital Marketing',
		'weight': 40
	},
	{
		'id': 43,
		'totalUsers': '396',
		'name': 'Education & Teaching',
		'weight': 440
	},
	{
		'id': 22,
		'totalUsers': '231',
		'name': 'Engagement',
		'weight': 230
	},
	{
		'id': 48,
		'totalUsers': '141',
		'name': 'Engineer',
		'weight': 131
	},
	{
		'id': 36,
		'totalUsers': '1552',
		'name': 'Executive Management',
		'weight': 370
	},
	{
		'id': 34,
		'totalUsers': '798',
		'name': 'Finance/Investment',
		'weight': 350
	},
	{
		'id': 45,
		'totalUsers': '92',
		'name': 'Government Worker',
		'weight': 460
	},
	{
		'id': 37,
		'totalUsers': '177',
		'name': 'HSE',
		'weight': 380
	},
	{
		'id': 46,
		'totalUsers': '617',
		'name': 'Human Resource',
		'weight': 210
	},
	{
		'id': 17,
		'totalUsers': '495',
		'name': 'Import/Export',
		'weight': 170
	},
	{
		'id': 24,
		'totalUsers': '376',
		'name': 'IT-Product',
		'weight': 250
	},
	{
		'id': 23,
		'totalUsers': '369',
		'name': 'IT-Technical',
		'weight': 240
	},
	{
		'id': 31,
		'totalUsers': '348',
		'name': 'Legal/Compliance',
		'weight': 320
	},
	{
		'id': 15,
		'totalUsers': '483',
		'name': 'Logistics',
		'weight': 150
	},
	{
		'id': 6,
		'totalUsers': '731',
		'name': 'Market Research',
		'weight': 60
	},
	{
		'id': 42,
		'totalUsers': '214',
		'name': 'Merchandise',
		'weight': 430
	},
	{
		'id': 30,
		'totalUsers': '763',
		'name': 'Office Management',
		'weight': 310
	},
	{
		'id': 5,
		'totalUsers': '553',
		'name': 'Offline Marketing',
		'weight': 50
	},
	{
		'id': 19,
		'totalUsers': '1326',
		'name': 'Planning/Projects',
		'weight': 190
	},
	{
		'id': 12,
		'totalUsers': '550',
		'name': 'Production Development',
		'weight': 120
	},
	{
		'id': 11,
		'totalUsers': '787',
		'name': 'Production Management',
		'weight': 110
	},
	{
		'id': 10,
		'totalUsers': '554',
		'name': 'Production Planning',
		'weight': 100
	},
	{
		'id': 41,
		'totalUsers': '1555',
		'name': 'Project Management',
		'weight': 420
	},
	{
		'id': 28,
		'totalUsers': '462',
		'name': 'Public Relations',
		'weight': 290
	},
	{
		'id': 18,
		'totalUsers': '571',
		'name': 'Purchasing',
		'weight': 180
	},
	{
		'id': 25,
		'totalUsers': '108',
		'name': 'QA/QC For IT',
		'weight': 260
	},
	{
		'id': 13,
		'totalUsers': '367',
		'name': 'QA/QC For Production',
		'weight': 130
	},
	{
		'id': 9,
		'totalUsers': '272',
		'name': 'Real Estate Investment',
		'weight': 90
	},
	{
		'id': 20,
		'totalUsers': '656',
		'name': 'Recruitment',
		'weight': 200
	},
	{
		'id': 8,
		'totalUsers': '136',
		'name': 'Retail Leasing',
		'weight': 80
	},
	{
		'id': 1,
		'totalUsers': '1272',
		'name': 'Sales B2B',
		'weight': 10
	},
	{
		'id': 2,
		'totalUsers': '965',
		'name': 'Sales B2C',
		'weight': 20
	},
	{
		'id': 14,
		'totalUsers': '574',
		'name': 'Supply Chain Management',
		'weight': 140
	},
	{
		'id': 21,
		'totalUsers': '1102',
		'name': 'Training & Development',
		'weight': 220
	},
	{
		'id': 16,
		'totalUsers': '331',
		'name': 'Warehouse',
		'weight': 160
	}
];

enum Nationality
{
	None = 0,
	Vietnamese = 1,
	Expat = 2,
}

const SalaryRange = [
	'empty salary',
	'less than $1,500/month',
	'$1,500 ~ $2,000/month',
	'$2,000 - $3,000/month',
	'$3,000 - $4,000/month',
	'$4,000 - $5,000/month',
	'$5,000 - $7,000/month',
	'$7,000 - $10,000/month',
	'$10,000 - $15,000/month',
	'$15,000 - $20,000/month',
	'more than $20,000/month',
];
export const SALARY_REFERENCES = [
	{id: "0", name: 'empty salary'},
	{id: "900", name: 'less than $1,500/month'},
	{id: "1500", name: '$1,500 ~ $2,000/month'},
	{id: "2000", name: '$2,000 - $3,000/month'},
	{id: "3000", name: '$3,000 - $4,000/month'},
	{id: "4000", name: '$4,000 - $5,000/month'},
	{id: "5000", name: '$5,000 - $7,000/month'},
	{id: "7000", name: '$7,000 - $10,000/month'},
	{id: "10000", name: '$10,000 - $15,000/month'},
	{id: "15000", name: '$15,000 - $20,000/month'},
	{id: "20000", name: 'more than $20,000/month'},
];

export enum EventName {
	StartingPageViewMyJob = 'STARTING_PAGE_VIEW_MY_JOB',
	StartingPageViewUpdated = 'STARTING_PAGE_VIEW_UPDATED',
	StartingPageSearchNow = 'STARTING_PAGE_SEARCH_NOW',
	ShortlistNoteTacking = 'SHORTLIST_EMPOYER_NOTE_IN_SHORTLIST',
	SalesViewShortlist = 'SALES_VIEW_SHORTLIST',
	ClickOnNotificationIcon = 'CLICK_ON_NOTIFICATION_ICON',
	ClickOnNotificationItem = 'CLICK_ON_NOTIFICATION_ITEM',
	UseUnOfficialCandidateModal = 'USE_UN_OFFICIAL_CANDIDATE_MODAL',
	ClickResetFilter = 'CLICK_RESET_FILTER',
	ClickFilterLanguage = 'CLICK_FILTER_LANGUAGE',
	ClickFilterYearOfBirth = 'CLICK_FILTER_YEAR_OF_BIRTH',
	ClickFilterUpdateStatus = 'CLICK_FILTER_UPDATE_STATUS',
	ClickFilterUserRole = 'CLICK_FILTER_USER_ROLE',
	ClickFilterSalary = 'CLICK_FILTER_SALARY',
	ClickFilterNationality = 'CLICK_FILTER_NATIONALITY',
	ClickFilterCandidateSource = 'CLICK_FILTER_CANDIDATE_SOURCE',
	ClickFilterLocation = 'CLICK_FILTER_LOCATION',
	ClickFilterIndustry = 'CLICK_FILTER_INDUSTRY',
	ClickFilterFunction = 'CLICK_FILTER_FUNCTION',
	ClickJobTitleSuggestion = 'CLICK_JOB_TITLE_SUGGESTION',
	ViewCandidateDetailInsight = 'VIEW_CANDIDATE_DETAIL_INSIGHT',
	SearchQueryTracking = 'SEARCH_QUERY_TRACKING',
	ViewShortlist = 'VIEW_SHORTLIST',
	NPSSurveyAppear = 'NPS_SURVEY_APPEAR',
	DownloadCV = 'DOWNLOAD_CV',
	VisitJobList = 'VISIT_JOB_LIST_PAGE',
	VisitJobMarket = 'VISIT_JOB_MARKET_PAGE',
	MarkFavoriteCompanyInJobMarket = 'MARK_FAVORITE_COMPANY_IN_JOB_MARKET',
	ClickJobMarketLink = 'CLICK_JOB_MARKET_LINK',
	SearchJobMarket = 'SEARCH_JOB_MARKET',
	RequestCredit = 'REQUEST_CREDIT',
	VisitStartingPage = 'VISIT_STARTING_PAGE',
	OpenProfile = 'OPEN_PROFILE',
	OpenProfileInShortlist = 'OPEN_PROFILE_IN_SHORTLIST',
	OpenProfileInShortlistInNewTab = 'OPEN_PROFILE_IN_SHORTLIST_NEW_TAB',
	OpenContact = 'OPEN_CONTACT',
	OpenContactInShortlist = 'OPEN_CONTACT_IN_SHORTLIST',
	OpenPreview = 'OPEN_PREVIEW',
	NewTabButtonInCV = 'NEW_TAB_BUTTON',
	OpenPreviewSF = 'OPEN_PREVIEW_SF',
	OpenCVText = 'OPEN_CV_TEXT',
	OpenNote = 'OPEN_NOTE',
	OpenCandidateActivity = 'OPEN_CANDIDATE_ACTIVITY',
	ClickOnEmptySalary = 'CLICK_ON_EMPTY_SALARY',
	OpenPreviewInShortlist = 'OPEN_PREVIEW_IN_SHORTLIST',
	OpenPreviewInShortlistInNewTab = 'OPEN_PREVIEW_IN_SHORTLIST_NEW_TAB',
	OpenSimilarProfile = 'OPEN_SIMILAR_PROFILE',
	PurchaseContact = 'PURCHASE_CONTACT',
	ViewShortlistReport = 'VIEW_SHORTLIST_REPORT',
	ConsultantViewNPSSurvey3404 = 'CONSULTANT_VIEW_NPS_SURVEY_3404',
	ConsultantSearchNPSSurveyVisible = 'CONSULTANT_SEARCH_NPS_SURVEY_VISIBLE',
	RePurchaseContact = 'RE_PURCHASE_CONTACT',
	SimilarCandidateAppendedInSearchList = 'SIMILAR_CANDIDATE_APPENDED_IN_SEARCH_LIST',
	SaveSearchCriteria = 'SEARCH_CRITERIA_UPSERT',
	SearchQuery = 'SEARCH_QUERY',
	CandidateViewJob = 'CANDIDATE_VIEW_JOB',
	CandidateProfileUpdated = 'CANDIDATE_PROFILE_UPDATED',
	CandidateApplyJob = 'CANDIDATE_APPLY_JOB',
	CandidateProfileNew = 'CANDIDATE_PROFILE_NEW',
	ShortlistReact = 'SHORTLIST_EMPLOYER_REACT_TO_CANDIDATE',
	RequestCVDownload = 'REQUEST_CV_DOWNLOAD',
	ProfileLink = 'PROFILE_LINK',
	SimilarProfileAppear = 'SIMILAR_PROFILE_APPEAR',
	ExportEmployerPerformance = 'EXPORT_EMPLOYER_PERFORMANCE',
	SalesLogin = 'SALES_LOGIN',
	ViewRecommendedSFCandidateInStartingPage = 'VIEW_RECOMMENDED_SF_CANDIDATE_IN_STARTING_PAGE',
	RecommendedSFCandidateAppearInStartingPage = 'RECOMMENDED_SF_CANDIDATE_APPEAR_IN_STARTING_PAGE',
	SimilarCandidateVisibleToConsultant = 'SIMILAR_CANDIDATE_VISIBLE_TO_CONSULTANT',
	NewTabSearch_Reco_Appear = 'NEW_TAB_SEARCH_RECO_APPEAR',
	ClickToViewSimilarCandidate = 'CLICK_TO_VIEW_SIMILAR_CANDIDATE',
	CandidateSourceInSearchQuery = 'CANDIDATE_SOURCE_IN_SEARCH_QUERY',
	SfIntroPopupForConsultantCTA = 'SF_INTRO_POPUP_FOR_CONSULTANT_CTA',
	SfIntroPopupForConsultantAppear = 'SF_INTRO_POPUP_FOR_CONSULTANT_APPEAR',
	SfViewActivationIntro = 'SF_VIEW_ACTIVATION_INTRO',
	SfViewActivationForm = 'SF_VIEW_ACTIVATION_FORM',
	SfViewActivationSearchToggle = 'SF_VIEW_ACTIVATION_SEARCH_TOGGLE',
	SfViewNewProfileSlide = 'SF_VIEW_NEW_PROFILE_SLIDE',
	JobMarketOpenClientJobTab = 'JOB_MARKET_OPEN_CLIENT_JOB_TAB',
	JobMarketOpenHeadhuntTab = 'JOB_MARKET_OPEN_HEADHUNT_TAB',
	JobMarketOpenFavoriteCompanyJobTab = 'JOB_MARKET_OPEN_FAVORITE_COMPANY_JOB_TAB',
	ShortlistSearch = 'SHORTLIST_SEARCH',
	ShortlistSearchCount = 'SHORTLIST_SEARCH_COUNT',
	ShortlistOpenCandidateQualifiedStatusFilter = 'SHORTLIST_OPEN_CANDIDATE_QUALIFIED_STATUS_FILTER',
	ShortlistOpenCandidateStatusFilter = 'SHORTLIST_OPEN_CANDIDATE_STATUS_FILTER',
	ShortlistOpenCandidateSourceFilter = 'SHORTLIST_OPEN_CANDIDATE_SOURCE_FILTER',
	ShortlistOpenApplicationProgressFilter = 'SHORTLIST_OPEN_APPLICATION_PROGRESS_FILTER',
	ShortlistOpenNotiRecipientList = 'SHORTLIST_OPEN_NOTI_RECIPIENT_LIST',
	ShortlistQualifiedTableClick = 'SHORTLIST_QUALIFIED_TABLE_CLICKED',
	ShortlistOtherCandidateTableClick = 'SHORTLIST_OTHER_CANDIDATE_TABLE_CLICKED',
	ShortlistChangeBox = 'SHORTLIST_CHANGE_BOX',
	CandidateVisibleImpression = 'VISIBLE_IMPRESSION'
}

export const SearchFilter =
{
	LastUpdateTime,
	SalaryRange,
	JobFunctions,
	Nationality,
	JobIndustries,
	Locations,
	Languages,
	CandidateSource
}
