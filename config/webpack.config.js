const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const Path = {
	config: path.join(__dirname, '../config'),
	dist: path.join(__dirname, '../dist'),
	public: path.join(__dirname, '../public'),
	src: path.join(__dirname, '../src'),
	
	containers: path.join(__dirname, '../src/containers'),
	components: path.join(__dirname, '../src/components'),
	store: path.join(__dirname, '../src/store'),
	helpers: path.join(__dirname, '..src/helpers'),
	hocs: path.join(__dirname, '../src/hocs'),
	images: path.join(__dirname, '../src/assets/images')
}
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	entry: {
		app: `${Path.src}/index`
	},
	output: {
        path: path.resolve(__dirname, Path.dist),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.(js|mjs|jsx|ts|tsx)$/,
			exclude: '/node_modules/',
			use: 'babel-loader'
		}, {
			test: /\.(js|mjs|jsx|ts|tsx)$/,
			exclude: '/node_modules/',
			use: 'eslint-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.svg$/,
			use: '@svgr/webpack'
		}, {
			test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' }
		}, {
			test: /\.module\.s?[ac]ss$/,
			use: [
				isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: '[local]__[sha1:hash:hex:7]'
						},
						sourceMap: isDev
					}
				}, {
					loader: 'postcss-loader',
					options: {
						config: { path: `${Path.config}/postcss.config.js` },
						sourceMap: isDev
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: isDev
					}
				}
			]
		}, {
			test: /\.s?[ac]ss$/,
			exclude: /\.module\.s?[ac]ss$/,
			use: [
				isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: isDev }
				}, {
					loader: 'postcss-loader',
					options: {
						config: { path: `${Path.config}/postcss.config.js` },
						sourceMap: isDev
					}
				}, {
					loader: 'sass-loader',
					options: { sourceMap: isDev }
				}
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: false,
			inject: true,
			template: `${Path.public}/index.html`,
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
		}),
		new ImageminPlugin({
			test: /\.(jpg|png|gif|svg)$/i,
			disable: isDev
		}),
		new CopyWebpackPlugin([
			{ from: `${Path.public}`, to: '' },
			{ from: `${Path.src}/assets/images`, to: 'assets/images' }
		])
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, Path.src),
			'~p': path.resolve(__dirname, Path.public),
			'~cn': path.resolve(__dirname, Path.containers),
			'~cm': path.resolve(__dirname, Path.components),
			'~s': path.resolve(__dirname, Path.store),
			'~hlp': path.resolve(__dirname, Path.helpers),
			'~hoc': path.resolve(__dirname, Path.hocs),
			'~i': path.resolve(__dirname, Path.images)
		},
		extensions: ['*', 'css', 'scss', '.js', '.jsx', '.ts', '.tsx', '.json']
	}
}
